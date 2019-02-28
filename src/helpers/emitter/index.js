import { EventEmitter } from 'fbemitter';

export const EMITTER_EVENTS = {
  WELCOME_SCREEN_GO_TO_NEXT_STEP: 'WELCOME_SCREEN_GO_TO_NEXT_STEP',
};

export const emitter = new EventEmitter();
