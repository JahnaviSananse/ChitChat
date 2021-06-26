import { useNavigation } from "@react-navigation/native";
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
import * as VALIDATION from "../../../constants/validation";
import { doSignup, sendOTP, verifyOTP } from "../../../redux/actions/auth";
import { showAlert } from "../../../utility/util";
import styles from "./styles";
import Verify from "./Verify";

const SignUp = (props) => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visible, setVisible] = useState(false);

  const validate = () => {
    if (!VALIDATION.validate(name)) {
      showAlert("", "Please enter name");
    } else if (!VALIDATION.validate(email)) {
      showAlert("", "Please enter email");
    } else if (!VALIDATION.isValidEmail(email)) {
      showAlert("", "Please enter valid email");
    } else if (!VALIDATION.validate(password)) {
      showAlert("", "Please enter password");
    } else {
      // props.navigation.navigate('SignIn')
      props.sendOTP({ email: email });
      setVisible(true);
      //{ name,otp, mobile_number: phoneNumber, email, password }
      // props.doSignup({});
    }
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>
          Sign Up <Text style={styles.orText}>Or</Text>
        </Text>
        <View style={styles.childContainer}>
          <Text style={styles.title}>Name</Text>
          <TextInput
            style={styles.inputField}
            value={name}
            onChangeText={(val) => setName(val)}
            placeholder={"Name"}
          />
          <Text style={styles.title}>Phone Number</Text>
          <TextInput
            style={styles.inputField}
            value={phoneNumber}
            onChangeText={(val) => setPhoneNumber(val)}
            placeholder={"Phone Number"}
            keyboardType={"decimal-pad"}
          />
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
          {/* <View style={styles.privacyCheckContainer}>
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
              <Image
                source={isChecked ? IMAGE.IC_CHECKED : IMAGE.IC_UNCHECKED}
                style={styles.checkIcon}
                tintColor={isChecked ? theme.colors.blue : theme.colors.accent}
              />
            </TouchableOpacity>
            <Text style={styles.privacyText}>I Agree to Privacy & Terms</Text>
          </View> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                validate();
                // props.navigation.navigate("SignUp");
              }}
              style={styles.loginButton}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignIn")}
            >
              <Text style={styles.buttonTextBold}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Verify
        visible={visible}
        onPressSubmit={(val) => {
          props.verifyOTP({
            name,
            otp: val,
            mobile_number: phoneNumber,
            email,
            password,
          });
          setVisible(false);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

// export default SignUp
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { doSignup, sendOTP, verifyOTP })(
  SignUp
);
