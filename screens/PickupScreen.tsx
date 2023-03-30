import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScreenStackHeaderRightView } from 'react-native-screens';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function PickupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick up</Text>
      <Card style={styles.card}>
        <Card.Title title="Order Information" left={LeftContent} />
        <Card.Content>
        <Title><Text>Pick-up Code: #XXXXXXXX</Text></Title>
        <Paragraph><Text>Order Time: 2022-xx-xx</Text></Paragraph>
        <Paragraph><Text>Order Number:xxxxxxxxxxx</Text></Paragraph>
        <Paragraph><Text>Item: XXX (food name) </Text></Paragraph>
        <Paragraph><View style={styles.money}><Text>Tax: XX $</Text></View></Paragraph>
        <Paragraph><View style={styles.money}><Text>Sum: XX $</Text></View></Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => console.log('Add Tip')}>Add Tip</Button>
          <Button onPress={() => console.log('Confirm Pick-up')}>Confirm Pick-up</Button>
        </Card.Actions>
      </Card>
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
  card: {
    height:600,
    width: 400,
  },
  money: {
    left: 190,
  },
  button:{
    //justifyContent: 'flex-end',
    top: 500,
  }
});
