import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView, StatusBar, Button, View, ViewStyle} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {scan, purgeAllWallets, validateMnemonic, enableUserCodeRecovery } from 'tangem-sdk-codora-react-native';

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

  const scanPressed = async (migrate?: boolean) => {
    const migratePublicKey = migrate ? '03D52B690738C0F0EDD4A30E2C11021826DE2A1E7941393BC815E8BE1764EEFA61' : undefined;
    const scanResult = await scan({ accessCode: '141414', migratePublicKey });

    if (!scanResult.success) {
      console.log(scanResult.message);
      return;
    }

    const card = scanResult.data!;

    card.wallets.map(wallet => {
      const curve = wallet.curve;
      const pubKey58 = wallet.publicKeyBase58;
      const pubKeyHex = wallet.publicKey;
      console.log(`Wallet | ${curve} | ${pubKey58} | ${pubKeyHex}`);
    });

    const isUserCodeRecoveryAllowed = card.userSettings.isUserCodeRecoveryAllowed;
    console.log({ isUserCodeRecoveryAllowed });
  };

  const purgeAllWalletsPressed = async (onlyEd25519?: boolean) => {
    const resp = await purgeAllWallets({ accessCode: '141414', onlyEd25519 });
    console.log(resp);
  };

  const validateMnemonicPressed = async () => {
    const mnemonic = ['super', 'turtle', 'music', 'prize', 'civil', 'state', 'oxygen', 'urban', 'tank', 'valley', 'labor', 'pet'];
    const resp = await validateMnemonic(mnemonic);
    console.log(resp);
  };

  const enableUserCodeRecoveryPressed = async (enable: boolean) => {
    const resp = await enableUserCodeRecovery({ enable, accessCode: '141414' });
    console.log(resp);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <View style={containerStyle}>
        <Button title="Scan" onPress={() => scanPressed()} />
        <Button title="Scan (Migrate)" onPress={() => scanPressed(true)} />
        <Button title="PurgeEd25519" onPress={() => purgeAllWalletsPressed(true)} />
        <Button title="validateMnemonic" onPress={() => validateMnemonicPressed()} />
        <Button title="enableUserCodeRecovery (true)" onPress={() => enableUserCodeRecoveryPressed(true)} />
        <Button title="enableUserCodeRecovery (false)" onPress={() => enableUserCodeRecoveryPressed(false)} />
      </View>
    </SafeAreaView>
  );
}

export default App;
