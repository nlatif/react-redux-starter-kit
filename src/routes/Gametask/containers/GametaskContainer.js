/* @flow */
import { connect } from 'react-redux'
import { startGame, handleKeyDown } from '../modules/gametask'

import Gametask from '../components/Gametask'

import type { GametaskObject } from '../interfaces/gametask'

const mapActionCreators: {startGame: Function, handleKeyDown: Function} = {
  startGame,
  handleKeyDown
}

const mapStateToProps = (state): { gametask: ?GametaskObject } => ({
  gametask: state.gametask.gametasks.find(gametask => gametask.id === state.gametask.current),
  left: state.gametask.gametasks.find(gametask => gametask.left === state.gametask.left),
  top: state.gametask.gametasks.find(gametask => gametask.top === state.gametask.top)
})

export default connect(mapStateToProps, mapActionCreators)(Gametask)
