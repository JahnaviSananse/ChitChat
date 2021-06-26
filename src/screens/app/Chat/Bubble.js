import moment from "moment";
import React from "react";
import { Linking, Platform, Text, TouchableOpacity, View } from "react-native";
import FileViewer from "react-native-file-viewer";
import RNFetchBlob from "rn-fetch-blob";
import * as IMAGES from "../../../assets/images";
import Image from "../../../components/Image";
import { theme } from "../../../constants/colors";
import * as CONSTANT from "../../../constants/constant";
import styles from "./styles";

const getTime = (date) => {
  const final = moment.unix(date).format("hh:mm A");
  return final;
};
const isUrl = (url) => {
  var strRegex = "^((https|Https|Http|http|ftp|rtsp|mms)?://)";
  var re = new RegExp(strRegex);
  return re.test(url);
};

const OpenFile = (url) => {
  FileViewer.open(url)
    .then(() => {
      // success
    })
    .catch((error) => {
      // error
    });
};

const Bubble = (props) => {
  const { item, showDate, userID, index = 0, msgArry } = props;
  const { config, fs } = RNFetchBlob;
  const [progress, setProgress] = React.useState(20);
  let textStyle = isUrl(item.name) ? styles.linkText : styles.normalText;
  let dateDisplay =
    moment().format(CONSTANT.TIME_FORMATE_MSG_TITLE) ===
    moment.utc(item.createdAt).format(CONSTANT.TIME_FORMATE_MSG_TITLE)
      ? "Today"
      : moment.utc(item.createdAt).format(CONSTANT.TIME_FORMATE_MSG_TITLE);

  // let user = item.uiser
  // console.log('ITEM', item.user_id === userID, item.user_id, userID)
  let isCurrentUser = item.user_id === userID ? true : false;
  let timerTitle = "";
  timerTitle = moment(item.createdAt).format(CONSTANT.TIME_FORMATE_MSG_TITLE);
  function downloadFile(url, filename) {
    let DownloadDir = fs.dirs.DocumentDir; // this is the pictures directory. You can check the available directories in the wiki.

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,
        description: "Downloading image.",
      },
      path: DownloadDir + "/" + filename,
    };
    config(options)
      .fetch("GET", url)
      .then((res) => {
        setTimeout(() => {
          if (Platform.OS === "ios") {
            RNFetchBlob.ios.previewDocument(res.data);
          }
        }, 500);
      });
  }

  return (
    <View style={styles.cellContainer}>
      {showDate ? (
        <View>
          <View style={styles.dateSaperator} />
          <Text style={styles.dateText}>{dateDisplay}</Text>
        </View>
      ) : null}
      {item.type === 1 ? (
        <TouchableOpacity
          onPress={() => {
            props.onSelectImage(item.url);
            // Linking.openURL(item.url);
            // OpenFile(item.url);
          }}
          style={
            isCurrentUser
              ? styles.imageRight
              : [styles.imageLeft, { backgroundColor: theme.colors.blueLight }]
          }
        >
          <View style={styles.flexView}>
            <Image
              source={IMAGES.IC_ADD_IMAGE}
              style={styles.cellImage}
              resizeMode={"contain"}
              tintColor={theme.colors.blue}
            />
            <Text
              numberOfLines={2}
              ellipsizeMode={"tail"}
              style={styles.cellText}
            >
              {item.text}
            </Text>
            {!isCurrentUser && (
              <TouchableOpacity
                onPress={() => downloadFile(item.url, item.text)}
                style={styles.imageContanier}
              >
                <Image
                  source={IMAGES.IC_ATTACHEMENT_DOWNLOAD}
                  style={styles.cellImage}
                  resizeMode={"contain"}
                  tintColor={theme.colors.blue}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ) : item.type === 2 ? (
        <TouchableOpacity
          onPress={() => {
            // props.onSelectImage(item.url);
            Linking.openURL(item.url);
            // OpenFile(item.url);
          }}
          style={
            isCurrentUser
              ? styles.imageRight
              : [styles.imageLeft, { backgroundColor: theme.colors.blueLight }]
          }
        >
          <View style={styles.flexView}>
            <Image
              source={IMAGES.IC_ATTACHEMENT_DOC}
              style={styles.cellImage}
              resizeMode={"contain"}
              tintColor={theme.colors.blue}
            />
            <Text
              numberOfLines={2}
              ellipsizeMode={"tail"}
              style={styles.cellText}
            >
              {item.text}
            </Text>
            {!isCurrentUser && (
              <TouchableOpacity
                onPress={() => downloadFile(item.url, item.text)}
                style={styles.imageContanier}
              >
                <Image
                  source={IMAGES.IC_ATTACHEMENT_DOWNLOAD}
                  style={styles.cellImage}
                  resizeMode={"contain"}
                  tintColor={theme.colors.blue}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={
            isCurrentUser
              ? styles.rightBubble
              : [styles.leftBubble, { backgroundColor: theme.colors.blueLight }]
          }
          disabled
          // onPress={() => Linking.openURL(item.text)}
        >
          <Text
            style={[
              textStyle,
              { color: isCurrentUser ? theme.colors.blue : theme.colors.white },
            ]}
          >
            {item.message}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={isCurrentUser ? styles.rightTime : styles.leftTime}>
        {getTime(item.insert_datetime)}
      </Text>
    </View>
  );
};
export default Bubble;
