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
import Remove from "./components/Remove.js";

const store = configureStore();

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
    Remove: {
      screen: Remove,
      navigationOptions: {
        tabBarLabel: "Remove",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="trash" size={30} color={tintColor} />
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
  Remove: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard
  }
});

export default class App extends React.Component {
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
