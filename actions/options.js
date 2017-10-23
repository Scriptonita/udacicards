export const IMPORT_DEMO_DECKS = "IMPORT_DEMO_DECKS";
export const IMPORT_DEMO_DECKS_ERROR = "IMPORT_DEMO_DECKS_ERROR";

export function importDecksDemo() {
  return dispatch =>
    dispatch({
      type: IMPORT_DEMO_DECKS,
      last: "Demo Data imported"
    });
}
