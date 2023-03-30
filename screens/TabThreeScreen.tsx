import { StyleSheet, ScrollView, DeviceEventEmitter } from "react-native";
import { Text, View } from "../components/Themed";
import { useState, useEffect } from "react";
import * as React from "react";
import { RootTabScreenProps } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAB, Portal, Provider, List, Searchbar } from "react-native-paper";
import { baseUrl } from "../constants/util";
import { useSelector } from "react-redux";

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<"TabThree">) {
  const [state, setState] = React.useState({ open: false });
  const userinfo = useSelector((state: any) => {
    return state.userinfo;
  });
  const onStateChange = ({ open }: { open: any }) => setState({ open });

  const { open } = state;

  const [listData, setListData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(
    () => {
      if (userinfo && userinfo.id) {
        getTableData();
      }
      DeviceEventEmitter.addListener("pay", () => {
        getTableData();
      });
    },
    [searchQuery, userinfo]
  );

  const getTableData = () => {
    console.log("userinfo555 = ", userinfo);
    fetch(
      `${baseUrl}/order?all=all&tableNo=${searchQuery}&userId=${userinfo.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(async (res) => {
        // console.log("订单列表 = ", res);
        setListData(res.data);
      });
  };

  return (
    <View style={styles.container}>
      <Searchbar
        style={{
          width: "90%",
          marginVertical: 15,
        }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
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

      <ScrollView
        style={{
          width: "100%",
        }}
      >
        {listData.map((v: any, i) => {
          return (
            <List.Item
              key={v.id}
              title={`Table No: ${v.tableNo}`}
              description={
                <View
                  style={{
                    // flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      // flexWrap: 'wrap',
                      // width: '100%'
                    }}
                  >
                    {v.orderDetails
                      .slice(0, 2)
                      .map((item: any, index: number) => {
                        return (
                          <Text
                            key={item.key + "-" + index}
                            style={{
                              fontSize: 12,
                              backgroundColor: "#6200ee",
                              color: "#fff",
                              paddingHorizontal: 6,
                              paddingVertical: 3,
                              borderRadius: 5,
                              marginRight: 10,
                            }}
                          >
                            {item.good.name}
                          </Text>
                        );
                      })}
                    {v.orderDetails.length > 2 && <Text>...</Text>}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "red",
                        marginRight: 8,
                      }}
                    >
                      ${v.totalPrice}
                    </Text>
                    <Text
                      style={{
                        color: "#999",
                      }}
                    >
                      {v.created_at}
                    </Text>
                  </View>
                </View>
              }
              style={{
                borderBottomColor: "#ddd",
                borderBottomWidth: 1,
              }}
              onPress={() => {
                navigation.navigate("OrderDetail", {
                  id: v.id,
                });
              }}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
            />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center',
  },
  title: {
    //top: -60,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  card1: {
    top: 10,
    width: 400,
    height: 170,
  },
});
