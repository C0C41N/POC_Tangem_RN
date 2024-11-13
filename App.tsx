import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView, StatusBar, Button, View, ViewStyle} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {generateMnemonic, scan, BIP39WordCount, signMultiple, Solana, Tron} from 'tangem-sdk-codora-react-native';

import { install } from 'react-native-quick-crypto';

install();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const genMnemonicPressed = async () => {
    const mnemonic = await generateMnemonic(BIP39WordCount.TWENTY_FOUR);
    console.log(mnemonic);
  };

  const scanPressed = async () => {
    const card = await scan({
      accessCode: '141414',
    });

    console.log(JSON.stringify(card, null, 2));
  };

  const signMultiplePressed = async () => {
    try {

      const solanaPubKey = 'EPFHi2vvpVeuuZU3TDXYxFfwEGxZhceL1h2tmia6wLgh';
      const tronPubKey = '261tNC22med7Yn6pxp5iKfxUF231KXVtfjEYmsPbWqGjx';

      const solanaRecKey = '96fuzKSqE7tCYY3sm6SxfujhrRy5JpN3gkQqAWnsB8mm';
      const tronRecKey = 'TMgJvQaXEPRjCbinHNeGogZLFGSjLpydjp';

      const solana = new Solana(solanaPubKey);
      const tron = new Tron(tronPubKey);

      console.log(`Solana Address: ${solana.getPublicAddress()}`);
      console.log(`Tron Address: ${tron.getPublicAddress()}`);

      // console.log(solana)

      const solanaTrx = await solana.createTransaction({
        amount: 0.00001,
        receiverAddress: solanaRecKey,
      });

      const tronTrx = await tron.createTransaction({
        amount: 1,
        receiverAddress: tronRecKey,
      });

      const signatures = await signMultiple({
        accessCode: '141414',
        signPayloads: [
          {
            pubKeyBase58: solanaPubKey,
            unsignedHex: solanaTrx.unsignedHex,
          },
          {
            pubKeyBase58: tronPubKey,
            unsignedHex: tronTrx.unsignedHex,
          },
        ],
      });

      // const [solanaSig, TronSig] = signatures;

      console.log(JSON.stringify(signatures, null, 2));

      // const trxIds = await Promise.all([
      //   solana.sendTransaction({
      //     signedHex: solanaSig,
      //     transaction: solanaTrx.transaction,
      //   }),
      //   tron.sendTransaction({
      //     signedHex: TronSig,
      //     transaction: tronTrx.transaction,
      //   }),
      // ]);

      // console.log(JSON.stringify(trxIds, null, 2));


    } catch (error) {
      console.error(error);
    }
  };

  // EPFHi2vvpVeuuZU3TDXYxFfwEGxZhceL1h2tmia6wLgh
  // 261tNC22med7Yn6pxp5iKfxUF231KXVtfjEYmsPbWqGjx

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <View style={containerStyle}>
        <Button title="Scan" onPress={() => scanPressed()} />
        <Button title="SignMultiple" onPress={() => signMultiplePressed()} />
        <Button title="SignMultiple" onPress={() => signMultiplePressed()} />
        <Button title="GenMnemonic" onPress={() => genMnemonicPressed()} />
      </View>
    </SafeAreaView>
  );
}

export default App;
