import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView, StatusBar, Button, View, ViewStyle} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {scan, purgeAllWallets, validateMnemonic, enableUserCodeRecovery, signMultiple, sign } from 'tangem-sdk-codora-react-native';

import {hash} from 'crypto';

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
    // const mnemonic = ['super', 'turtle', 'music', 'prize', 'civil', 'state', 'oxygen', 'urban', 'tank', 'valley', 'pet', 'labor'];
    const resp = await validateMnemonic(mnemonic);
    console.log(resp);
  };

  const enableUserCodeRecoveryPressed = async (enable: boolean) => {
    const resp = await enableUserCodeRecovery({ enable, accessCode: '141414' });
    console.log(resp);
  };

  const signMultiplePressed = async () => {
    const resp = await signMultiple({
      accessCode: '141414',
      signPayloads: [{
        // pubKeyBase58: '5QArYGmRmLhfVE18W6un5mAo5yzXEsRehAfzE4Kufmdv',
        pubKeyBase58: '2935LwRPAuT7xsMnibfDirrtb3dD3X5WNrRDS6FeWNbVA', // secp
        // unsignedHex: '0200070ca35e338cb01ea58f75651f338701b76143ef5747ff13e789d3845613be95507a0379b2b3710fbb213da248a01f687250ab8b25996196520b4f8c3c3154c15ead48f5c6d33744395af5724310568fe8b08cca65717a24e4752c9a832fbed7766f9932f7703a3c49efe3f36f67b824828d8777aeda26a519e3a7df41bc86a08dd2b8ad4ddeb3be25e7d76f6a3b27ebca584aec632d2d9c38b9f5372ae9bf327aee00000000000000000000000000000000000000000000000000000000000000004a868ff4b98228097f6ae8e9444dab38fb0988f37624a7ec550ee24b9118572b8c97258f4e2489f1bb3d1029148e0d830b5a1399daff1084048e7bd8dbe9f8590306466fe5211732ffecadba72c39be7bc8ce5bbc5f7126b2c439b3a40000000ce010e60afedb22717bd63192f54145a3f965a33bb82d2c7029eb2ce1e20826406a7d517192c568ee08a845f73d29788cf035c3145b21ab344d8062ea940000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a96be8125c64dab7fc7c0489faa0ef0ea4a248f14645cf49c13d82a26936449c67060503040a000404000000080009030000000000000000080005020e5c0000070601030109050b0101070601020609050b01010b04030902010a0c40420f000000000006',
        unsignedHex: '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8', // secp
      }],
    });

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
        <Button title="SignMultiple" onPress={() => signMultiplePressed()} />
        <Button title="PurgeEd25519" onPress={() => purgeAllWalletsPressed(true)} />
        <Button title="validateMnemonic" onPress={() => validateMnemonicPressed()} />
        <Button title="enableUserCodeRecovery (true)" onPress={() => enableUserCodeRecoveryPressed(true)} />
        <Button title="enableUserCodeRecovery (false)" onPress={() => enableUserCodeRecoveryPressed(false)} />
      </View>
    </SafeAreaView>
  );
}

export default App;
