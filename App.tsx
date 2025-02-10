import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView, StatusBar, Button, View, ViewStyle} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {scan, createAllWallets, purgeAllWallets, resetCard, signMultiple } from 'tangem-sdk-codora-react-native';

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

  const scanPressed = async () => {
    const card = await scan({});

    console.log(JSON.stringify(card, null, 2));
  };

  const createAllWalletsPressed = async () => {
    const resp = await createAllWallets({});
    console.log(resp);
  };

  const purgeAllWalletsPressed = async () => {
    const resp = await purgeAllWallets({});
    console.log(resp);
  };

  const resetCardPressed = async () => {
    const resp = await resetCard({});
    console.log(resp);
  };

  const signPressed = async () => {
    const resp = await signMultiple({
      signPayloads: [{
        pubKeyBase58: '2935LwRPAuT7xsMnibfDirrtb3dD3X5WNrRDS6FeWNbVA',
        unsignedHex: '5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9',
      }],
      accessCode: '141414',
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
        <Button title="Sign" onPress={() => signPressed()} />
        <Button title="CreateAllWallets" onPress={() => createAllWalletsPressed()} />
        <Button title="PurgeAllWallets" onPress={() => purgeAllWalletsPressed()} />
        <Button title="ResetCard" onPress={() => resetCardPressed()} />
      </View>
    </SafeAreaView>
  );
}

export default App;
