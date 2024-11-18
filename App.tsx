import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView, StatusBar, Button, View, ViewStyle} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {generateMnemonic, scan, BIP39WordCount, signMultiple, Ethereum} from 'tangem-sdk-codora-react-native';

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

      const arbiPubKey = '261tNC22med7Yn6pxp5iKfxUF231KXVtfjEYmsPbWqGjx';
      const arbiRecKey = '0x5A32168d0b01C331d516e5AcE8CD016A1f54755E';

      const ARBITRUM = 42161;

      const ethereum = new Ethereum(arbiPubKey, 'https://rpc.ankr.com/arbitrum', ARBITRUM);

      console.log(`Ethereum Address: ${ethereum.getPublicAddress()}`);

      const arbiTrx = await ethereum.createTransaction({
        amount: 0.00001,
        receiverAddress: arbiRecKey,
        gasLimit: '0x089874',
        maxFeePerGas: '0x989680',
      });

      const signatures = await signMultiple({
        accessCode: '141414',
        signPayloads: [
          {
            pubKeyBase58: arbiPubKey,
            unsignedHex: arbiTrx.unsignedHex,
          },
        ],
      });

      const arbiSig = signatures[0].signedHex;

      console.log(JSON.stringify(signatures, null, 2));

      const trxIds = await Promise.all([
        ethereum.sendTransaction({
          signedHex: arbiSig,
          transaction: arbiTrx.transaction,
        }),
      ]);

      console.log(JSON.stringify(trxIds, null, 2));


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
