import React from "react";
import {
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react/cjs/react.development";
import styles from "./styles";

const Verify = (props) => {
  const { visible, onPressSubmit } = props;
  const [code, setCode] = useState("");
  return (
    <Modal visible={visible} transparent>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.box}>
          <Text style={styles.titleV}>Verify Code</Text>
          <Text style={styles.title}>Verification Code</Text>
          <TextInput
            placeholder={"Verification Code"}
            value={code}
            onChangeText={(val) => setCode(val)}
            style={styles.inputField}
            numberOfLines={1}
            maxLength={4}
            keyboardType={"number-pad"}
          />
          <TouchableOpacity
            onPress={() => {
              onPressSubmit(code);
            }}
            style={[styles.loginButton, { alignSelf: "center" }]}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Verify;
