import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, StyleSheet, View } from "react-native";
import {
  FAB,
  Portal,
  Provider,
  Modal,
  TextInput,
  Snackbar,
  Button,
} from "react-native-paper";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { baseUrl } from "./constants/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

let timer: any = null;
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [userinfo, setUserinfo] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("userinfo", (err, res) => {
      if (res) {
        setUserinfo(JSON.parse(res));
      }
    });
  }, []);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ReduxProvider>
    );
  }
}
