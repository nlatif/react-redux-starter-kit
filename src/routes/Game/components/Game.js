/* @flow */
import React from 'react'
import classes from './Game.scss'
import SquareImage from '../assets/Square.png'

import type { GameObject } from '../interfaces/Game'

type Props = {
  game: ?GameObject,
  startGame: Function,
  handleKeyDown: Function,
}

export const Game = (props: Props) => (
  <div className={classes.GameBody} onKeyDown={props.handleKeyDown}>
    <div>
      <button className='btn btn-default' onClick={props.startGame}>
        Save
      </button>
      {' '}
      <img
      alt='This is a square, because Redux!'
      className={classes.trail}
      src={SquareImage}
       />
    </div>
  </div>
)

Game.propTypes = {
  game: React.PropTypes.object,
  startGame: React.PropTypes.func.isRequired,
  handleKeyDown: React.PropTypes.func.isRequired
}

export default Game
