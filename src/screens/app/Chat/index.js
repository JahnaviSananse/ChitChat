import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import ImagePicker from "react-native-image-crop-picker";
import { connect } from "react-redux";
import socketIOClient, { io } from "socket.io-client";
import * as IMAGES from "../../../assets/images";
import * as COMPONENT from "../../../components";
import Image from "../../../components/Image";
import { theme } from "../../../constants/colors";
import * as CONSTANT from "../../../constants/constant";
import { clearSaveDocument, saveDocument } from "../../../redux/actions/user";
import Bubble from "./Bubble";
import styles from "./styles";

const Chat = (props) => {
  const navigation = useNavigation();
  const { token, uploadedData, clearSaveDocument } = props;

  const params = useRoute().params;
  const [msgAry, setMsgAry] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const [msgObj, setMsgObj] = React.useState({});
  const [userID, setUserId] = React.useState("");
  const [optionVisible, setOptionVisible] = React.useState(false);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [uploadData, setUploadData] = React.useState({});
  const [imageUrl, setImageUrl] = React.useState("");
  const [isImageVisible, setIsImageVisible] = React.useState(false);

  let url = "http://3.12.86.114:6789/chat";
  let socket;

  useEffect(() => {
    if (params) {
      console.log("Param", params);
      setName(params.item.name);
      setImageUrl(params.item.profile_image);
    }
  }, [params]);

  useEffect(() => {
    if (msgObj) {
      let tmp = [msgObj, ...msgAry];
      setMsgAry(tmp);
    }
  }, [msgObj]);

  useEffect(() => {
    if (Object.keys(uploadedData).length > 0) {
      sendMessage(uploadedData?.image);
      clearSaveDocument();
    }
  }, [uploadedData]);

  useEffect(() => {
    if (props.chat) {
      // console.log("chat", props.chat);
      setMsgAry(props.chat.result);
      //+ props.chat.chat_details?.id
      socket = socketIOClient(url, {
        query: {
          chat_id: props.chat.chat_details?.id,
        },
      });
      socket.on("send_chat", (data) => {
        console.log("BIGII", props.chat.chat_details?.id, data, msgAry);
        if (data) {
          setMsgObj(data);
        }
      });
    }
  }, [props.chat]);

  function sendMessage(msg) {
    let user = props.userData;
    // console.log("Isrt", user.id, msg);
    socket = io("http://3.12.86.114:6789/chat", {
      query: {
        chat_id: props.chat.chat_details?.id,
      },
    });
    socket.emit("send_chat", { login_user_id: user.id, message: msg });
  }

  const chooseDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      let fObj = {
        name: res.name,
        uri: res.uri,
        type: "application/pdf",
      };
      setUploadData(fObj);
      setOptionVisible(false);
      setLoading(true);
      if (res !== {}) {
        props.saveDocument(res, "chat", token);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const chooseImage = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      multiple: false,
    }).then((images) => {
      setUploadData(images);
      setLoading(true);
      if (images !== {}) {
        props.saveDocument(images, "chat", token);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      setOptionVisible(false);
    });
  };
  const renderChatFooter = () => {
    let ATTACHMENT = optionVisible
      ? IMAGES.IC_ATTACHMENT_ACTIVE
      : IMAGES.IC_ATTACHMENT_INACTIVE;
    return (
      <View>
        {optionVisible && (
          <View style={styles.optionBox}>
            <TouchableOpacity
              onPress={() => chooseImage()}
              style={styles.buttonCotainer}
            >
              <Image
                source={IMAGES.IC_ADD_IMAGE}
                style={styles.optionIcons}
                resizeMode={"contain"}
              />
              <Text style={styles.optionText}>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chooseDoc()}
              style={styles.buttonCotainer}
            >
              <Image
                source={IMAGES.IC_ADD_DOC}
                style={styles.optionIcons}
                resizeMode={"contain"}
              />
              <Text style={styles.optionText}>Document</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.bottomContainer}>
          <View style={styles.textFieldContainer}>
            <TextInput
              style={[
                styles.textFieldStyle,
                { fontStyle: msg.length === 0 ? "italic" : "normal" },
              ]}
              value={msg}
              placeholder={"Type Here"}
              onChangeText={(text) => setMsg(text)}
              keyboardType={"default"}
            />
            <TouchableOpacity
              style={styles.attachmentContainer}
              onPress={() => setOptionVisible(!optionVisible)}
            >
              <Image
                source={ATTACHMENT}
                style={styles.iconAttachment}
                resizeMode={"contain"}
                tintColor={theme.colors.blue}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.sendContainer,
              {
                backgroundColor: theme.colors.blue,
              },
            ]}
            onPress={() => {
              if (msg.trim() !== "") {
                // newOnSend(msg.trim());
                sendMessage(msg);
              }
              setMsg("");
            }}
          >
            <Image
              source={IMAGES.IC_SEND}
              resizeMode={"contain"}
              style={styles.iconSend}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title={name}
        leftImg={IMAGES.IC_BACK}
        rightImg={imageUrl}
        leftClick={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "android" ? -500 : CONSTANT.IS_IPHONEX ? 40 : 20
        }
        style={styles.keyboardAware}
      >
        <View style={styles.mainContainer}>
          {
            <FlatList
              data={msgAry}
              inverted
              style={styles.flatStyle}
              extraData={msgAry}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.chat_reply_id}
              renderItem={({ item, index }) => {
                // console.log('I', item)
                let isDisplay = false;
                if (index === msgAry.length - 1) {
                  isDisplay = true;
                } else {
                  if (msgAry[index + 1]) {
                    let nextData = msgAry[index + 1];
                    let currentDate = moment(item.createdAt).format(
                      "DD/MM/YYYY"
                    );
                    let oldDate = moment(nextData.createdAt).format(
                      "DD/MM/YYYY"
                    );
                    isDisplay = currentDate !== oldDate;
                  }
                }
                return (
                  <Bubble
                    item={item}
                    index={index}
                    // msgArry={msgAry}
                    userID={props.userData.id}
                    showDate={isDisplay}
                    onSelectImage={(val) => {
                      setImageUrl(val);
                      setIsImageVisible(true);
                    }}
                  />
                );
              }}
            />
          }
          <View style={styles.footerContainer}>{renderChatFooter()}</View>
        </View>
      </KeyboardAvoidingView>
      <COMPONENT.ImagePreview
        url={imageUrl}
        onClose={() => setIsImageVisible(false)}
        isModalVisible={isImageVisible}
      />
      <COMPONENT.Loader isLoading={loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  chat: state.user.chat,
  token: state.auth.access_token,
  uploadedData: state.user.uploadedData,
});

export default connect(mapStateToProps, { saveDocument, clearSaveDocument })(
  Chat
);
