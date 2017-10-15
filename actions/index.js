export const GET_DECKS = "GET_DECKS";
export const GET_DECK = "GET_DECK";
export const SAVE_DECK_TITLE = "SAVE_DECK_TITLE";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";

export function getDecks() {
  return {
    type: GET_DECKS
  };
}

export function getDeck() {
  return {
    type: GET_DECK
  };
}

export function saveDeckTitle() {
  return {
    type: SAVE_DECK_TITLE
  };
}

export function addCardToDeck() {
  return {
    type: ADD_CARD_TO_DECK
  };
}
