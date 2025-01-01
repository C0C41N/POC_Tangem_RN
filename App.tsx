import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView, StatusBar, Button, View, ViewStyle} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {scan, createAllWallets, purgeAllWallets } from 'tangem-sdk-codora-react-native';

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
    const card = await scan({
      accessCode: '141414',
    });

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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <View style={containerStyle}>
        <Button title="Scan" onPress={() => scanPressed()} />
        <Button title="CreateAllWallets" onPress={() => createAllWalletsPressed()} />
        <Button title="PurgeAllWallets" onPress={() => purgeAllWalletsPressed()} />
      </View>
    </SafeAreaView>
  );
}

export default App;
