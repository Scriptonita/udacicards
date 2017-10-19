import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { white, green } from "../utils/colors";
import { AppLoading } from "expo";
import { addCardToADeck } from "../actions/decks";

import { navigationActions } from "react-navigation";

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  saveCard = () => {
    const { question, answer } = this.state;
    const title = this.props.navigation.state.params.item;
    /*
    const card = {
      question: this.state.title,
      answer: this.state.answer
    }*/
    if (question === "" || answer === "") {
      Alert.alert(
        "Error in Card",
        "The question or answer submited is invalid",
        [{ text: "OK", onPress: () => console.log("OK pressed") }]
      );
    } else {
      this.setState({
        question: "",
        answer: ""
      });
      this.props.addCardToDeck(title, { question, answer });
      Keyboard.dismiss();
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>What is the Question?</Text>
        <TextInput
          style={Platform.OS === "ios" ? styles.inputIos : styles.inputAndroid}
          onChangeText={text => this.setState({ question: text })}
          value={this.state.question}
          placeholder="Write here the question"
          maxLength={180}
          multiline={true}
        />
        <Text style={styles.title}>What is the Answer</Text>

        <TextInput
          style={Platform.OS === "ios" ? styles.inputIos : styles.inputAndroid}
          onChangeText={text => this.setState({ answer: text })}
          value={this.state.answer}
          placeholder="Write here the answer"
          maxLength={180}
          multiline={true}
        />
        <TouchableOpacity
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.AndroidSubmitBtn
          }
          onPress={this.saveCard}
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
    justifyContent: "flex-start",
    marginTop: 10
  },
  title: {
    fontSize: 20,
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
    addCardToDeck: (title, { question, answer }) =>
      dispatch(addCardToADeck(title, { question, answer }))
  };
}

export default connect(null, mapDispatchToProps)(AddCard);
