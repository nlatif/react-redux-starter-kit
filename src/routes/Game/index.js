import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'game',
  getComponent (nextState, next) {
    require.ensure([
      './containers/GameContainer',
      './modules/game'
    ], (require) => {
      /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */
      const Game = require('./containers/GameContainer').default
      const gameReducer = require('./modules/game').default

      injectReducer(store, {
        key: 'Game',
        reducer: gameReducer
      })

      next(null, Game)
    })
  }
})
