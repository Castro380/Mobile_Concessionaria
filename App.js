import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import StackConcessionaria from './src/routes/Router';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackConcessionaria />
      </NavigationContainer>
    </PaperProvider>
  );
}

