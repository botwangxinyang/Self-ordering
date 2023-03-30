import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
} from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import { RootTabScreenProps } from "../types";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Checkbox,
  IconButton,
} from "react-native-paper";
import { Text, View } from "../components/Themed";
import { baseUrl } from "../constants/util";

export default function ShoppingCartScreen({
  navigation,
}: RootTabScreenProps<"Cart">) {
  const [listData, setListData] = useState([]);
  let total = 0;
  listData.forEach((v) => {
    if (v.checked) {
      total += v.good?.price * v.num;
    }
  });

  useEffect(() => {
    getTableData();
    DeviceEventEmitter.addListener("pay", () => {
      getTableData();
    });
  }, []);

  const getTableData = () => {
    fetch(`${baseUrl}/car?all=all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log("购物车列表 = ", res);
        res.data.forEach((v) => {
          v.checked = true;
        });
        setListData(res.data);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 20,
        }}
      />
      <ScrollView
        style={{
          width: "100%",
          flex: 1
        }}
      >
        {listData.length == 0 && (
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
        {listData.map((v, i) => {
          return (
            <Card
              key={v.id}
              style={{
                marginBottom: 20,
                // borderBottomColor: 'red',
                // borderBottomWidth: 1
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    // height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Checkbox
                    status={v.checked ? "checked" : "unchecked"}
                    onPress={() => {
                      let deepListData = [...listData];
                      deepListData[i].checked = !deepListData[i].checked;
                      setListData(deepListData);
                    }}
                  />
                </View>

                <Image
                  source={{
                    uri: baseUrl + v.good.cover,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 20,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Paragraph style={styles.word1}>
                    <Text
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {v.good.name}
                    </Text>
                  </Paragraph>

                  <Paragraph style={styles.price}>${v.good?.price}</Paragraph>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: 10,
                        backgroundColor: "rgb(103, 80, 164)",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        let deepListData = [...listData];
                        if (deepListData[i].num == 0) {
                          return;
                        }
                        deepListData[i].num = deepListData[i].num - 1;
                        setListData(deepListData);

                        fetch(`${baseUrl}/car/${v.id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            num: deepListData[i].num,
                          }),
                        })
                          .then((res) => res.json())
                          .then(async (res) => {});
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: "bold",
                          top: -1,
                          position: "relative",
                        }}
                      >
                        -
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginHorizontal: 10,
                      }}
                    >
                      {v.num}
                    </Text>
                    <TouchableOpacity
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: 10,
                        backgroundColor: "rgb(103, 80, 164)",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        let deepListData = [...listData];
                        deepListData[i].num = deepListData[i].num + 1;
                        setListData(deepListData);
                        fetch(`${baseUrl}/car/${v.id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            num: deepListData[i].num,
                          }),
                        })
                          .then((res) => res.json())
                          .then(async (res) => {});
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: "bold",
                          top: -1,
                          position: "relative",
                        }}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    // height: "100%",
                    justifyContent: "center",
                    paddingRight: 10,
                  }}
                >
                  <IconButton
                    icon="delete-outline"
                    iconColor="red"
                    size={25}
                    onPress={() => {
                      fetch(`${baseUrl}/car/${v.id}`, {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
   
                      })
                        .then((res) => res.json())
                        .then(async (res) => {
                          getTableData();
                        });
                    }}
                  />
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>
      <Card style={styles.card1}>
        <Button
          style={{}}
          mode="contained"
          onPress={() => {
            let payArr = listData.filter((v) => {
              return v.num && v.checked;
            });
            payArr = payArr.map((v) => {
              return {
                ...v.good,
                num: v.num,
              };
            })
            navigation.navigate("Payment", { arr: payArr, type: 'car' });
          }}
        >
          <Text
            style={{
              color: "#fff",
              // marginRight: 50,
            }}
          >
            Total: ${total}  
          </Text>
          <Text style={{
            color: 'rgba(0,0,0,0)'
          
          }}>
            45656
          </Text>
          <Text
            style={{
              color: "#fff",
            }}
          >
              Make a Payment
          </Text>
        </Button>
      </Card>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  card: {
    top: 10,
    width: 380,
    height: 200,
  },
  card1: {
    width: 380,
  },
  word1: {},
  price: {
    color: "red",
  },
});
