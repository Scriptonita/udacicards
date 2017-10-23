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
import { green, white, blue, gray, redGray } from "../utils/colors";
import FlipCard from "react-native-flip-card";

class Quiz extends Component {
  state = {
    id: null,
    score: 0,
    current: 0
  };

  scoreUp = () => {
    const { current, score } = this.state;
    this.setState({
      current: current + 1,
      score: score + 1
    });
  };

  continue = () => {
    const { current } = this.state;
    this.setState({
      current: current + 1
    });
  };

  render() {
    const { item } = this.props.navigation.state.params;
    const deck = this.props.decks[item];
    const disableStart = deck.questions.length === 0 ? true : false;
    const styleBtn = disableStart ? gray : green;
    const { navigate } = this.props.navigation;
    const { current, score } = this.state;
    const total = deck.questions.length;

    if (total === current) {
      return (
        <View style={styles.container}>
          <FlipCard
            style={styles.card}
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={false}
          >
            <View style={styles.contentFront}>
              <View style={styles.contentQuestionAnswer}>
                <Text style={styles.title}>{deck.title}</Text>
                <Text style={styles.title}>
                  Right Answers: {score + "/" + total}
                </Text>

                <Text style={styles.title}>
                  Score: {Math.round(score * 100 / total)}%
                </Text>
              </View>
            </View>
            <View>
              <Text>End</Text>
            </View>
          </FlipCard>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={Platform.OS === "ios" ? styles.iosBtn : styles.AndroidBtn}
              onPress={() => navigate("Decks")}
            >
              <Text style={styles.submitBtnText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
            clickable={true}
            /*
            onFlipEnd={isFlipEnd => {
              console.log("isFlipEnd", isFlipEnd);
            }}*/
          >
            {/* Face Side */}
            <View style={styles.contentFront}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end"
                }}
              >
                <Text>
                  question: {current + 1}/{total}
                </Text>
              </View>
              <View style={styles.contentQuestionAnswer}>
                <Text style={styles.title}>
                  {deck.questions[current].question}
                </Text>
              </View>
            </View>
            {/* Back Side */}
            <View style={styles.contentBack}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end"
                }}
              >
                <Text>answer</Text>
              </View>
              <View style={styles.contentQuestionAnswer}>
                <Text style={styles.title}>
                  {deck.questions[current].answer}
                </Text>
              </View>
            </View>
          </FlipCard>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={Platform.OS === "ios" ? styles.iosBtn : styles.AndroidBtn}
            onPress={this.scoreUp}
          >
            <Text style={styles.submitBtnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Platform.OS === "ios" ? styles.iosBtn : styles.AndroidBtn}
            onPress={this.continue}
            disabled={disableStart}
          >
            <Text style={styles.submitBtnText}>Incorrect</Text>
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
  contentFront: {
    flex: 1,
    backgroundColor: gray,
    padding: 5,
    borderRadius: 10
  },
  contentQuestionAnswer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  contentBack: {
    flex: 1,
    backgroundColor: redGray,
    padding: 5,
    borderRadius: 10
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
  },
  table: { width: 360 },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { textAlign: "center" }
});

function mapStateToProps({ decks }) {
  return {
    decks: decks
  };
}

export default connect(mapStateToProps, null)(Quiz);
