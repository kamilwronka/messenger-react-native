import { EventEmitter } from "fbemitter";

export const EMITTER_EVENTS = {
  WELCOME_SCREEN_GO_TO_NEXT_STEP: "WELCOME_SCREEN_GO_TO_NEXT_STEP",
  SHOW_ACTION_SHEET: "SHOW_ACTION_SHEET"
};

export const emitter = new EventEmitter();
