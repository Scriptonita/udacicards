import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image
} from "react-native";
import { navigationActions } from "react-navigation";
import { green, white, blue, gray } from "../utils/colors";
import FlipCard from "react-native-flip-card";

/** @class
* @name Deck
* @description - Show a deck for add new card or start the quiz
* @param {object} deck - Contain details of a deck
* @param {title} title - A dummy title for prevent errors
* @param {array} questions - Questions list
* @prop {object} decks - Contain all decks
* @method navigationActions - Set the title for the screen
* @method disableStartButton - Check if the start button must be disabled if not cards
*/

class Deck extends Component {
  state = {
    deck: {
      title: "Dummy data",
      questions: [
        {
          question: "Why this dummy data?",
          answer: "To prevent errors"
        }
      ]
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item
  });

  disableStartButton = deck => {
    if (deck.questions) {
      return deck.questions.length === 0 ? true : false;
    } else {
      return false;
    }
  };

  render() {
    const { item } = this.props.navigation.state.params;
    let deck = this.props.decks[item];
    let disableStart = false;
    if (deck) {
      disableStart = this.disableStartButton(deck);
    } else {
      deck = this.state;
    }
    const styleBtn = disableStart ? gray : green;
    const { navigate } = this.props.navigation;
    if (deck) {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <FlipCard
              style={styles.card}
              friction={6}
              perspective={1000}
              flipHorizontal={true}
              flipVertical={false}
              flip={false}
              clickable={false}
              onFlipEnd={isFlipEnd => {
                console.log("isFlipEnd", isFlipEnd);
              }}
            >
              {/* Face Side */}
              <View style={styles.content}>
                <View>
                  <Text style={styles.title}>{deck.title}</Text>
                </View>
                <View>
                  <Text style={styles.questions}>
                    {deck.questions ? deck.questions.length : 0} Cards
                  </Text>
                </View>
              </View>
              {/* Back Side */}
              <View style={styles.content}>
                <Text>The Back</Text>
              </View>
            </FlipCard>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={Platform.OS === "ios" ? styles.iosBtn : styles.AndroidBtn}
              onPress={() => navigate("AddCard", { item })}
            >
              <Text style={styles.submitBtnText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                Platform.OS === "ios"
                  ? {
                      backgroundColor: styleBtn,
                      padding: 10,
                      borderRadius: 7,
                      height: 45,
                      margin: 10
                    }
                  : {
                      backgroundColor: styleBtn,
                      padding: 10,
                      paddingLeft: 30,
                      paddingRight: 30,
                      height: 45,
                      borderRadius: 2,
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10
                    }
              }
              onPress={() => navigate("Quiz", { item })}
              disabled={disableStart}
            >
              <Text style={styles.submitBtnText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Error loading Deck</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10
  },
  card: {
    borderRadius: 10,
    borderWidth: 3,
    width: 300,
    backgroundColor: blue
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  title: {
    fontSize: 25,
    alignItems: "center",
    textAlign: "center"
  },
  questions: {
    fontSize: 20
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  iosBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 10
  },
  AndroidBtn: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  }
});

function mapStateToProps({ decks }) {
  return {
    decks: decks
  };
}

export default connect(mapStateToProps, null)(Deck);
//export default Deck;
