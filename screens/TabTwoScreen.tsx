import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import * as React from "react";
import { useState, useEffect } from "react";
import { RootTabScreenProps } from "../types";
import { Text, View } from "../components/Themed";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Searchbar,
  FAB,
  IconButton,
  Snackbar,
} from "react-native-paper";
import { baseUrl } from "../constants/util";
import { useSelector, useDispatch } from "react-redux";

let timer = null;
export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const userinfo = useSelector((state) => {
    return state.userinfo;
  }); 
  

  const [listData, setListData] = useState([]);
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: { open: any }) => setState({ open });

  const { open } = state;

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);
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
    DeviceEventEmitter.addListener("pay", () => {
      
      getTableData();
    });
    getTableData();
  }, []);

  React.useEffect(
    () => {
      // console.log("searchQuery = ", searchQuery);
      let deepListData = [...listData];
      deepListData.forEach((item) => {
        if (item.name.indexOf(searchQuery) !== -1) {
          item.filter = true;
        } else {
          item.filter = false;
        }
      });
      setListData(deepListData);
    },
    [searchQuery]
  );

  const getTableData = () => {
    fetch(`${baseUrl}/goods?all=all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log("商品列表 = ", res);
        res.data.forEach((v) => {
          v.num = 0;
          v.filter = true;
        });
        setListData(res.data);
      }).catch((err) => {
        console.log("err = ", err)
      });
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={{
          width: "100%",
          marginVertical: 15,
        }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <ScrollView
        style={{
          width: "100%",
        }}
      >
        {listData.filter((v) => {
          return v.filter;
        }).length == 0 && (
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
          if (!v.filter) {
            return null;
          }
          return (
            <Card
              key={v.id}
              style={{
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  source={{
                    uri: baseUrl + v.cover,
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
                      {v.name}
                    </Text>
                  </Paragraph>

                  <Paragraph style={styles.price}>${v.price}</Paragraph>

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
                    // width: 100,
                    // height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    icon="cart-variant"
                    iconColor="orange"
                    size={25}
                    onPress={() => {
                      fetch(`${baseUrl}/car`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          userId: userinfo?.id,
                          goodsId: v.id,
                          num: v.num
                        }),
                      })
                        .then((res) => res.json())
                        .then(async (res) => {
                          console.log("购物车 = ", res);
                          if (res.code == -1) {
                            showToast(
                              "This item already exists in the shopping cart"
                            );
                            return;
                          }
                          showToast("Successfully added to shopping cart");
                        });
                    }}
                  />
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>
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
                onPress: () => {
                  let payArr = listData.filter((v) => {
                    return v.num;
                  });
                  navigation.navigate("Payment", { arr: payArr });
                },
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
      <Snackbar
        style={{
          zIndex: 1000,
        }}
        visible={!!errTip}
        onDismiss={() => {}}
      >
        {errTip}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
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
  imagestyle: {
    height: 70,
    width: 85,
    alignContent: "center",
    right: -20,
  },
  buttonstyle: {
    top: 4,
    left: 240,
  },
  amstyle: {
    top: 20,
  },
  card: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
  },
  word: {},
  word1: {},
  price: {
    color: "red",
  },
});
