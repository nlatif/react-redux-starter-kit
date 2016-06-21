/* @flow */
import React from 'react'
import classes from './Gametask.scss'
import SquareImage from '../assets/Square.png'
import TreeImage from '../assets/tree.png'
import StonesImage from '../assets/stone.png'
import GiftImage from '../assets/gift.png'

import type { GametaskObject } from '../interfaces/gametask'

type Props = {
  gametask: ?GametaskObject,
  startGame: Function,
  handleKeyDown: Function,
}

export const Gametask = (props: Props) => (
  <div className={classes.GametaskBody} onKeyDown={props.handleKeyDown}>
    <div>
      <h2 className={classes.gametaskHeader}>
        {props.gametask ? props.gametask.value : ''}
      </h2>
      <button className='btn btn-default' onClick={props.startGame}>
        Start Playing
      </button>
      {' '}
      {' '}
      <img
      alt='This is a square, because Redux!'
      className={classes.square}
      id='squareBox'
      src={SquareImage}
      style={{left: props.gametask ? props.gametask.left : '' +'px', top: props.gametask ? props.gametask.top : '' +'px', position:'relative'}}
       />
       {' '}
      <img
      alt='This is a stone, because Redux!'
      className={classes.stone}
      id='stoneId'
      src={StonesImage}
       />
       {' '}
      <img
      alt='This is a Tree, because Redux!'
      className={classes.tree}
      id='treeId'
      src={TreeImage}
       />
       {' '}
      <img
      alt='This is a gift, because Redux!'
      className={classes.gift}
      id='giftId'
      src={GiftImage}
       />
    </div>
  </div>
)

Gametask.propTypes = {
  gametask: React.PropTypes.object,
  startGame: React.PropTypes.func.isRequired,
  handleKeyDown: React.PropTypes.func.isRequired
}

export default Gametask
