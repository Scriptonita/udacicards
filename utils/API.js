import { AsyncStorage } from "react-native";
import { getAllDecks } from "../actions/decks";

const STORAGE_KEY = "UdaciCards:decks";

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY, (error, result) => {
    if (error) {
      return error;
    } else {
      //return JSON.stringify(result);
      return result;
    }
  });
}

export function getDeck(id) {
  getDecks()
    .then(result => {
      const decks = JSON.parse(result);
      const deck = decks[id];
      return deck;
    })
    .catch(error => error);
}

export function saveDeckTitle(title) {
  // TODO: Comprobar que no se repite el titulo
  const item = {
    [title]: {
      title: title,
      questions: []
    }
  };
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify(item)
    //console.log("Add title to a new Deck");
  );
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(STORAGE_KEY, (error, result) => {
    if (result) {
      let decks = JSON.parse(result);
      decks[title].questions.push(card);
      AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks));
    } else {
      console.log("Error obteniendo items");
    }
  });
}

export function removeDecks() {
  return AsyncStorage.removeItem(STORAGE_KEY, result =>
    console.log("Storage removed")
  );
}
