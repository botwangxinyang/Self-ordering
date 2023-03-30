import {
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  DeviceEventEmitter,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useEffect, useState } from "react";
import { RootTabScreenProps } from "../types";
import * as React from "react";
import { Button, Card } from "react-native-paper";
import {
  FAB,
  Portal,
  Provider,
  Modal,
  TextInput,
  Snackbar,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";

let timer: any = null;
export default function TabOneScreen({
  navigation,
  route,
}: RootTabScreenProps<"TabOne">) {
  const [state, setState] = React.useState({ open: false });
  const dispatch = useDispatch();
  const userinfo = useSelector((state: any) => {
    return state.userinfo;
  });
  const tableNo = useSelector((state) => {
    return state.tableNo;
  });
  const [errTip, setErrTip] = useState("");
  const showToast = (msg: string) => {
    setErrTip(msg);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setErrTip("");
    }, 1500);
  };
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  console.log("userinfo = ", userinfo);

  const onStateChange = ({ open }: { open: any }) => setState({ open });

  const { open } = state;

  let imagebackground = require("../assets/images/background.jpg");

  useEffect(() => {
    AsyncStorage.getItem("userinfo", (err, res) => {
      if (!res) {
        navigation.navigate("Login");
      } else {
        dispatch({
          type: "UPDATE_USERINFO",
          payload: JSON.parse(res),
        });
      }
    });

    AsyncStorage.getItem("tableNo", (err, res) => {
      if (!res) {
        alert("Please bind table");
      }
    });

  }, []);

  return (
    <Provider>
      <ImageBackground
        source={imagebackground}
        style={{ width: "100%", height: "100%" }}
        resizeMode={"stretch"}
      >
        <Image
          source={require("../assets/images/home.jpg")}
          style={{ width: "100%", height: 250 }}
        />
        <ScrollView>
          {/* <FAB
            icon="message-processing"
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: "30%",
              zIndex: 1000,
            }}
            onPress={() => {
              setMessage("");
              setVisible(true);
            }}
          /> */}
          <Portal>
            <Modal
              visible={visible}
              onDismiss={() => {
                setVisible(false);
              }}
              contentContainerStyle={{
                backgroundColor: "white",
                padding: 10,
                width: "90%",
                marginLeft: "5%",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                  paddingVertical: 15,
                }}
              >
                Service message
              </Text>
              <View style={styles.item}>
                <Text style={styles.itemLabel}>message:</Text>
                <TextInput
                  label="message"
                  mode="outlined"
                  style={styles.itemVal}
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />
              </View>
              <View
                style={{
                  paddingTop: 15,
                  // paddingBottom:
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Button
                  style={{
                    marginRight: 10,
                  }}
                  mode="outlined"
                  onPress={() => {
                    setVisible(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={() => {
                    if (!message) {
                      showToast("please enter message");
                      return;
                    }
                    if (!tableNo) {
                      alert("Please bind table");
                    }
                    fetch(`${baseUrl}/message`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        message,
                        tableNo,
                        userId: userinfo.id,
                      }),
                    })
                      .then((res) => res.json())
                      .then(async (res) => {
                        console.log("res = ", res);
                        if (res.code == -1) {
                          showToast("new error");
                          return;
                        }
                        showToast("Message succeeded!");
                        setVisible(false);
                      });
                  }}
                >
                  Submit
                </Button>
              </View>
              <Snackbar visible={!!errTip} onDismiss={() => {}}>
                {errTip}
              </Snackbar>
            </Modal>
          </Portal>
          <View style={styles.container}>
            {userinfo && userinfo.role == "admin" && (
              <Button
                style={styles.order}
                icon="silverware-fork-knife"
                mode="contained"
                onPress={() => navigation.navigate("Admin")}
              >
                Manage Food
              </Button>
            )}
            <Button
              style={styles.order}
              icon="silverware-fork-knife"
              mode="contained"
              onPress={() => navigation.navigate("TabTwo")}
            >
              Order
            </Button>
            <Button
              style={styles.pickup}
              icon="package-variant"
              mode="contained"
              onPress={() => navigation.navigate("Pickup")}
            >
              Pick up
            </Button>
            <Button
              style={styles.request}
              icon="room-service"
              mode="contained"
              onPress={() => navigation.navigate("Services")}
            >
              Request Services
            </Button>
            <Button
              style={styles.coupon}
              icon="ticket-percent-outline"
              mode="contained"
              onPress={() => navigation.navigate("Coupon")}
            >
              Coupon
            </Button>
            <Button
              style={styles.vip}
              icon="crown"
              mode="contained"
              onPress={() => navigation.navigate("VIP")}
            >
              VIP Center
            </Button>
            <Provider>
              <Portal>
                <FAB.Group
                  open={open}
                  icon={open ? "arrow-left" : "cart"}
                  actions={[
                    {
                      icon: "ticket-percent-outline",
                      label: "Coupons",
                      onPress: () => navigation.navigate("Coupon"),
                    },
                    {
                      icon: "cart",
                      label: "Shopping Cart",
                      onPress: () => navigation.navigate("Cart"),
                    },
                    {
                      icon: "wallet-outline",
                      label: "Payment",
                      onPress: () => navigation.navigate("Payment"),
                    },
                  ]}
                  onStateChange={onStateChange}
                  onPress={() => {
                    if (open) {
                      // do something if the speed dial is open
                    }
                  }}
                />
              </Portal>
            </Provider>
          </View>
        </ScrollView>
      </ImageBackground>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  order: {
    width: 178,
    height: 45,
    marginTop: 20,
    // top: 20,
  },
  pickup: {
    width: 178,
    height: 45,
    marginTop: 20,
    // top: 50,
  },
  request: {
    width: 178,
    height: 45,
    marginTop: 20,
    // top: 80,
  },
  coupon: {
    width: 178,
    height: 45,
    marginTop: 20,
    // top: 110,
  },
  vip: {
    width: 178,
    height: 45,
    marginTop: 20,
    marginBottom: 20,
    // top: 140,
  },
  card: {
    width: 380,
    height: 70,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingVertical: 15,
    width: "100%",
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: "bold",
    width: 100,
  },
  itemVal: {
    fontSize: 14,
    flex: 1,
  },
  word1: {},
  price: {
    color: "red",
  },
});
