import { AsyncStorage } from "react-native";
import { getAllDecks } from "../actions/decks";

const STORAGE_KEY = "UdaciCards:decks";

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY, (error, result) => {
    if (error) {
      return error;
    } else {
      return JSON.stringify(result);
    }
  });
}

export function getDeck(id) {}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: []
      }
    })
    //console.log("Add title to a new Deck");
  );
}

export function addCardToDeck(title, card) {}
