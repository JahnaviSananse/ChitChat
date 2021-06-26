import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
// import Contacts from "react-native-contacts";
import { connect } from "react-redux";
import * as IMAGE from "../../../assets/images";
import { ContactList, Image, ListCell } from "../../../components";
import { theme } from "../../../constants/colors";
import { getChat, getRecentChat, getUsers } from "../../../redux/actions/user";
import Header from "../Home/Header";
import styles from "./styles";

const Home = (props) => {
  const { token, users } = props;
  const navigation = useNavigation();
  const [isList, setIsList] = useState(true);
  const [isOpenContacts, setIsOpenContacts] = useState(false);
  const [contactsData, setContactsData] = useState([]);

  useEffect(() => {
    props.getRecentChat(token);
    props.getUsers(token);
    // Contacts.getAll().then((contacts) => {
    //   // contacts returned
    //   // console.log('Contacts', contacts)
    //   setContactsData(contacts);
    // });
  }, []);

  const AddButton = () => {
    return (
      <TouchableOpacity
        style={styles.addContainer}
        onPress={() => setIsOpenContacts(true)}
      >
        <Image
          source={IMAGE.IC_ADD}
          style={styles.addIcon}
          tintColor={theme.colors.blue}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <Header
        title={"Messages"}
        onPressView={() => setIsList(!isList)}
        isListView={isList}
        isDisplayRightIcon
      />
      <View style={styles.mainContainer}>
        {/* {isList ? <NewsListCell /> : <NewsGridCell />} */}
        <ListCell
          data={props.recentChat}
          onPress={(item) => {
            console.log("I", item);
            props.getChat({ user_id: item.user_id }, token);
            setTimeout(() => {
              navigation.navigate("Chat", { item: item });
            }, 300);
          }}
        />
      </View>
      <AddButton />
      <ContactList
        data={users}
        visible={isOpenContacts}
        onPress={(item) => {
          setIsOpenContacts(false);
          console.log("RTOke", token);
          props.getChat({ user_id: item.user_id }, token);
          setTimeout(() => {
            navigation.navigate("Chat", { item: item });
          }, 300);
        }}
        onClose={() => {
          setIsOpenContacts(false);
          // console.log("RTOke", token);
          // props.getChat({ user_id: item.user_id }, token);
          // setTimeout(() => {
          //   navigation.navigate("Chat", { item: item });
          // }, 300);
        }}
      />
    </SafeAreaView>
  );
};

// export default Home
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  token: state.auth.access_token,
  users: state.user.users,
  recentChat: state.user.recentChat,
});
export default connect(mapStateToProps, {
  getRecentChat,
  getUsers,
  getChat,
})(Home);
