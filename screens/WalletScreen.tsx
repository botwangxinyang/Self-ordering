import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Card, Paragraph,Button,Portal,Provider,Dialog,IconButton, MD3Colors,TextInput} from 'react-native-paper';


export default function WalletScreen() {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [text, setText] = React.useState('');

  const [visible2, setVisible2] = React.useState(false);
  const showDialog2 = () => setVisible2(true);
  const hideDialog2 = () => setVisible2(false);

  const [text2, setText2] = React.useState('');

  const [text1, setText1] = React.useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      <Card style={styles.cardstyle}>
        <Paragraph>
          <Text style={styles.contentstyle}>Bank Account and Card</Text>
          <Provider>
            <View>
              <IconButton
                style={styles.icon}
                icon="card-text"
                iconColor={MD3Colors.error50}
                size={40}
                onPress={showDialog}/>
        
              <Portal>
                <View style={styles.position}>
                <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>Informaiton</Dialog.Title>
                  <Dialog.Content>
                    <TextInput
                      label=" Bank Account "
                      value={text}
                      onChangeText={text => setText(text)}
                    />
                    <TextInput
                      label="Bank Password"
                      secureTextEntry
                      value={text1}
                      onChangeText={text => setText1(text)}
                      right={<TextInput.Icon icon="eye" />}
                    />   
                    <TextInput
                      label=" security Code "
                      value={text2}
                      onChangeText={text => setText2(text)}
                    />           
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                  </Dialog.Actions>
                </Dialog>
                </View>
              </Portal>
            </View>
          </Provider>
        </Paragraph>
      </Card>
      <Provider>
        <View>
          <Button icon="barcode" mode="contained"  onPress={showDialog2} style={styles.buttonstyle}>Gift Card</Button>
          <Portal>
            <Dialog visible={visible2} onDismiss={hideDialog2}>
              <Dialog.Title>Gift Card</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label=" Gift Card Code "
                  value={text2}
                  onChangeText={text2 => setText(text2)}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog2}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color:'blue',
    top:30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonstyle:{
    width:380,
    height:50,
    top:40,
  },
  cardstyle:{
    top:70,
    width:380,
    height:330,
  },
  contentstyle:{
    color:'#9C33FF',
    fontSize:20,
  },
  icon: {
    top: 30,
  },
  dialog: {
    width:360,
    height:300,
  },
  position: {
    right: 300,
  }
});