import { StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { useState, useEffect } from "react";
import * as React from "react";
import { RootTabScreenProps } from "../types";
import * as ImagePicker from "expo-image-picker";
import { baseUrl } from "../constants/util";
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
  IconButton,
  Modal,
  TextInput,
  Snackbar,
} from "react-native-paper";

let timer: any = null;
export default function Admin({ navigation }: RootTabScreenProps<"Admin">) {
  const [errTip, setErrTip] = useState("");
  const [curOpt, setCurOpt] = useState("ADD");
  const [curItem, setCurItem] = useState(null);
  const showToast = (msg: string) => {
    setErrTip(msg);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setErrTip("");
    }, 1500);
  };

  const [visible, setVisible] = React.useState(false);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [listData, setListData] = useState([]);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log("result = ", result);
    let uri = "";
    if (result.uri) {
      uri = result.uri;
    }
    // if (result.assets) {
    //   uri = result.assets[0].uri;
    // }
    // console.log("uri = ", uri);
    // const response = await fetch(uri);
    // const blob = await response.blob();
    // console.log("blob = ", blob);
    // const fileOfBlob = new File([blob], `${new Date().getTime()}.png`);
    // console.log("fileOfBlob = ", fileOfBlob);
    const formData = new FormData();
    formData.append("file", {
      uri,
      type: "image/png",
      name: `${new Date().getTime()}.png`,
    });
    fetch(baseUrl + "/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data111 = ", data);
        setImage(data.data.imgUrl);
      })
      .catch((err) => {
        console.log("err = ", err);
      });
  };

  const getTableData = () => {
    fetch(`${baseUrl}/goods?all=all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (res) => {
        // console.log("列表 = ", res);
        setListData(res.data);
      });
  };

  const handleEdit = (item: any) => {
    let { cover, price, name } = item;
    setCurItem(item);
    setCurOpt("EDIT");
    setVisible(true);
    setImage(cover);
    setName(name); 
    // console.log("price = ", price)
    
    setPrice(`${price}`);
  };

  const handleDel = (item: any) => {
    fetch(`${baseUrl}/goods/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (res) => {
        getTableData();
        showToast("Delete succeeded");
      });
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <View style={styles.container}>
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
              {curOpt} Food
            </Text>
            <View style={styles.item}>
              <Text style={styles.itemLabel}>Food Name:</Text>
              <TextInput
                label="Food Name"
                mode="outlined"
                style={styles.itemVal}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.itemLabel}>Food Price:</Text>
              <TextInput
                label="Food Price"
                mode="outlined"
                style={styles.itemVal}
                value={price}
                onChangeText={(text) => setPrice(text)}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.itemLabel}>Food Cover:</Text>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderColor: "#6200ee",
                  borderRadius: 5,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={pickImage}
              >
                {!image && (
                  <IconButton icon="camera" iconColor="#6200ee" size={25} />
                )}
                {image && (
                  <Image
                    source={{ uri: baseUrl + image }}
                    style={{ width: 50, height: 50 }}
                  />
                )}
              </TouchableOpacity>
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
                onPress={() => {
                  if (!name) {
                    showToast("please enter food name");
                    return;
                  }
                  if (!price) {
                    showToast("please enter food price");
                    return;
                  }
                  if (!image) {
                    showToast("please enter food image");
                    return;
                  }
                  if (curOpt == "ADD") {
                    fetch(`${baseUrl}/goods`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        price,
                        name,
                        cover: image,
                      }),
                    })
                      .then((res) => res.json())
                      .then(async (res) => {
                        console.log("res = ", res);
                        if (res.code == -1) {
                          showToast("new error");
                          return;
                        }
                        getTableData();
                        setVisible(false);
                      });
                  } else {
                    fetch(`${baseUrl}/goods/${curItem.id}`, {
                      method: "put",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        price,
                        name,
                        cover: image,
                      }),
                    })
                      .then((res) => res.json())
                      .then(async (res) => {
                        console.log("res = ", res);
                        if (res.code == -1) {
                          showToast("new error");
                          return;
                        }
                        getTableData();
                        setVisible(false);
                      });
                  }
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

        <View
          style={{
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "center",
            borderBottomColor: "#ddd",
            borderBottomWidth: 1,
          }}
        >
          <Button
            icon="plus"
            style={{
              width: "60%",
            }}
            mode="contained"
            onPress={() => {
              setVisible(true);
              setName("");
              setPrice("");
              setImage(null);
              setCurOpt("ADD");
            }}
          >
            New
          </Button>
        </View>
        <ScrollView
          style={{
            width: "100%",
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
                      width: 60,
                      height: 60,
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
                        Food Name: {v.name}
                      </Text>
                    </Paragraph>

                    <Paragraph style={styles.price}>
                      Price: ${v.price}
                    </Paragraph>
                  </View>
                  <View
                    style={{
                      height: "100%",
                      justifyContent: "center",
                      paddingRight: 10,
                      flexDirection: "row",
                    }}
                  >
                    <IconButton
                      icon="square-edit-outline"
                      iconColor="#6200ee"
                      size={25}
                      onPress={() => {
                        handleEdit(v);
                      }}
                    />
                    <IconButton
                      icon="delete-outline"
                      iconColor="red"
                      size={25}
                      onPress={() => {
                        handleDel(v);
                      }}
                    />
                  </View>
                </View>
              </Card>
            );
          })}
        </ScrollView>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    //justifyContent: 'center',
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
  word1: {},
  price: {
    color: "red",
  },
});
