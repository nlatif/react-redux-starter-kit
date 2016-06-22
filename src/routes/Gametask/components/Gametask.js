/* @flow */
import React from 'react'
import classes from './Gametask.scss'
import SubmarineImage from '../assets/submarine.png'
import TreeImage from '../assets/tree.png'
import StonesImage from '../assets/stone.png'
import GiftImage from '../assets/gift.png'
import WhaleImage from '../assets/whale.png'

import type { GametaskObject } from '../interfaces/gametask'

type Props = {
  gametask: ?GametaskObject,
  startGame: Function,
  handleKeyDown: Function,
}

export const Gametask = (props: Props) => (
  <div className={classes.GametaskBody} onKeyDown={props.handleKeyDown}>
    <div>
      <h2>Find the Hidden Objects</h2>
      <h2 className={classes.gametaskHeader}>
        {props.gametask ? props.gametask.value : ''}
      </h2>
      <button className='btn btn-default' onClick={props.startGame}>
        Play
      </button>
      {' '}
      {' '}
      <div className={classes.whale}></div>
      <img
      className={classes.submarine}
      id='submarineBox'
      src={SubmarineImage}
      style={{left: props.gametask ? props.gametask.left : '' +'px', 
      top: props.gametask ? props.gametask.top : '' +'px', position:'relative',
      transform: [{scaleX: props.gametask ? props.gametask.scale : '1'}]}}
       />
       {' '}
      <img
      className={classes.stone}
      id='stoneId'
      src={StonesImage}
       />
       {' '}
      <img
      className={classes.tree}
      id='treeId'
      src={TreeImage}
       />
       {' '}
      <img
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
