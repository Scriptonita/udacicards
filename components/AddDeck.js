import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { white, green } from "../utils/colors";
import { AppLoading } from "expo";
import { deckTitle } from "../actions/decks";

class AddDeck extends Component {
  state = {
    title: ""
  };

  saveTitle = () => {
    const { title } = this.state;
    if (title === "") {
      Alert.alert("Error in title", "The title submited is invalid", [
        { text: "OK", onPress: () => console.log("OK pressed") }
      ]);
    } else {
      this.props.saveDeckTitle(title.trim());
      this.setState({
        title: ""
      });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={Platform.OS === "ios" ? styles.inputIos : styles.inputAndroid}
          onChangeText={text => this.setState({ title: text })}
          value={this.state.title}
          placeholder="Title for a new deck"
          maxLength={40}
        />
        <TouchableOpacity
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.AndroidSubmitBtn
          }
          onPress={this.saveTitle}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  inputIos: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    alignSelf: "stretch"
  },
  inputAndroid: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: "stretch",
    padding: 3
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
    saveDeckTitle: title => dispatch(deckTitle(title))
  };
}

export default connect(null, mapDispatchToProps)(AddDeck);
