import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Share from "react-native-share";
import { connect } from "react-redux";
import * as IMAGE from "../../../assets/images";
import { Image, Loader } from "../../../components";
import { theme } from "../../../constants/colors";
import { feedLikeUnlike, getFeed } from "../../../redux/actions/user";
import AddFeed from "./AddFeed";
import Header from "./Header";
import styles from "./styles";

const Feed = (props) => {
  const { token } = props;
  const [isList, setIsList] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getFeed({}, token);
  }, []);

  useEffect(() => {
    setData(props.feeds);
  }, [props.feeds]);

  const AddButton = () => {
    return (
      <TouchableOpacity style={styles.addContainer}>
        <Image
          source={IMAGE.IC_ADD}
          style={styles.addIcon}
          tintColor={theme.colors.blue}
        />
      </TouchableOpacity>
    );
  };

  let img =
    "https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg";

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.feedImage}
          resizeMode={"stretch"}
        />
        <View style={styles.userContainer}>
          <Image
            source={{ uri: item.profile_image }}
            style={styles.userIcon}
            // tintColor={theme.colors.white}
            resizeMode={"contain"}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={styles.userTitle}
          >
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Share.open({ url: item.image })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  err && console.log(err);
                });
            }}
          >
            <Image
              source={IMAGE.IC_SHARE}
              style={styles.shareIcon}
              tintColor={theme.colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let temp = JSON.parse(JSON.stringify(data));
              temp.map((fObj, iIndex) => {
                fObj.is_like = data[iIndex].is_like === "0" ? "1" : "0";
              });
              setData(temp);
              props.feedLikeUnlike({ feed_id: item.id }, token);
            }}
          >
            <Image
              source={item.is_like === "1" ? IMAGE.IC_LIKE : IMAGE.IC_UNLIKE}
              style={styles.shareIcon}
              tintColor={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <Header
        title={"Feed"}
        onPressView={() => setIsList(!isList)}
        isListView={isList}
        onPress={() => setIsVisible(true)}
      />
      <View style={styles.mainContainer}>
        <FlatList
          data={data}
          // data={[1,2,3,4]}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text>No Feed Available</Text>
            </View>
          )}
        />
      </View>
      <AddFeed
        visible={isVisible}
        onClose={() => {
          setIsVisible(false);
          props.getFeed({}, token);
        }}
      />
      <Loader isLoading={props.loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  token: state.auth.access_token,
  feeds: state.user.feeds,
});
export default connect(mapStateToProps, {
  getFeed,
  feedLikeUnlike,
})(Feed);
