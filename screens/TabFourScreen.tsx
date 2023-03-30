import { StyleSheet, DeviceEventEmitter } from "react-native";
import { Text, View } from "../components/Themed";
import * as React from "react";
import { Avatar, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootTabScreenProps } from "../types";
import { useSelector, useDispatch } from "react-redux";

export default function TabFourScreen({
  navigation,
}: RootTabScreenProps<"TabFour">) {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => {
    return state.userinfo;
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 30,
        }}
      />
      <Avatar.Image
        size={30}
        source={require("../assets/images/headpic.png")}
      />
      <Text style={styles.title}>
        {userinfo ? userinfo.username : "Not logged in"}
      </Text>
      <Button style={styles.points} mode="text">
        Points
      </Button>
      <Button
        style={styles.profile}
        icon="file-account"
        mode="contained"
        onPress={() => {
          if (userinfo) {
            navigation.navigate("Profile");
          } else {
            navigation.navigate("Login");
          }
        }}
      >
        Profile
      </Button>
      <Button
        style={styles.wallet}
        icon="wallet-outline"
        mode="contained"
        onPress={() => navigation.navigate("Wallet")}
      >
        Wallet
      </Button>
      <Button
        style={styles.notification}
        icon="bell-ring"
        mode="contained"
        onPress={() => navigation.navigate("Notification")}
      >
        Notification
      </Button>
      <Button
        style={styles.orders}
        icon="file-document-outline"
        mode="contained"
        onPress={() => {
          if (userinfo) {
            navigation.navigate("TabThree");
          } else {
            navigation.navigate("Login");
          }
        }}
      >
        Orders
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
        style={styles.setting}
        icon="cog"
        mode="contained"
        onPress={() => navigation.navigate("Setting")}
      >
        Setting
      </Button>
      <Button
        style={styles.FAQ}
        icon="frequently-asked-questions"
        mode="contained"
        onPress={() => navigation.navigate("FAQ")}
      >
        FAQ
      </Button>
      <Button
        style={styles.signout}
        mode="outlined"
        onPress={() => {
          if (userinfo) {
            AsyncStorage.removeItem("userinfo");
            dispatch({
              type: "UPDATE_USERINFO",
              payload: null,
            });
            AsyncStorage.removeItem("tableNo");
            dispatch({
              type: "UPDATE_TABLE_NO",
              payload: '',
            });
          }
          navigation.navigate("Login");
        }}
      >
        {userinfo ? "Sign Out" : "Sign In"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  picture: {
    top: 0,
  },
  points: {
    width: 178,
    height: 40,
    top: 10,
    left: "30%",
  },
  profile: {
    width: 150,
    height: 40,
    top: 20,
    right: "25%",
  },
  wallet: {
    width: 150,
    height: 40,
    top: -20,
    left: "25%",
  },
  notification: {
    width: 150,
    height: 40,
    top: 20,
    right: "25%",
  },
  orders: {
    width: 150,
    height: 40,
    top: -20,
    left: "25%",
  },
  coupon: {
    width: 150,
    height: 40,
    top: 20,
    right: "25%",
  },
  setting: {
    width: 150,
    height: 40,
    top: -20,
    left: "25%",
  },
  FAQ: {
    width: 150,
    height: 40,
    top: 20,
    right: "25%",
  },
  signout: {
    width: 150,
    height: 40,
    top: 60,
  },
});
