import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView, StatusBar, Button, View, ViewStyle} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {scan, purgeAllWallets, signMultiple, createAllWallets, resetCard} from 'tangem-sdk-codora-react-native';

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
    // const migratePublicKey = migrate ? '03A3BB1382EA40BF3C8D621393BE94E4E73613A3302F3130E9DBDA9503C488C3CC' : undefined;
    const migratePublicKey = undefined;
    const scanResult = await scan({ migrate, migratePublicKey });

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

    const cardId = card.cardId;
    console.log({ cardId });
  };

  const purgeAllWalletsPressed = async (onlyEd25519?: boolean) => {
    const resp = await purgeAllWallets({ onlyEd25519 });
    console.log(resp);
  };

  const signMultiplePressed = async () => {
    const resp = await signMultiple({
      signPayloads: [{
        pubKeyBase58: '5QArYGmRmLhfVE18W6un5mAo5yzXEsRehAfzE4Kufmdv',
        unsignedHex: '0200070ca35e338cb01ea58f75651f338701b76143ef5747ff13e789d3845613be95507a0379b2b3710fbb213da248a01f687250ab8b25996196520b4f8c3c3154c15ead459b073cccb5b4339806a9d78747582685dd907bf3874a8b318add62263113869932f7703a3c49efe3f36f67b824828d8777aeda26a519e3a7df41bc86a08dd20bb7fc0a7733eaa59e7af7140faf70456f9d14b55ef70e9d09b1eee48e3ab5eb00000000000000000000000000000000000000000000000000000000000000004e08bcb2c81f78b18bc1bbbaed154b8abe97a3a2d04c60e5ab339abce47da2828c97258f4e2489f1bb3d1029148e0d830b5a1399daff1084048e7bd8dbe9f8590306466fe5211732ffecadba72c39be7bc8ce5bbc5f7126b2c439b3a40000000ce010e60afedb22717bd63192f54145a3f965a33bb82d2c7029eb2ce1e20826406a7d517192c568ee08a845f73d29788cf035c3145b21ab344d8062ea940000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a99f181100dd6969aa4866b1079520344d22cac2a74d6d6887fa2237a4373a4514060503020a00040400000008000903850644000000000008000502fd3f0000070601030109050b0101070601040609050b01010b04030904010a0ca08601000000000006',
      }],
    });

    console.log(resp);
  };

  const createAllWalletsPressed = async () => {
    const resp = await createAllWallets({});
    console.log(resp);
  };

  const resetCardPressed = async () => {
    const resp = await resetCard({});
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
        <Button title="CreateAllWallets" onPress={() => createAllWalletsPressed()} />
        <Button title="ResetCard" onPress={() => resetCardPressed()} />
      </View>
    </SafeAreaView>
  );
}

export default App;
