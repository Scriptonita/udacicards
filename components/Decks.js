import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { white, black } from "../utils/colors";
import { AppLoading } from "expo";

class Decks extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Decks</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Decks;
