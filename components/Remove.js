import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  View
} from "react-native";
import { white, green } from "../utils/colors";
import { removeAllDecks } from "../actions/decks";
class Remove extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Remove all Decks</Text>
        <TouchableOpacity
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.AndroidSubmitBtn
          }
          onPress={this.removeDecks}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 35,
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
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  }
});

function mapDispatchToProps(dispatch) {
  return {
    removeAllDecks: () => dispatch(removeAllDecks())
  };
}

export default connect(null, mapDispatchToProps)(Remove);
