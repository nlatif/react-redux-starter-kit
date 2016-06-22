/* @flow */

import type { GametaskObject, GametaskStateObject } from '../interfaces/gametask.js'

// ------------------------------------
// Constants
// ------------------------------------
export const START_GAME = 'START_GAME'
export const RECIEVE_INFO = 'RECIEVE_INFO'
export const KeyCodes = {
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
};
export const obstacles = {
  TREE: 1,
  STONES: 2,
  GIFT: 3,
};
export const RANGE = {
  TOP_RANGE: -220,
  BOTTOM_RANGE: 220,
  LEFT_RANGE: 550,
  RIGHT_RANGE: -550,
};

// ------------------------------------
// Actions
// ------------------------------------
let itemtoFind = ''
let currId = 0
export function recieveGametask (value: string, direction: number, left: number, top: number,scale: number): Action {
  let leftV=left
  let topV=top
  let scaleV=scale
  if(direction){
    switch (direction) {
      case KeyCodes.RIGHT_ARROW:
        scaleV = -1
      case KeyCodes.LEFT_ARROW: case KeyCodes.RIGHT_ARROW:
        if(leftV > RANGE.RIGHT_RANGE && leftV < RANGE.LEFT_RANGE)
          leftV = (direction === KeyCodes.RIGHT_ARROW) ? left+10 : left-10
        else if(leftV === RANGE.LEFT_RANGE && direction === KeyCodes.LEFT_ARROW )
          leftV = left-10
        else if(leftV === RANGE.RIGHT_RANGE && direction === KeyCodes.RIGHT_ARROW)
          leftV = left+10          
        else
          leftV = left
        break;
      case KeyCodes.DOWN_ARROW: case KeyCodes.UP_ARROW:
        if(topV > RANGE.TOP_RANGE && topV < RANGE.BOTTOM_RANGE)
          topV = (direction === KeyCodes.DOWN_ARROW) ? top+10 : top-10
        else if(topV === RANGE.BOTTOM_RANGE && direction === KeyCodes.UP_ARROW )
          topV = top-10
        else if(topV === RANGE.TOP_RANGE && direction === KeyCodes.DOWN_ARROW)
          topV = top+10          
        else
          topV = top
        
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
      scale: scaleV,
      offsetLeft: document.getElementById('submarineBox').offsetLeft,
      offsetTop: document.getElementById('submarineBox').offsetTop
    }
  }
}

/*
 * Function to flip the direction of the submarine
 */
export const checkDirection = (direct: number): Function => {
  let pointTo = '';
  switch (direct) {
    case KeyCodes.LEFT_ARROW: case KeyCodes.RIGHT_ARROW:
        document.getElementById('submarineBox').style.transform = (direct === KeyCodes.RIGHT_ARROW) ? 'scaleX(-1)' : 'scaleX(1)' 
        break;
  }
}

/*
 * Function to handle the navigation through the arrow keys and dispatch an action to change the 
 * state
 */
export const handleKeyDown = event => {
  checkDirection(event.keyCode);
  let treeObject = document.getElementById('treeId')
  let stoneObject = document.getElementById('stoneId')
  let GiftObject = document.getElementById('giftId')
  let offsetLeft= document.getElementById('submarineBox').offsetLeft
  let offsetTop= document.getElementById('submarineBox').offsetTop
  return (dispatch, getState) => {
    const left = getState().gametask.left
    const top = getState().gametask.top
    const offsetleft = getState().gametask.offsetLeft
    const offsettop = getState().gametask.offsetTop
    const scale = getState().gametask.scale
    if(offsetLeft < treeObject.offsetLeft+100 && offsetLeft > treeObject.offsetLeft-70 &&
      offsetTop < treeObject.offsetTop+100 && offsetTop > treeObject.offsetTop-70) {
      if(itemtoFind === 'TREE'){
        dispatch(recieveGametask('Yay! You found the TREE! Hit the button and find another object',event.keyCode,left,top,scale))
      }
      else{
        dispatch(recieveGametask('Sorry, this is a TREE!, TRY AGAIN',event.keyCode,left,top,scale))
      }
    }
    else if(offsetLeft < stoneObject.offsetLeft+100 && offsetLeft > stoneObject.offsetLeft-70
      && offsetTop < stoneObject.offsetTop+100 && offsetTop > stoneObject.offsetTop-70) {
      if(itemtoFind === 'STONES'){
        dispatch(recieveGametask('Yay! You found the STONES! Hit the button and find another object',event.keyCode,left,top,scale))
      }
      else{
        dispatch(recieveGametask('Sorry, this is a STONE!, TRY AGAIN',event.keyCode,left,top,scale)) 
      }
    }
    else if(offsetLeft < GiftObject.offsetLeft+50 && offsetLeft > GiftObject.offsetLeft-70 &&
      offsetTop < GiftObject.offsetTop+50 && offsetTop > GiftObject.offsetTop-70) {
      if(itemtoFind === 'GIFT'){
        dispatch(recieveGametask('Yay! You found the GIFT! Hit the button and find another object',event.keyCode,left,top,scale))
      }
      else{
        dispatch(recieveGametask('Sorry, this is GIFT!, TRY AGAIN',event.keyCode,left,top,scale))
      }
    }
    else {
      dispatch(recieveGametask('Moving',event.keyCode,left,top,scale))
    }
  }
}

/*
 * Dispatch action to trigger a new game
 */
export const startGame = (): Function => {
  return (dispatch, getState) => {
    const findElement = Math.floor(Math.random() * 3) + 1
    //const left = getState().gametask.left
    //const top = getState().gametask.top

    switch(findElement){
      case obstacles.TREE:
        itemtoFind = 'TREE'
        break;
      case obstacles.STONES:
        itemtoFind = 'STONES'
        break;
      case obstacles.GIFT:
        itemtoFind = 'GIFT'
        break;
    }
    dispatch(recieveGametask('Can you navigate to the '+itemtoFind,null,0,0,1))
  }
}

export const actions = {
  recieveGametask,
  startGame,
  checkDirection,
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
      offsetLeft: action.payload.offsetLeft, scale: action.payload.scale })
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState: GametaskStateObject = { playing: false, scale:1, current: null, left:null, top:null, offsetLeft:null, offsetTop:null, gametasks: [] }
export default function gametaskReducer (state: GametaskStateObject = initialState, action: Action): GametaskStateObject {
  const handler = GAME_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

