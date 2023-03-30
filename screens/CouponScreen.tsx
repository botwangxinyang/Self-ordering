import * as React from 'react';
import { StyleSheet,Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card, Paragraph,Button,Portal,Provider,Dialog} from 'react-native-paper';
const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <Provider>
      <View>
        <Button onPress={showDialog}>Show Dialog</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

function UsedcouponsScreen() {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <View style={styles.tabstyle}>
      <Card style={styles.unused}>
        <Paragraph style={styles.text}>No.1</Paragraph>
        <Paragraph style={styles.text}><Text>15.00 OFF</Text></Paragraph>
        <Paragraph style={styles.text}><Text>For Order over US $0.00</Text></Paragraph>
        <Paragraph style={styles.text}>Code:XXXXXXXX</Paragraph>
        <Paragraph style={styles.text}><Text>11/13/2022--12/13/2022</Text></Paragraph>
      </Card>
      <Provider>
        <Button onPress={showDialog}>Show Informaiton</Button>
        <View>
          <Portal>
            <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Subject</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Coupons Detail</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </View>
  );
}

function ExpiredCouponsScreen() {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <View style={styles.tabstyle}>
      <Card style={styles.expired}>
        <Paragraph style={styles.text}><Text>No.1</Text></Paragraph>
        <Paragraph style={styles.text}><Text>15.00 OFF</Text></Paragraph>
        <Paragraph style={styles.text}><Text>For Order over US $0.00</Text></Paragraph>
        <Paragraph style={styles.text}>Code:XXXXXXXX</Paragraph>
        <Paragraph style={styles.text}><Text>9/13/2022--10/13/2022</Text></Paragraph>
      </Card>
      <Provider>
        <View>
          <Button onPress={showDialog}>Show Informaiton</Button>
          <Portal>
            <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Paragraph>This Coupons has Expired</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function CouponScreen() {
  return (
    <NavigationContainer independent={true}>
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        tabStyle: { flex: 1, justifyContent: 'center'},
        indicatorStyle: {
            marginHorizontal: '5%',
            width: '40%'   
        },
        style: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen name="Unused Coupons" component={UsedcouponsScreen} />
      <Tab.Screen name="Expired Coupons" component={ExpiredCouponsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
}
const styles = StyleSheet.create({
  tabstyle:{
    flex: 1,
    height:1000,
    width:500,
    alignItems: 'center', 
    left:50,
    top:20,
  },
  unused:{
    height:150,
    width:380,
    right: 108,
  },
  expired:{
    height:150,
    width:380,
    right: 108,
  },
  text: {
    left: 10,
  },
  information: {
    left: 10,
  },
  dialog: {
    width: 300,
    left: -35,
  },
})

