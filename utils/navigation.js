import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";
import Decks from "../components/Decks.js";
import AddDeck from "../components/AddDeck.js";
import Deck from "../components/Deck.js";
import AddCard from "../components/AddCard.js";
import Options from "../components/Options.js";
import Quiz from "../components/Quiz.js";
import { Platform } from "react-native";
import { lightBlue, white, blue, black } from "./colors";
import { FontAwesome } from "@expo/vector-icons";

export const Tabs = TabNavigator(
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

export const MainNavigator = StackNavigator({
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
