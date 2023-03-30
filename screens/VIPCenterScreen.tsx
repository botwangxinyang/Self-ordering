import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function VIPCenterScreen({ navigation }: RootTabScreenProps<'VIP'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VIP Center</Text>
      <View style={styles.point}><Text>Point: XXX</Text></View>
      <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Coupon')}>Exchange Coupon</Button>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  point: {
    fontSize: 20,
    top: 50,
    right: 150,
  },
  button: {
    top: 100,
  },
});
