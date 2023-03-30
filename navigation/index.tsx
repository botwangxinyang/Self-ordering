/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  StackRouter,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, View } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import TabThreeScreen from "../screens/TabThreeScreen";
import OrderDetail from "../screens/OrderDetail";
import Admin from "../screens/Admin";
import TabFourScreen from "../screens/TabFourScreen";
import PickupScreen from "../screens/PickupScreen";
import RequestServicesScreen from "../screens/RequestServicesScreen";
import CouponScreen from "../screens/CouponScreen";
import VIPCenterScreen from "../screens/VIPCenterScreen";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WalletScreen from "../screens/WalletScreen";
import NotificationScreen from "../screens/NotificationScreen";
import SettingScreen from "../screens/SettingScreen";
import FAQScreen from "../screens/FAQScreen";
import {
  IconButton,
  Portal,
  Provider,
  Modal,
  TextInput,
  Snackbar,
  Button,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import LoginScreen from "../screens/LoginScreen";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useSelector, useDispatch } from "react-redux";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    // Admin
    // BottomTabNavigator
    // TabTwoScreen
    // ShoppingCartScreen

    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      <Stack.Screen name="Pickup" component={PickupScreen} />
      <Stack.Screen name="Services" component={RequestServicesScreen} />
      <Stack.Screen name="Coupon" component={CouponScreen} />
      <Stack.Screen name="VIP" component={VIPCenterScreen} />
      <Stack.Screen name="Cart" component={ShoppingCartScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="Admin" component={Admin} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen
        name="Login"
        options={{
          headerLeft: () => {
            return null;
          },
          headerBackVisible: false,
        }}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();
let timer: any = null;
function BottomTabNavigator() {
  const [scanned, setScanned] = useState(false);
  const colorScheme = useColorScheme();
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
  const [tableNo, setTableNo] = useState("");
  const dispatch = useDispatch();
  const tableNoRedux = useSelector((state: any) => {
    return state.tableNo;
  });
  useEffect(() => {
    if (!tableNoRedux) {
      AsyncStorage.getItem("tableNo", (err, res) => {
        if (res) {
          // setCurTableNo(res);
          dispatch({
            type: "UPDATE_TABLE_NO",
            payload: res,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log("status = ", status);
      if (status !== "granted") {
        alert("No access to camera");
      }
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setTableNo(data);
  };

  return (
    <Provider>
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
            Bind Table No
          </Text>

          <View
            style={
              {
                // height: 200,
              }
            }
          >
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{
                width: 300,
                height: 300,
              }}
            />
            {scanned && (
              <Button onPress={() => setScanned(false)}>
                Tap to Scan Again
              </Button>
            )}
          </View>

          <View style={styles.item}>
            <Text style={styles.itemLabel}>Table No:</Text>
            <TextInput
              label="Table No"
              mode="outlined"
              style={styles.itemVal}
              value={tableNo}
              onChangeText={(text) => setTableNo(text)}
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
              onPress={async () => {
                if (!tableNo) {
                  showToast("please enter Table No");
                  return;
                }
                await AsyncStorage.setItem("tableNo", tableNo);
                dispatch({
                  type: "UPDATE_TABLE_NO",
                  payload: tableNo,
                });
                showToast("Setting table no succeeded!");
                setVisible(false);
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
      <BottomTab.Navigator
        initialRouteName="TabOne"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
        }}
      >
        <BottomTab.Screen
          name="TabOne"
          component={TabOneScreen}
          options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
            // title: "Home",
            headerTitle: `Table No: ${tableNoRedux ? tableNoRedux : 'no bind'}`,
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconButton
                  icon="qrcode-scan"
                  iconColor="rgb(103, 80, 164)"
                  size={20}
                  onPress={() => {
                    setScanned(false);
                    setTableNo(tableNoRedux);
                    setVisible(true);
                  }}
                />
                {/* <Pressable
                onPress={() => navigation.navigate("Modal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable> */}
              </View>
            ),
          })}
        />
        <BottomTab.Screen
          name="TabTwo"
          component={TabTwoScreen}
          options={{
            title: "Order",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="TabThree"
          component={TabThreeScreen}
          options={{
            title: "History",
            tabBarIcon: ({ color }) => (
              <AntDesign name="filetext1" size={24} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="TabFour"
          component={TabFourScreen}
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </Provider>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
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
