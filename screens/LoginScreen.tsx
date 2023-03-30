import { StyleSheet, TouchableOpacity, DeviceEventEmitter } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import * as React from "react";
import { baseUrl } from "../constants/util";
import { Button, TextInput, Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

let timer: any = null;
export default function LoginScreen({
  navigation,
}: RootTabScreenProps<"Login">) {
  const [username, setUsername] = React.useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [pwd, setPwd] = React.useState("");
  const [errTip, setErrTip] = useState("");
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => {
    return state.userinfo;
  });

  const showToast = (msg: string) => {
    setErrTip(msg);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setErrTip("");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Snackbar visible={!!errTip} onDismiss={() => {}}>
        {errTip}
      </Snackbar>
      <Text style={styles.title}>{isLogin ? 'Log In' : 'Register'}</Text>
      <TextInput
        style={styles.username}
        mode="outlined"
        placeholder="Type username"
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.password}
        label="Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        mode="outlined"
        placeholder="Type password"
        value={pwd}
        onChangeText={(text) => setPwd(text)}
      />
      <Button
        mode="contained"
        onPress={() => {
          // console.log("username = ", username);
          // console.log("pwd = ", pwd);
          if (!username) {
            showToast("please enter your username");
            return;
          }
          if (!pwd) {
            showToast("please enter your password");
            return;
          }
          if (isLogin) {
            fetch(`${baseUrl}/user/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
                pwd,
              }),
            })
              .then((res) => res.json())
              .then(async (res) => {
                console.log("res = ", res);
                if (res.code == -1) {
                  showToast("Account or password error");
                  return;
                }
                await AsyncStorage.setItem(
                  "userinfo",
                  JSON.stringify(res.data)
                );
                dispatch({
                  type: "UPDATE_USERINFO",
                  payload: res.data,
                });
                navigation.navigate("TabOne");
              });
          } else {
            fetch(`${baseUrl}/user/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
                pwd,
                role: "user",
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                console.log("res = ", res);
                if (res.code == -1) {
                  showToast("Existing user name");
                  return;
                }
                showToast("Registration succeeded, please log in");
                setIsLogin(true);
              });
          }
        }}
      >
        {isLogin ? "Log in" : "Register"}
      </Button>

      <TouchableOpacity
        onPress={() => {
          setIsLogin(!isLogin);
        }}
        style={{
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            color: "rgb(103, 80, 164)",
          }}
        >
          {isLogin ? "to register" : "to login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    top: -60,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  username: {
    top: -30,
    width: 300,
  },
  password: {
    top: -30,
    width: 300,
  },
});
