/* @flow */

import type { GametaskObject, GametaskStateObject } from '../interfaces/gametask.js'

// ------------------------------------
// Constants
// ------------------------------------
export const START_GAME = 'START_GAME'
export const RECIEVE_INFO = 'RECIEVE_INFO'
export const SET_MESSAGE = 'SET_MESSAGE'
export const KeyCodes = {
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
};

// ------------------------------------
// Actions
// ------------------------------------

let currId = 0
export function recieveGametask (value: string, direction: number, left: number, top: number): Action {
  let leftV=left
  let topV=top
  if(direction){
    switch (direction) {
      case KeyCodes.LEFT_ARROW: case KeyCodes.RIGHT_ARROW:
        leftV = (direction === KeyCodes.RIGHT_ARROW) ? left+10 : left-10
        break;
      case KeyCodes.DOWN_ARROW: case KeyCodes.UP_ARROW:
        topV = (direction === KeyCodes.DOWN_ARROW) ? top+10 : top-10
        break;
    }
  }
  return {
    type: RECIEVE_INFO,
    payload: {
      value,
      id: currId++,
      left: leftV,
      top: topV,
      offsetLeft: document.getElementById('squareBox').offsetLeft,
      offsetTop: document.getElementById('squareBox').offsetTop
    }
  }
}

export const handleKeyDown = event => {
  let treeObject = document.getElementById('treeId')
  let stoneObject = document.getElementById('stoneId')
  let GiftObject = document.getElementById('giftId')
  return (dispatch, getState) => {
    const left = getState().gametask.left
    const top = getState().gametask.top
    const offsetLeft = getState().gametask.offsetLeft
    const offsetTop = getState().gametask.offsetTop
    if(offsetLeft < treeObject.offsetLeft+100 && offsetLeft > treeObject.offsetLeft-70 &&
      offsetTop < treeObject.offsetTop+100 && offsetTop > treeObject.offsetTop-70) {
      dispatch(recieveGametask('TREE: Please dont move over me!',event.keyCode,left,top))
    }
    else if(offsetLeft < stoneObject.offsetLeft+100 && offsetLeft > stoneObject.offsetLeft-70
      && offsetTop < stoneObject.offsetTop+100 && offsetTop > stoneObject.offsetTop-70) {
      dispatch(recieveGametask('STONE: Please dont move over me!',event.keyCode,left,top))
    }
    else if(offsetLeft < GiftObject.offsetLeft+100 && offsetLeft > GiftObject.offsetLeft-70 &&
      offsetTop < GiftObject.offsetTop+100 && offsetTop > GiftObject.offsetTop-70) {
      dispatch(recieveGametask('GIFT: Please dont move over me!',event.keyCode,left,top))
    }
    else {
      dispatch(recieveGametask('Moving',event.keyCode,left,top))
    }
  }
}

export const startGame = (e): Function => {
  return (dispatch, getState) => {
    const left = getState().gametask.left
    const top = getState().gametask.top
    dispatch(recieveGametask('startPlaying',null,left,top))
  }
}

export const actions = {
  recieveGametask,
  startGame,
  handleKeyDown
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const GAME_ACTION_HANDLERS = {
  [START_GAME]: (state: GametaskStateObject): GametaskStateObject => {
    return ({ ...state, playing: true })
  },
  [RECIEVE_INFO]: (state: GametaskStateObject, action: {payload: GametaskObject}): GametaskStateObject => {
    state.gametasks=[]
    return ({ ...state, gametasks: state.gametasks.concat(action.payload), left: action.payload.left, 
      top: action.payload.top, current: action.payload.id, playing: true, offsetTop:action.payload.offsetTop,
      offsetLeft: action.payload.offsetLeft })
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState: GametaskStateObject = { playing: false, current: null, left:null, top:null, offsetLeft:null, offsetTop:null, gametasks: [] }
export default function gametaskReducer (state: GametaskStateObject = initialState, action: Action): GametaskStateObject {
  const handler = GAME_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

