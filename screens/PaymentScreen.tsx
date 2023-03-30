import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  ScrollView,
  Image,
  DeviceEventEmitter,
} from "react-native";
import { useState, useEffect } from "react";
import { baseUrl } from "../constants/util";
import { Text, View } from "../components/Themed";
import { useSelector } from "react-redux";
import { Paragraph, Button, TextInput, RadioButton } from "react-native-paper";

export default function PaymentScreen({ route, navigation }) {
  if (!route.params) {
    route.params = {};
  }
  let { arr, type } = route.params;
  if (!type) {
    type = "car";
  }
  if (!arr) {
    arr = [];
  }
  const userinfo = useSelector((state) => {
    return state.userinfo;
  });
  const tableNo = useSelector((state) => {
    return state.tableNo;
  });

  useEffect(() => {
    if (!userinfo) {
      navigation.navigate("Login");
    }
    if (!tableNo) {
      alert("Please bind table");
    }
  }, []);
  const [remark, setRemark] = React.useState("");
  const [checked, setChecked] = React.useState("first");
  const [listData] = useState(arr);
  let total = 0;
  listData.forEach((element: any) => {
    total += element.num * element.price;
  });

  return (
    <View style={styles.container}>
      {arr.length == 0 && (
        <Text
          style={{
            color: "#888",
            fontSize: 18,
            paddingTop: 30,
            textAlign: "center",
          }}
        >
          No data
        </Text>
      )}
      {arr.length !== 0 && (
        <ScrollView
          style={{
            width: "100%",
          }}
        >
          <View style={styles.item}>
            <Text style={styles.itemLabel}>Table No:</Text>
            <Text
              style={{
                fontSize: 18,
              }}
            >
              {tableNo}
            </Text>
          </View>

          <View>
            {listData.map((v, i) => {
              return (
                <View
                  key={v.id}
                  style={{
                    // marginBottom: 20,
                    borderBottomColor: "#ddd",
                    borderBottomWidth: 1,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 20,
                      alignItems: "center",
                      paddingVertical: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: baseUrl + v.cover,
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        marginRight: 20,
                      }}
                    />

                    <Paragraph>
                      <Text
                        style={{
                          fontWeight: "bold",
                          marginRight: 30,
                        }}
                      >
                        {v.name}
                      </Text>
                    </Paragraph>

                    <Paragraph style={styles.price}>${v.price}</Paragraph>
                    <Text
                      style={{
                        color: "#888",
                        marginLeft: 30,
                      }}
                    >
                      x{v.num}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.item}>
            <Text style={styles.itemLabel}>Payment Method:</Text>
            <RadioButton
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
            />
            <Text>Credit Card</Text>
            <RadioButton
              value="second"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked("second")}
            />
            <Text>Paypal</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemLabel}>Remark:</Text>
            <TextInput
              label="Remark"
              value={remark}
              style={{
                flex: 1,
              }}
              onChangeText={(text) => setRemark(text)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              marginTop: 30,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Total: ${total}
            </Text>

            <Button
              mode="contained"
              onPress={() => {
                if (!tableNo) {
                  alert("Please bind table");
                  return;
                }
                let payMethod = checked == "first" ? "Credit Card" : "Paypal";
                fetch(`${baseUrl}/order`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    tableNo,
                    remark,
                    payMethod,
                    totalPrice: total,
                    userId: userinfo.id,
                    orderDetailList: listData,
                    type,
                  }),
                })
                  .then((res) => res.json())
                  .then(async (res) => {
                    console.log("res = ", res);
                    alert("Pay successfully");
                    navigation.goBack();
                    DeviceEventEmitter.emit("pay");
                  });
              }}
            >
              Pay
            </Button>
          </View>
        </ScrollView>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemLabel: {
    fontSize: 18,
    fontWeight: "bold",
    width: 100,
  },
  itemVal: {},
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
  addresstyle: {
    height: 100,
    width: 200,
  },
  cardstyle1: {
    bottom: 200,
  },
  cardstyle2: {
    top: 100,
  },
  logo: {
    height: 60,
    width: 60,
    alignContent: "center",
    //position: 'absolute',
  },
  card: {
    width: 400,
  },
  dialog1: {
    width: 360,
    height: 270,
    top: -10,
    right: 15,
  },
  dialog2: {
    width: 360,
    height: 170,
    top: -150,
    right: 15,
  },
  card1: {
    width: 400,
    height: 200,
  },
  word1: {},
  price: {
    color: "red",
  },
});
