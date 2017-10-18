import { combineReducers } from "redux";
import { decks } from "../reducers/decks";
import { deck } from "../reducers/deck";

export default combineReducers({ decks, deck });
