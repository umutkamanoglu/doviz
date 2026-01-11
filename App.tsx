import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import './global.css';

export default function App() {
  return (
    <SafeAreaView>
      <Text>Hello World</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
