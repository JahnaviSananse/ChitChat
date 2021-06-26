import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { Loader } from "../../../components";
import * as VALIDATION from "../../../constants/validation";
import {
  doLogin,
  sendOTP,
  setDummyLogin,
  verifyOTP,
} from "../../../redux/actions/auth";
import { showAlert } from "../../../utility/util";
import styles from "./styles";

const SignIn = (props) => {
  const { loading } = props;
  const [email, setEmail] = useState("jaymevada244@gmail.com");
  const [password, setPassword] = useState("Jay@123");

  const validate = () => {
    if (!VALIDATION.validate(email)) {
      showAlert("", "Please enter email");
    } else if (!VALIDATION.isValidEmail(email)) {
      showAlert("", "Please enter valid email");
    } else if (!VALIDATION.validate(password)) {
      showAlert("", "Please enter password");
    } else {
      //do login
      // props.setDummyLogin(true)
      props.doLogin(email, password);
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Sign In</Text>

        <View style={styles.childContainer}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={(val) => setEmail(val)}
            placeholder={"Email"}
          />
          <Text style={styles.title}>Password</Text>
          <TextInput
            style={styles.inputField}
            value={password}
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => validate()}
              style={styles.loginButton}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // props.sendOTP({ email: 'jaymevada244@gmail.com' })
                // props.verifyOTP({
                //   name: 'jay',
                //   otp: '2744',
                //   mobile_number: 9724375722,
                //   email: 'jaymevada244@gmail.com',
                //   password: 'Jay@123',
                // })
                props.navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.buttonTextBold}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});
export default connect(mapStateToProps, {
  setDummyLogin,
  doLogin,
  sendOTP,
  verifyOTP,
})(SignIn);
