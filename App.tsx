import React from 'react';
import {SafeAreaView, StatusBar, Button, View, ViewStyle} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {BackupService, createAllWallets, purgeAllWallets, resetBackup, scan, setAccessCode, sign} from 'tangem-sdk-codora-react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const scanPressed = async () => {
    try {

      const result = await scan({
        msgHeader: 'Scan Card',
        msgBody: 'Please scan your card',
        accessCode: '141414',
      });

      console.log(JSON.stringify(result.backupStatus, null, 2));
      console.log(JSON.stringify(result.wallets.map(e => ({curve: e.curve, publicKey: e.publicKeyBase58})), null, 2));

    } catch (error) {
      console.log(error);
    }
  };

  const signPressed = async () => {
    try {

      const unsignedHex = '01000103c6dadd07fa6b967f95c1c794207a6660b6c103bb3d9225cb65a32aec9233bd4a7851663184f478288effadd0b24e403c625569350166ae9dfc10e1eaf4a203b000000000000000000000000000000000000000000000000000000000000000003aab9ecdda6344c5dea7dc04242579a2171d7e0b7659ac1d16b20ab1f00ba77901020200010c020000001027000000000000';
      const pubKeyBase58 = '2MfvVtqxsER27y7uCJmiVncoLPM7XFHeQ3oJWLwQRMdF';

      const result = await sign({
        pubKeyBase58,
        unsignedHex,
        accessCode: '141414',
        msgHeader: 'Sign Transaction',
        msgBody: 'Please scan card to sign the transaction',
      });

      console.log(result);

    } catch (error) {
      console.log(error);
    }
  };

  const purgeAllWalletsPressed = async () => {
    try {

      const result = await purgeAllWallets({
        accessCode: '141414',
        msgHeader: 'Purge Wallets',
        msgBody: 'Please scan card to purge all wallets',
      });

      console.log(JSON.stringify({
        length: result.length,
        wallets: result.map(e => ({curve: e.curve, publicKey: e.publicKey})),
      }, null, 2));

    } catch (error) {
      console.log(error);
    }
  };

  const createAllWalletsPressed = async () => {
    try {

      const result = await createAllWallets({
        accessCode: '141414',
        msgHeader: 'Create Wallets',
        msgBody: 'Please scan card to create all wallets',
      });

      console.log(JSON.stringify({
        length: result.length,
        wallets: result.map(e => ({curve: e.curve, publicKey: e.publicKey})),
      }, null, 2));

    } catch (error) {
      console.log(error);
    }
  };

  const setAccessCodePressed = async () => {
    try {

      await setAccessCode({
        accessCode: '000000',
        newAccessCode: '141414',
        msgHeader: 'Set Access Code',
        msgBody: 'Please scan card to set access code',
      });

    } catch (error) {
      console.log(error);
    }
  };

  const backupPressed = async () => {
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {

      const backupSvc = await BackupService.init();

      console.log('After Init', JSON.stringify(backupSvc.currentState, null, 2));

      await backupSvc.readPrimaryCard();

      console.log('After Reading Primary Card', JSON.stringify(backupSvc.currentState, null, 2));

      await wait(2000);

      await backupSvc.setAccessCode('141414');

      console.log('After Setting Access Code', JSON.stringify(backupSvc.currentState, null, 2));

      await wait(2000);

      await backupSvc.addBackupCard();

      console.log('After Adding Backup Card', JSON.stringify(backupSvc.currentState, null, 2));

      while (backupSvc.currentState.canProceed) {
        await wait(2000);
        await backupSvc.proceedBackup();
        console.log('After Proceed Backup', JSON.stringify(backupSvc.currentState, null, 2));
      }

    } catch (error) {
      console.log(error);
    }
  };

  const resetBackupPressed = async () => {
    try {

      await resetBackup({
        accessCode: '141414',
        msgBody: 'Reset Backup',
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <View style={containerStyle}>
        <Button title="Scan" onPress={() => scanPressed()} />
        <Button title="Sign" onPress={() => signPressed()} />
        <Button title="PurgeAllWallets" onPress={() => purgeAllWalletsPressed()} />
        <Button title="CreateAllWallets" onPress={() => createAllWalletsPressed()} />
        <Button title="SetAccessCode" onPress={() => setAccessCodePressed()} />
        <Button title="Reset Backup" onPress={() => resetBackupPressed()} />
        <Button title="Backup" onPress={() => backupPressed()} />
      </View>
    </SafeAreaView>
  );
}

export default App;
