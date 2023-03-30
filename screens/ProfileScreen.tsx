import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, DeviceEventEmitter } from "react-native";
import { Avatar, Button, TextInput, Snackbar } from "react-native-paper";
import { baseUrl } from "../constants/util";
import { Text, View } from "../components/Themed";
import * as React from "react";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";

let timer: any = null;
export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => {
    return state.userinfo;
  });
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [username, setUsername] = useState("");
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
  useEffect(() => {
    if (userinfo) {
      setPhone(userinfo.phone);
      setUsername(userinfo.username);
      setEmail(userinfo.email);
      setPwd(userinfo.pwd);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Snackbar visible={!!errTip} onDismiss={() => {}}>
        {errTip}
      </Snackbar>
      <Avatar.Image
        size={60}
        source={require("../assets/images/headpic.png")}
      />
      <View style={styles.item}>
        <Text style={styles.itemLabel}>Username:</Text>
        <TextInput
          label="Username"
          mode="outlined"
          style={styles.itemVal}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.itemLabel}>Email:</Text>
        <TextInput
          label="Email"
          mode="outlined"
          style={styles.itemVal}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.itemLabel}>Password:</Text>
        <TextInput
          label="Password"
          mode="outlined"
          style={styles.itemVal}
          value={pwd}
          onChangeText={(text) => setPwd(text)}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.itemLabel}>Phone:</Text>
        <TextInput
          label="Phone"
          mode="outlined"
          style={styles.itemVal}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
      </View>

      <Button
        style={styles.botton}
        mode="contained"
        onPress={() => {
          if (!username) {
            showToast("please enter your username");
            return;
          }
          if (!pwd) {
            showToast("please enter your password");
            return;
          }
          fetch(`${baseUrl}/user/${userinfo.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              pwd,
              email,
              phone,
            }),
          })
            .then((res) => res.json())
            .then(async (res) => {
              console.log("res = ", res);
              if (res.code == -1) {
                showToast("Update failed");
                return;
              }
              await AsyncStorage.setItem("userinfo", JSON.stringify(res.data));
              dispatch({
                type: "UPDATE_USERINFO",
                payload: res.data
              });
              DeviceEventEmitter.emit("update");
              showToast("Update succeeded");
            });
        }}
      >
        Update
      </Button>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    // justifyContent: "center",
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
  card: {
    top: 20,
    height: 100,
    width: 380,
  },
  position1: {
    fontSize: 20,
    fontWeight: "bold",
    top: 40,
  },
  position2: {
    fontSize: 20,
    fontWeight: "bold",
    top: 40,
  },
  position3: {
    fontSize: 20,
    fontWeight: "bold",
    top: 40,
  },
  position4: {
    fontSize: 20,
    fontWeight: "bold",
    top: 40,
  },
  botton: {
    top: 50,
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
});
