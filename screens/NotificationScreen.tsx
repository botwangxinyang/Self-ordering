import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Card, Paragraph,Button,Portal,Provider,Dialog,Title} from 'react-native-paper';
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent';
export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card1}>
      <Card.Content>
      <Title>Message</Title>
        <Paragraph>
        <Text>Order Status: Finish</Text>
        </Paragraph>
        </Card.Content>
        <Card.Actions>
      <Button onPress={() => console.log('Pressed')}>Cancel</Button>
      <Button onPress={() => console.log('Pressed')}>Ok</Button>
    </Card.Actions>
    <Paragraph style={styles.information}>
      <Text>Order Information</Text>
    </Paragraph>
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
    justifyContent: 'center',
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
  card1: {
    top: 10,
    width: 380,
    height:170,
  },
  information: {
    left: 250,
  }
});