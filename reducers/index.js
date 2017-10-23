import { combineReducers } from "redux";
import { decks } from "../reducers/decks";
import { options } from "../reducers/options";

export default combineReducers({ decks, options });
