import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView, StatusBar, Button, View, ViewStyle} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {scan, createAllWallets, resetCard, BackupService, forceExitApp, LanguageCodes, setAppLanguage} from 'tangem-sdk-codora-react-native';

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

    const {card, migrateStatus} = scanResult.data!;

    card.wallets.map(wallet => {
      const curve = wallet.curve;
      const pubKey58 = wallet.publicKeyBase58;
      // const pubKeyHex = wallet.publicKey;
      console.log(`Wallet | ${curve} | ${pubKey58}`);
    });

    const cardId = card.cardId;
    console.log({ cardId, migrateStatus });
  };

  const createAllWalletsPressed = async () => {
    const resp = await createAllWallets({});
    console.log(resp);
  };

  const backupPressed = async () => {
    const backupSvc = await BackupService.getInstance();

    const $readPrimaryCard = await backupSvc.readPrimaryCard();

    console.log(JSON.stringify({ readPrimaryCard: $readPrimaryCard }, null, 2));
    await new Promise(resolve => setTimeout(resolve, 1000));

    const $setAccessCode = await backupSvc.setAccessCode('141414');

    console.log(JSON.stringify({ setAccessCode: $setAccessCode }, null, 2));
    await new Promise(resolve => setTimeout(resolve, 1000));

    const $addBackupCard = await backupSvc.addBackupCard();

    console.log(JSON.stringify({ addBackupCard: $addBackupCard }, null, 2));
    await new Promise(resolve => setTimeout(resolve, 1000));

    const $proceedBackup = await backupSvc.proceedBackup();

    console.log(JSON.stringify({ proceedBackup: $proceedBackup }, null, 2));
    await new Promise(resolve => setTimeout(resolve, 1000));

    const $$proceedBackup = await backupSvc.proceedBackup();

    console.log(JSON.stringify({ proceedBackup: $$proceedBackup }, null, 2));

  };

  const resetCardPressed = async () => {
    const resp = await resetCard({});
    console.log(resp);
  };

  let locale = LanguageCodes.Chinese;
  const changeLocale = async () => {
    const resp = await setAppLanguage(locale);
    console.log(resp);
    locale = locale === LanguageCodes.Chinese ? LanguageCodes.English : LanguageCodes.Chinese;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <View style={containerStyle}>
        <Button title="Scan" onPress={() => scanPressed()} />
        <Button title="CreateAllWallets" onPress={() => createAllWalletsPressed()} />
        <Button title="ResetCard" onPress={() => resetCardPressed()} />
        <Button title="Backup" onPress={() => backupPressed()} />
        <Button title="Exit" onPress={() => forceExitApp()} />
        <Button title="Change Locale" onPress={() => changeLocale()} />
      </View>
    </SafeAreaView>
  );
}

export default App;
