import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  View,
  Switch
} from "react-native";
import { white, green, gray, black } from "../utils/colors";
import { removeAllDecks, importDecks } from "../actions/decks";
import { DecksDemo } from "../utils/data-demo.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class Options extends Component {
  state = {
    title: ""
  };

  removeDecks = () => {
    Alert.alert(
      "Remove all Decks",
      "Are you shure that you want to remove all Decks?",
      [
        { text: "OK", onPress: () => this.props.removeAllDecks() },
        {
          text: "Cancel",
          onPress: () => console.log("Remove cancelled"),
          style: "cancel"
        }
      ]
    );
  };

  importDataDemo = () => {
    Alert.alert(
      "Import Data",
      "Are you shure that you want to import Decks from data?",
      [
        { text: "OK", onPress: () => this.props.importDecks(DecksDemo) },
        {
          text: "Cancel",
          onPress: () => console.log("Import cancelled"),
          style: "cancel"
        }
      ]
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={{ alignSelf: "center" }}>
            <TouchableOpacity
              style={
                Platform.OS === "ios"
                  ? styles.iosSubmitBtn
                  : styles.AndroidSubmitBtn
              }
              onPress={this.removeDecks}
            >
              <MaterialCommunityIcons name="delete" size={30} color={black} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Remove all Decks</Text>
        </View>
        <View>
          <View style={{ alignSelf: "center" }}>
            <TouchableOpacity
              style={
                Platform.OS === "ios"
                  ? styles.iosSubmitBtn
                  : styles.AndroidSubmitBtn
              }
              onPress={this.importDataDemo}
            >
              <MaterialCommunityIcons name="import" size={30} color={black} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Import data example</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 5
  },
  iosSubmitBtn: {
    backgroundColor: green,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25
  },
  AndroidSubmitBtn: {
    backgroundColor: green,
    margin: 5,
    padding: 10,
    borderRadius: 2
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  }
});

function mapDispatchToProps(dispatch) {
  return {
    removeAllDecks: () => dispatch(removeAllDecks()),
    importDecks: data => dispatch(importDecks(data))
  };
}

export default connect(null, mapDispatchToProps)(Options);
