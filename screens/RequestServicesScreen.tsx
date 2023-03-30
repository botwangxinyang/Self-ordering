import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import { Text, View } from "../components/Themed";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../constants/util";

export default function RequestServicesScreen() {
  //Add Water
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  //Pick up
  const [visible1, setVisible1] = React.useState(false);
  const showDialog1 = () => setVisible1(true);
  const hideDialog1 = () => setVisible1(false);
  //Rush to Serve Food
  const [visible2, setVisible2] = React.useState(false);
  const showDialog2 = () => setVisible2(true);
  const hideDialog2 = () => setVisible2(false);
  //Request for Napkin
  const [visible3, setVisible3] = React.useState(false);
  const showDialog3 = () => setVisible3(true);
  const hideDialog3 = () => setVisible3(false);
  //Add Tip
  const [visible4, setVisible4] = React.useState(false);
  const showDialog4 = () => setVisible4(true);
  const hideDialog4 = () => setVisible4(false);
  //Adjust Order
  const [visible5, setVisible5] = React.useState(false);
  const showDialog5 = () => setVisible5(true);
  const hideDialog5 = () => setVisible5(false);
  const userinfo = useSelector((state: any) => {
    return state.userinfo;
  });
  const tableNo = useSelector((state: any) => {
    return state.tableNo;
  });

  const sendMsg = (type: any) => {
    if (!tableNo) {
      alert("Please bind table");
    }
    fetch(`${baseUrl}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        tableNo,
        userId: userinfo.id,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log("res = ", res);
        // alert("Message sent successfully");
      });
  };

  return (
    <View style={styles.container}>
      <Provider>
        <Button
          style={styles.water}
          icon="cup-water"
          mode="contained"
          onPress={() => {
            showDialog();
            sendMsg("Add Water");
          }}
        >
          Add Water
        </Button>
        <View>
          <Portal>
            <Dialog
              style={styles.dialog}
              visible={visible}
              onDismiss={hideDialog}
            >
              <Dialog.Content>
                <Text>on the way.</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
      <Provider>
        <Button
          style={styles.pickup}
          icon="package-variant"
          mode="contained"
          onPress={() => {
            showDialog1();
            sendMsg("Pick up");
          }}
        >
          Pick up
        </Button>
        <View>
          <Portal>
            <Dialog
              style={styles.dialog}
              visible={visible1}
              onDismiss={hideDialog1}
            >
              <Dialog.Content>
                <Text>on the way.</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog1}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
      <Provider>
        <Button
          style={styles.rush}
          icon="bell-ring"
          mode="contained"
          onPress={() => {
            showDialog2();
            sendMsg("Rush to Serve Food");
          }}
        >
          Rush to Serve Food
        </Button>
        <View>
          <Portal>
            <Dialog
              style={styles.dialog}
              visible={visible2}
              onDismiss={hideDialog2}
            >
              <Dialog.Content>
                <Text>on the way.</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog2}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
      <Provider>
        <Button
          style={styles.napkin}
          icon="hand-wave"
          mode="contained"
          onPress={() => {
            showDialog3();
            sendMsg("Request for Napkin");
          }}
        >
          Request for Napkin
        </Button>
        <View>
          <Portal>
            <Dialog
              style={styles.dialog}
              visible={visible3}
              onDismiss={hideDialog3}
            >
              <Dialog.Content>
                <Text>on the way.</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog3}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
      <Provider>
        <Button
          style={styles.tips}
          icon="cash-multiple"
          mode="contained"
          onPress={() => {
            showDialog4();
            sendMsg("Add Tip");
          }}
        >
          Add Tip
        </Button>
        <View>
          <Portal>
            <Dialog
              style={styles.dialog}
              visible={visible4}
              onDismiss={hideDialog4}
            >
              <Dialog.Content>
                <Text>on the way.</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog4}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
      <Provider>
        <Button
          style={styles.adjust}
          icon="food-off"
          mode="contained"
          onPress={() => {
            showDialog5();
            sendMsg("Adjust Order");
          }}
        >
          Adjust Order
        </Button>
        <View>
          <Portal>
            <Dialog visible={visible5} onDismiss={hideDialog5}>
              <Dialog.Content>
                <Text>on the way.</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog5}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center',
  },
  title: {
    top: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  water: {
    width: 150,
    height: 40,
    top: 45,
    right: "25%",
  },
  pickup: {
    width: 150,
    height: 40,
    bottom: 70,
    left: "25%",
  },
  rush: {
    width: 220,
    height: 40,
    top: -115,
    right: "16%",
  },
  napkin: {
    width: 220,
    height: 40,
    top: -160,
    right: "16%",
  },
  tips: {
    width: 150,
    height: 40,
    bottom: 200,
    right: "25%",
  },
  adjust: {
    width: 150,
    height: 40,
    top: -315,
    left: "25%",
  },
  dialog: {
    top: 20,
  },
});
