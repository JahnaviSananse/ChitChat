import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { connect } from "react-redux";
import * as IMAGE from "../../../assets/images";
import { Header, Image, Loader } from "../../../components/index";
import * as VALIDATION from "../../../constants/validation";
import { editProfile } from "../../../redux/actions/auth";
import { clearSaveDocument, saveDocument } from "../../../redux/actions/user";
import { goBack } from "../../../routes/router";
import styles from "./styles";

const Profile = (props) => {
  const {
    loading,
    userData,
    saveDocument,
    clearSaveDocument,
    uploadedData,
    editProfile,
    token,
  } = props;

  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageData, setImageData] = useState({});
  const [profile, setProfile] = useState(
    "http://3.12.86.114/chit_chat/upload/user/default-user.png"
  );
  const [tempProfile, setTempProfile] = useState("");
  const [profileName, setProfileName] = useState("default-user.png");

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      setName(userData.name);
      setEmail(userData.email);
      setPhoneNumber(userData.mobile_number);
      setProfile(userData.profile_image);
      setTempProfile(userData.profile_image);
      setData(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (Object.keys(uploadedData).length > 0) {
      updateCall();
      clearSaveDocument();
    }
  }, [uploadedData]);

  const validate = () => {
    if (
      !VALIDATION.validate(name) ||
      !VALIDATION.validate(email) ||
      !VALIDATION.isValidEmail(email) ||
      !VALIDATION.validate(phoneNumber)
    ) {
      if (!VALIDATION.validate(name)) {
        alert("Please enter name");
      } else if (!VALIDATION.validate(email)) {
        alert("Please enter email");
      } else if (!VALIDATION.isValidEmail(email)) {
        alert("Please enter valid email");
      } else if (!VALIDATION.validate(phoneNumber)) {
        alert("Please enter phone-number");
      }
    } else {
      if (profile !== tempProfile) {
        saveDocument(imageData, "user", token);
      } else {
        updateCall();
      }
    }
  };

  const updateCall = () => {
    data.email = email;
    data.name = name;
    data.profile_image = profile;
    data.mobile_number = phoneNumber;

    editProfile(
      {
        name,
        email,
        profile_image: profileName,
        mobile_number: phoneNumber,
      },
      token,
      data
    );
  };

  return (
    <SafeAreaView>
      <Header
        title={"Profile"}
        leftImg={IMAGE.IC_BACK}
        leftClick={() => goBack()}
      />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            ImagePicker.openPicker({
              multiple: false,
            }).then((image) => {
              setProfile(image.sourceURL);
              setImageData(image);
            });
          }}
        >
          <Image source={{ uri: profile }} style={styles.profileImage} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Name</Text>
          <TextInput
            style={styles.inputField}
            value={name}
            maxLength={100}
            onChangeText={(val) => setName(val)}
            placeholder={"Name"}
          />
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.inputField}
            value={email}
            maxLength={50}
            onChangeText={(val) => setEmail(val)}
            keyboardType={"email-address"}
            placeholder={"Email"}
          />
          <Text style={styles.title}>Phone Number</Text>
          <TextInput
            style={styles.inputField}
            value={phoneNumber}
            onChangeText={(val) => setPhoneNumber(val)}
            placeholder={"Phone Number"}
            keyboardType={"number-pad"}
            maxLength={10}
          />
          <TouchableOpacity style={styles.submit} onPress={() => validate()}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  token: state.auth.access_token,
  userData: state.auth.userData,
  uploadedData: state.user.uploadedData,
  token: state.auth.access_token,
});
export default connect(mapStateToProps, {
  saveDocument,
  clearSaveDocument,
  editProfile,
})(Profile);
