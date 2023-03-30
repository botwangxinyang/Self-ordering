import { StyleSheet, Image } from "react-native";
import { Text, View } from "../components/Themed";
import { useState, useEffect } from "react";
import * as React from "react";
import { RootTabScreenProps } from "../types";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  FAB,
  Portal,
  Provider,
  List,
} from "react-native-paper";
import { baseUrl } from "../constants/util";

export default function OrderDetail({
  navigation,
  route,
}: RootTabScreenProps<"OrderDetail">) {
  const { id } = route.params;
  const [detail, setDetail] = useState({
    orderDetails: []
  });
  console.log("id = ", id);

  useEffect(() => {
    fetch(`${baseUrl}/order/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log("Order Details = ", res);
        setDetail(res.data);
        // setListData(res.data);
      });
  }, []);
  const [listData, setListData] = useState([
    {
      name: "Pizza1",
      price: 20,
      id: 1,
      num: 0,
      filter: true,
    },
    {
      name: "Pizza2",
      price: 120,
      id: 2,
      num: 0,
      filter: true,
    },
    {
      name: "Pizza3",
      price: 220,
      id: 3,
      num: 0,
      filter: true,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.itemLabel}>Table No:</Text>
        <Text
          style={{
            fontSize: 18,
          }}
        >
          {detail.tableNo}
        </Text>
      </View>

      <View>
        {detail.orderDetails.map((v, i) => {
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
                    uri: baseUrl + v.good.cover
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
                    {v.good.name}
                  </Text>
                </Paragraph>

                <Paragraph style={styles.price}>${v.good.price}</Paragraph>
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
        <Text style={styles.itemLabel}>Remark:</Text>
        <Text
          style={{
            color: "#666",
          }}
        >
          {detail.remark}
        </Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemLabel}>Payment Method:</Text>
        <Text>{detail.payMethod}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#888",
          }}
        >
          Total: ${detail.totalPrice}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    //justifyContent: 'center',
  },
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
  word1: {},
  price: {
    color: "red",
  },
});
