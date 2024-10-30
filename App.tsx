import React from 'react';
import {SafeAreaView, StatusBar, Button, View, ViewStyle} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {scan, sign} from 'tangem-sdk-codora-react-native';

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
      const result = await scan(undefined, '141414');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const signPressed = async () => {
    try {
      const unsignedHex = '01000103c6dadd07fa6b967f95c1c794207a6660b6c103bb3d9225cb65a32aec9233bd4a7851663184f478288effadd0b24e403c625569350166ae9dfc10e1eaf4a203b000000000000000000000000000000000000000000000000000000000000000003aab9ecdda6344c5dea7dc04242579a2171d7e0b7659ac1d16b20ab1f00ba77901020200010c020000001027000000000000';
      const pubKeyBase58 = '6MEvbX4ek5xivDyrMdyrB2X3nJrH1CACWJwK6kjFNyCF';
      const result = await sign(unsignedHex, pubKeyBase58, 'AF04000000012691', '141414');
      console.log(result);
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
      </View>
    </SafeAreaView>
  );
}

export default App;
