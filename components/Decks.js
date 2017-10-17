import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image
} from "react-native";
import { white, black, blue, green, redGray } from "../utils/colors";
import { getAllDecks } from "../actions/decks";
import { sort } from "../utils/Sort";

class Decks extends Component {
  state = {
    isReady: false,
    errorLoading: false
  };

  componentDidMount() {
    this.props.getDecks();
    /*
      .then(() => dispatch(this.setState({ loading: false })))
      .catch(error => console.log("Error reading decks datas!!"));
      */
  }
  _onPressButton() {
    console.log("Presionado");
  }

  _renderItem = ({ item }) => {
    const { decks } = this.props;
    return (
      <TouchableOpacity
        style={
          Platform.OS === "ios" ? styles.iosListItem : styles.AndroidListItem
        }
        onPress={this._onPressButton}
      >
        <Text style={styles.listItemTitle}>{decks[item].title}</Text>
        <Text style={styles.listItemQuestions}>
          Questions: {decks[item].questions.length}
        </Text>
      </TouchableOpacity>
    );
  };

  //<View style={styles.listItem} key={this.keyExtractor}>
  _keyExtractor = item => item;

  render() {
    const { errorLoading } = this.state;
    const { decks } = this.props;
    let keys = Object.keys(decks);
    return (
      <View style={styles.container}>
        {keys.length === 0 && (
          <View>
            <Image
              source={require("../images/no-decks.png")}
              style={styles.image}
            />
            <Text style={styles.noDecks}>No decks available</Text>
          </View>
        )}
        {keys.length > 0 && (
          <View style={{ flex: 2 }}>
            <FlatList
              data={keys}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              numColumns={1}
              horizontal={false}
            />
          </View>
        )}
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
  noDecks: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25
  },
  image: {
    width: 200,
    height: 250,
    resizeMode: "center"
  },
  iosListItem: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  AndroidListItem: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "stretch",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  },
  listItemTitle: {
    color: white,
    textAlign: "center",
    fontSize: 22
  },
  listItemQuestions: {
    color: white,
    fontSize: 18,
    textAlign: "right"
  }
});

function mapStateToProps({ decks }) {
  return {
    decks: decks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDecks: () => dispatch(getAllDecks())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
