import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { Text, View } from '../components/Themed';

export default function FAQScreen() {
  const [text, setText] = React.useState("");
  const [text1, setText1] = React.useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <TextInput
        style={styles.subject}
        label="Subject"
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        style={styles.message}
        label="Message"
        value={text1}
        onChangeText={text1 => setText1(text1)}
      />
      <Button mode="contained" onPress={() => console.log('Submit')}>
        Submit
      </Button>
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
    top: -60,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  subject: {
    top: -30,
    width: 380,
  },
  message: {
    top: -30,
    height: 400,
    width: 380,
  },
});