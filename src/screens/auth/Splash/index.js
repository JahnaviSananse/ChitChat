import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  AsyncStorage,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";
import * as IMAGE from "../../../assets/images";
import Image from "../../../components/Image";
import { theme } from "../../../constants/colors";
import { setDummyLogin, setToken } from "../../../redux/actions/auth";
import * as CONSTANT from "./../../../constants/constant";
import styles from "./styles";

const Splash = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate('SignIn')
    // }, 2000)
    AsyncStorage.getItem(CONSTANT.ACCESS_TOKEN).then((res) => {
      if (res && res !== null && res !== "") {
        props.setToken(res);
        AsyncStorage.getItem(CONSTANT.USER_DATA).then((response) => {
          if (response && response !== null && response !== {}) {
            console.log("IN");
            props.setDummyLogin(true, JSON.parse(response));
          } else {
            console.log("OUT");
            navigation.navigate("SignIn");
          }
        });
      } else {
        navigation.navigate("SignIn");
      }
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.logoContainer}>
        <Image
          source={IMAGE.APP_LOGO}
          style={styles.logo}
          tintColor={theme.colors.blue}
          resizeMode={"contain"}
        />
        <Text style={styles.appTitle}>Chit-Chat</Text>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});
export default connect(mapStateToProps, {
  setDummyLogin,
  setToken,
})(Splash);
