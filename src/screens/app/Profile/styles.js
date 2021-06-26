import { StyleSheet } from "react-native";
import { theme } from "../../../constants/colors";
import { getSize } from "../../../constants/constant";

const styles = StyleSheet.create({
  safearea: { backgroundColor: theme.colors.white },
  container: {
    height: "100%",
    padding: 20,
    // alignItems: "center",
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: theme.colors.blue,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    color: theme.colors.textGray,
    fontWeight: "400",
    paddingHorizontal: 10,
    fontSize: getSize(16),
  },
  inputField: {
    // width: "95%",
    borderColor: "black",
    borderWidth: 0.2,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
    fontSize: getSize(16),
  },
  submit: {
    width: "50%",
    backgroundColor: theme.colors.blue,
    alignSelf: "center",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: getSize(16),
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
export default styles;
