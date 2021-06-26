import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Image from "../Image";
import * as IMAGE from "./../../assets/images";
import styles from "./styles";

const ContactList = ({ data, visible, onClose, onPress }) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState(data);

  const renderItem = ({ item, index }) => {
    // let phNo = item.phoneNumbers?.filter((e) => e.label === 'mobile')
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(item);
        }}
        style={styles.itemContainer}
      >
        <Image source={{ uri: item.profile_image }} style={styles.itemIcon} />
        <View style={styles.itemDetail}>
          <Text numberOfLines={1} style={styles.itemTitle}>
            {item.name}
          </Text>
          <Text>{item.email}</Text>
          <Text>{item.mobile_number}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType={"slide"}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.contactTitle}>Users</Text>
          <TouchableOpacity onPress={onClose}>
            <Image source={IMAGE.IC_CLOSE} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder={"Search Users"}
          value={searchText}
          onChangeText={(val) => {
            setSearchText(val);
            if (val !== "") {
              let arry = [];
              data.map((item) => {
                console.log("MAp", item.name, val);
                if (item.name.includes(val)) {
                  arry.push(item);
                }
              });
              console.log("FInal", arry);
              setSearchData(arry);
            } else {
              setSearchData(data);
            }
          }}
          style={styles.input}
        />
        <FlatList
          data={searchData}
          showsVerticalScrollIndicator={false}
          // style={styles.flatlistContainer}
          renderItem={renderItem}
          style={{ padding: 20 }}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ContactList;
