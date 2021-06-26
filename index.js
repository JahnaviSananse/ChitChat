import React from "react";
import { AppRegistry, YellowBox } from "react-native";
import { DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { name as appName } from "./app.json";
import { store } from "./src/redux/index";
import Root from "./src/screens/root/index";

let ChitChat = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};
let ThemeProvider = () => {
  return (
    <PaperProvider theme={DarkTheme}>
      <ChitChat />
    </PaperProvider>
  );
};
AppRegistry.registerComponent(appName, () => ThemeProvider);
YellowBox.ignoreWarnings([
  "Warning: Async Storage has been extracted from react-native core",
]);
