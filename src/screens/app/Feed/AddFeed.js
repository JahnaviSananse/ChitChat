import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { connect } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import * as IMAGE from "../../../assets/images";
import { Image, Loader } from "../../../components";
import { addFeed, saveDocument } from "../../../redux/actions/user";
import styles from "./styles";

const AddFeed = (props) => {
  const { visible, onClose, token } = props;
  const [img, setImg] = useState(
    "https://mrsldna.org/wp-content/uploads/2019/03/product-placeholder.gif"
  );
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    setImg(
      "https://mrsldna.org/wp-content/uploads/2019/03/product-placeholder.gif"
    );
    setImageData({});
  }, []);

  return (
    <Modal visible={visible}>
      <SafeAreaView>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={() => onClose()}>
            <Image
              source={IMAGE.IC_CLOSE}
              style={styles.closeIcon}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
          <View style={styles.childContainer}>
            <TouchableOpacity
              style={styles.chooseContainer}
              onPress={() => {
                ImagePicker.openPicker({
                  cropping: true,
                }).then((image) => {
                  setImageData(image);
                  setImg(image.path);
                });
              }}
            >
              <Text style={styles.chooseText}>Choose Image</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: img }}
              style={styles.centerContainer}
              resizeMode={"contain"}
            />
            <TouchableOpacity
              style={styles.chooseContainer}
              onPress={() => {
                console.log("ADD", imageData);
                if (imageData !== {}) {
                  props.saveDocument(imageData, "feed", token, true);
                  setTimeout(() => {
                    onClose();
                  }, 1000);
                }
              }}
            >
              <Text style={styles.chooseText}>Submit Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <Loader isLoading={props.loading} />
    </Modal>
  );
};

// export default AddFeed;
const mapStateToProps = (state) => ({
  loading: state.user.loading,
  token: state.auth.access_token,
  feeds: state.user.feeds,
});
export default connect(mapStateToProps, {
  addFeed,
  saveDocument,
})(AddFeed);
