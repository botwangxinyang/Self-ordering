import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import { Button, Dialog, Paragraph, Portal,Provider } from 'react-native-paper';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as React from 'react';

export default function SettingScreen({ navigation }: RootTabScreenProps<'Setting'>) {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [visible1, setVisible1] = React.useState(false);
  const showDialog1 = () => setVisible1(true);
  const hideDialog1 = () => setVisible1(false);

  const [visible2, setVisible2] = React.useState(false);
  const showDialog2 = () => setVisible2(true);
  const hideDialog2 = () => setVisible2(false);

  const [visible3, setVisible3] = React.useState(false);
  const showDialog3 = () => setVisible3(true);
  const hideDialog3 = () => setVisible3(false);
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Setting</Text>
        <Provider>
        <Button style={styles.account} icon="file-account" mode="contained" onPress={() => navigation.navigate('Profile')}>
          Account
        </Button>
        <Button style={styles.notification} icon="bell-ring" mode="contained" onPress={() => navigation.navigate('Notification')}>
          Notification
        </Button>
        <Button style={styles.security} icon="security" mode="contained" onPress={showDialog}>
          Security
        </Button>
        <Button style={styles.privacy} icon="account-lock" mode="contained" onPress={showDialog2}>
          Privacy
        </Button>
        <Button style={styles.location} icon="map-marker-radius" mode="contained" onPress={() => console.log('Location')}>
          Location
        </Button>
        <Button style={styles.language} icon="web" mode="contained" onPress={showDialog3}>
          Language
        </Button>
        <Button style={styles.about} icon="information" mode="contained" onPress={showDialog3}>
          About
        </Button>
        <Button style={styles.signout} mode="outlined" onPress={() => navigation.navigate('Login')}>
          Sign Out
        </Button>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                <Text>This is a scrollable area</Text>
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog visible={visible2} onDismiss={hideDialog2}>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                <Text>This is a scrollable area</Text>
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog visible={visible3} onDismiss={hideDialog3}>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                <Text>This is a scrollable area</Text>
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
        </Provider>
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
    top: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  account: {
    top: 50,
    right: '25%',
    width: 150,
    height:40,
  },
  notification:{
    top: 10,
    left: '25%',
    width: 150,
    height:40,
  },
  security: {
    top: 70,
    right: '25%',
    width: 150,
    height:40,
  },
  privacy: {
    top: 30,
    left: '25%',
    width: 150,
    height:40,
  },
  location: {
    top: 90,
    right: '25%',
    width: 150,
    height:40,
  },
  language: {
    top: 50,
    left: '25%',
    width: 150,
    height:40,
  },
  about: {
    top: 110,
    right: '25%',
    width: 150,
    height:40,
  },
  signout: {
    top: 150,
    width: 150,
    height:40,
  },
});