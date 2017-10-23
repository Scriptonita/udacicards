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
import { white, green, gray } from "../utils/colors";
import { removeAllDecks, importDecks } from "../actions/decks";
import { DecksDemo } from "../utils/data-demo.js";

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
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Notifications</Text>
          <Switch onTintColor={green} thumbTintColor={gray} />
        </View>
        <View>
          <TouchableOpacity
            style={
              Platform.OS === "ios"
                ? styles.iosSubmitBtn
                : styles.AndroidSubmitBtn
            }
            onPress={this.removeDecks}
          >
            <Text style={styles.submitBtnText}>Remove all Decks</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={
              Platform.OS === "ios"
                ? styles.iosSubmitBtn
                : styles.AndroidSubmitBtn
            }
            onPress={this.importDataDemo}
          >
            <Text style={styles.submitBtnText}>Import data example</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20
  },
  iosSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 10
  },
  AndroidSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
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
