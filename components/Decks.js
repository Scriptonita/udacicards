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
import { navigationActions } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/** @function
* @name Decks
* @description - Functionality to show a decks list
* @param {keys} keys - Titles from decks list
* @prop {object} decks - decks object from store
* @prop {function} getDecks - dispatch getAllDecks action
* @method componentDidMount - Call to getAllDecks to read data from local storage to store
* @method componentWillReceiveProps - Get changes in decks
* @method _renderItem - Render each deck from list
* @method _keyExtractor - Get key for each item
*/

class Decks extends Component {
  state = {
    keys: []
  };

  componentDidMount() {
    this.props.getDecks();
  }

  componentWillReceiveProps(nextProps) {
    const { decks } = nextProps;
    let keys = Object.keys(decks);
    this.setState({
      keys: keys
    });
  }

  _renderItem = ({ item }) => {
    const { decks } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <View style={{ alignSelf: "stretch" }}>
        <TouchableOpacity
          style={[
            Platform.OS === "ios" ? styles.iosListItem : styles.AndroidListItem,
            { flexDirection: "row" }
          ]}
          onPress={() => navigate("Deck", { item })}
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={25}
              style={{ color: white }}
            />
            <Text style={styles.listItemTitle}>{decks[item].title}</Text>
          </View>
          <Text style={styles.listItemQuestions}>
            {decks[item].questions.length}{" "}
            <MaterialCommunityIcons name="cards-outline" size={22} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  //<View style={styles.listItem} key={this.keyExtractor}>
  _keyExtractor = item => item;

  render() {
    const { keys } = this.state;
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        {keys.length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              source={require("../images/no-decks.png")}
              style={styles.image}
            />
            <Text style={styles.noDecks}>No decks available</Text>
          </View>
        )}
        {keys.length > 0 && (
          <View style={{ alignSelf: "stretch" }}>
            <FlatList
              data={keys}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
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
    justifyContent: "space-between",
    alignItems: "center"
  },
  AndroidListItem: {
    backgroundColor: green,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    justifyContent: "space-between",
    alignItems: "stretch",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  },
  listItemTitle: {
    color: white,
    fontSize: 22,
    marginLeft: 10
  },
  listItemQuestions: {
    color: white,
    fontSize: 22,
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
