import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView, StatusBar, Button, View, ViewStyle} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {generateMnemonic, scan, BIP39WordCount, resolveAddresses, AddressSvcChain } from 'tangem-sdk-codora-react-native';

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
    const mnemonic = await generateMnemonic(BIP39WordCount.TWELVE);
    console.log(mnemonic);
  };

  const scanPressed = async () => {
    const card = await scan({
      accessCode: '141414',
    });

    console.log(JSON.stringify(card, null, 2));
  };

  const addressSvcPressed = async () => {

    const secp256k1 = '261tNC22med7Yn6pxp5iKfxUF231KXVtfjEYmsPbWqGjx';
    const ed25519 = 'EPFHi2vvpVeuuZU3TDXYxFfwEGxZhceL1h2tmia6wLgh';

    const resp = await resolveAddresses([
      {
        chain: AddressSvcChain.ETHEREUM,
        pubKeyBase58: secp256k1,
      },
      {
        chain: AddressSvcChain.TRON,
        pubKeyBase58: secp256k1,
      },
      {
        chain: AddressSvcChain.SOLANA,
        pubKeyBase58: ed25519,
      },
    ]);

    console.log(JSON.stringify(resp, null, 2));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <View style={containerStyle}>
        <Button title="Scan" onPress={() => scanPressed()} />
        <Button title="AddressSvc" onPress={() => addressSvcPressed()} />
        <Button title="GenMnemonic" onPress={() => genMnemonicPressed()} />
      </View>
    </SafeAreaView>
  );
}

export default App;
