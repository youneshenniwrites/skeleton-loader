import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { ItemList } from './src/ItemList';
import { wait } from './src/utils';
import ItemListLoader from './src/ItemListLoader';

export default function App() {
  const [hasloaded, setHasLoaded] = React.useState(false);

  React.useEffect(() => {
    wait(2000).then(() => setHasLoaded(true));
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden />
      {hasloaded ? <ItemList /> : <ItemListLoader />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
