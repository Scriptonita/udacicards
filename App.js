import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import { Constants } from "expo";
import { lightBlue, white, blue, black } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Decks from "./components/Decks.js";
import AddDeck from "./components/AddDeck.js";
import Deck from "./components/Deck.js";
import AddCard from "./components/AddCard.js";
import Options from "./components/Options.js";
import Quiz from "./components/Quiz.js";
import { setLocalNotification, clearNotification } from "./utils/notifications";
import { Notifications, Permissions } from "expo";
import { Tabs, MainNavigator } from "./utils/navigation.js";

const store = configureStore();

/** @function
* @name StatusBarSpace
* @description - Change StatusBarSpace color
*/

function StatusBarSpace({ backgroundColor }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} />
    </View>
  );
}

/** @function
* @name getiOSNotificationPermission
* @description - Permissions to show notifications for IOS
*/

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

/** @class
* @name App
* @description - Main function
* @method {function} componentDidMount - Manage notifications
* @method {function} listenForNotifications - Set notifications listener
*/

export default class App extends React.Component {
  componentDidMount() {
    clearNotification();
    if (Platform.OS === "ios") {
      getiOSNotificationPermission();
    }
    setLocalNotification();
    console.log("Notifications");
  }

  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === "received" && Platform.OS === "ios") {
        Alert.alert(notification.title, notification.body);
      }
    });
  };

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: lightBlue }}>
          <StatusBarSpace backgroundColor={lightBlue} />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
