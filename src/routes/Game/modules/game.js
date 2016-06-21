/* @flow */

import type { GameObject } from '../interfaces/game.js'

// ------------------------------------
// Constants
// ------------------------------------
export const MOVE_UP = 'MOVE_UP'
export const START_GAME = 'START_GAME'
//export const MOVE_DOWN = 'MOVE_DOWN'
//export const MOVE_LEFT = 'MOVE_LEFT'
//export const MOVE_RIGHT = 'MOVE_RIGHT'


// ------------------------------------
// Actions
// ------------------------------------


export function handleKeyDown (e): Action {
  return {
    type: 'MOVE_UP',
    payload: e,
  }
}

export const startGame = (): Function => {
  return {
    type: 'START_GAME'
  }
}

export const actions = {
  MOVE_UP,
  startGame,
  handleKeyDown
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const GAME_ACTION_HANDLERS = {
  [MOVE_UP]: (state: GameStateObject, action: {payload: GameObject}): GameStateObject => {
    return ({ ...state, games: state.games.concat(action.payload), current: action.payload.left})
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState: ZenStateObject = { games: [] }
// ------------------------------------
// Reducer
// ------------------------------------
export default function GameReducer (state: GameStateObject = initialState, action: Action): GameStateObject {
  switch(action.type){
  case START_GAME:
    return state;
  case MOVE_UP:
    debugger;
    //get current state or position add the 
    return state;
  default:
    return state;
  }
}

