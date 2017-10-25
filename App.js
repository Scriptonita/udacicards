import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import { Constants } from "expo";
import { lightBlue, white, blue, black } from "./utils/colors";
import { TabNavigator, StackNavigator } from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Decks from "./components/Decks.js";
import AddDeck from "./components/AddDeck.js";
import Deck from "./components/Deck.js";
import AddCard from "./components/AddCard.js";
import Options from "./components/Options.js";
import Quiz from "./components/Quiz.js";
import { setLocalNotification, clearNotification } from "./utils/notifications";
import { Notifications, Permissions } from "expo";

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

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="list" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    },
    Options: {
      screen: Options,
      navigationOptions: {
        tabBarLabel: "Options",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="cog" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? black : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? lightBlue : blue,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  AddDeck: {
    screen: Tabs
  },
  Options: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
});

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
