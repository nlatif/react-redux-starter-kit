/* @flow */
import { connect } from 'react-redux'
import { startGame, handleKeyDown } from '../modules/Game'

import Game from '../components/Game'

import type { GameObject } from '../interfaces/Game'

const mapActionCreators: { startGame: Function, handleKeyDown: Function} = {
  startGame,
  handleKeyDown
}

const mapStateToProps = (state): { game: ?GameObject } => ({
  game: state.game.games.find(game => game.left === state.game.current),
})

export default connect(mapStateToProps, mapActionCreators)(Game)
