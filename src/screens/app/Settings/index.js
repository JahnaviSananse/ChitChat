import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import * as IMAGE from "../../../assets/images";
import { Header, Image, Loader } from "../../../components";
import { logout_user } from "../../../redux/actions/auth";
import { navigate } from "../../../routes/router";
import styles from "./styles";

const Settings = (props) => {
  const { token, loading } = props;
  const [data, setData] = useState([
    {
      title: "Profile",
      icon: IMAGE.IC_USER_CIRCLE,
      redirect: "",
    },
    {
      title: "Logout",
      icon: IMAGE.IC_LOG_OUT,
      redirect: "login",
    },
  ]);

  let imgUrl =
    "https://i.picsum.photos/id/520/200/300.jpg?hmac=wYOWhYQGp5efB1HNroao-yTysVtEt5osptkdHJIsc0g";

  const ItemCell = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          if (item.redirect === "login") {
            props.logout_user(token);
          } else {
            navigate("Profile");
          }
        }}
      >
        <View style={styles.verticalDevider} />
        <Image source={item.icon} style={styles.itemLeftIcon} />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Image source={IMAGE.IC_ARROW_RIGHT} style={styles.itemRightIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <Header title={"Settings"} />
      <View style={styles.mainContainer}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          // style={styles.flatlistContainer}
          renderItem={ItemCell}
        />
      </View>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

// export default Settings;
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  token: state.auth.access_token,
});
export default connect(mapStateToProps, {
  logout_user,
})(Settings);
