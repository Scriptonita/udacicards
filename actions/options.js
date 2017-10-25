import { IMPORT_DEMO_DECKS, IMPORT_DEMO_DECKS_ERROR } from "./types";

export function importDecksDemo() {
  return dispatch =>
    dispatch({
      type: IMPORT_DEMO_DECKS,
      last: "Demo Data imported"
    });
}
