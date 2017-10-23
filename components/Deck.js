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

class Deck extends Component {
  state = {
    id: null
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
    const deck = this.props.decks[item];
    let disableStart = false;
    if (deck) {
      disableStart = this.disableStartButton(deck);
    }
    const styleBtn = disableStart ? gray : green;
    const { navigate } = this.props.navigation;
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
