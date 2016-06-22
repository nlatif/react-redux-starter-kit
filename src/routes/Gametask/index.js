import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'gametask',
  getComponent (nextState, next) {
    require.ensure([
      './containers/GametaskContainer',
      './modules/gametask'
    ], (require) => {
      /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */
      const Gametask = require('./containers/GametaskContainer').default
      const gametaskReducer = require('./modules/gametask').default

      injectReducer(store, {
        key: 'gametask',
        reducer: gametaskReducer
      })

      next(null, Gametask)
    })
  }
})
