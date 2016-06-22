//GAME TASK TEST
//These test cases are for the new game implementation.
//TEST cases written are only for few of the payload properties and only few properties describing the state.

import {
  START_GAME,
  RECIEVE_INFO,
  KeyCodes,
  obstacles,
  RANGE,
  recieveGametask,
  handleKeyDown,
  startGame,
  default as gametaskReducer
} from 'routes/Gametask/modules/gametasks'

describe('(Redux Module) Gametask', () => {
  it('Should export a constant START_GAME.', () => {
    expect(START_GAME).to.equal('START_GAME')
  })
  it('Should export a constant RECIEVE_INFO.', () => {
    expect(RECIEVE_INFO).to.equal('RECIEVE_INFO')
  })
  it('Should export a constant KeyCodes.', () => {
    expect(KeyCodes).to.equal('object')
  })
  it('Should export a constant obstacles.', () => {
    expect(obstacles).to.equal('object')
  })
  it('Should export a constant RANGE.', () => {
    expect(RANGE).to.equal('object')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(gametaskReducer).to.be.a('function')
    })

    it('Should initialize with a state of 0 (Number).', () => {
      expect(gametaskReducer(undefined, {})).to.equal(0)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = gametaskReducer(undefined, {})
      expect(state).to.equal(0)
      state = gametaskReducer(state, {type: '@@@@@@@'})
      expect(state).to.equal(0)
      state = gametaskReducer(state, recieveGametask(top:10,left:10))
      expect(state).to.equal(top:10,left:10)
      state = gametaskReducer(state, {type: '@@@@@@@'})
      expect(state).to.equal(top:10,left:10)
    })
  })

  describe('(Action Creator) recieveGametask', () => {
    it('Should be exported as a function.', () => {
      expect(recieveGametask).to.be.a('function')
    })

    it('Should return an action with type "RECIEVE_INFO".', () => {
      expect(recieveGametask()).to.have.property('type', RECIEVE_INFO)
    })

    it('Should assign the first argument to the "payload" property.', () => {
      expect(recieveGametask('TEST',37,10,10,1)).to.have.property('payload','TEST',37,10,10,1)
    })

    it('Should default the "payload" property to null if not provided.', () => {
      expect(recieveGametask('',null,0,0,1)).to.have.property('payload','',null,0,0,1)
    })
  })

  describe('(Action Creator) startGame', () => {
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(() => {
      _globalState = {
        GametaskStateObject {
          current: null,
          left: null,
          top: null,
          scale: null,
          offsetLeft: null,
          offsetTop: null,
          playing: null,
          gametasks: [
            id: null,
            value: null
          ]
        }
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          GametaskStateObject: gametaskReducer(_globalState.GametaskStateObject, action)
        }
      })
      _getStateSpy = sinon.spy(() => {
        return _globalState
      })
    })

    it('Should be exported as a function.', () => {
      expect(startGame).to.be.a('function')
    })

    it('Should call dispatch and getState exactly once.', () => {
      return doubleAsync()(_dispatchSpy, _getStateSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
          _getStateSpy.should.have.been.calledOnce
        })
    })

    it('Should produce a state that is plus or minus 10 the previous state of left and top values.', () => {
      _globalState = { left: 10, top: 10 }

      return doubleAsync()(_dispatchSpy, _getStateSpy) 
          _dispatchSpy.should.have.been.calledOnce
          _getStateSpy.should.have.been.calledOnce
          expect(_globalState.GametaskStateObject.top).to.equal(20)
          expect(_globalState.GametaskStateObject.left).to.equal(20)
          return doubleAsync()(_dispatchSpy, _getStateSpy)
        }
    })
  })

  describe('(Action Creator) handleKeyDown', () => {
    
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(() => {
      _globalState = {
        GametaskStateObject {
          current: null,
          left: null,
          top: null,
          scale: null,
          offsetLeft: null,
          offsetTop: null,
          playing: null,
          gametasks: [
            id: null,
            value: null
          ]
        }
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          GametaskStateObject: gametaskReducer(_globalState.GametaskStateObject, action)
        }
      })
      _getStateSpy = sinon.spy(() => {
        return _globalState
      })
    })

    it('Should be exported as a function.', () => {
      expect(startGame).to.be.a('function')
    })

    it('Should call dispatch and getState.', () => {
      return doubleAsync()(_dispatchSpy, _getStateSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
          _getStateSpy.should.have.been.calledOnce
        })
    })

    it('Should produce a state that is plus or minus 10 the previous state of left and top values.', () => {
      _globalState = { KeyCodes.event:40 }

      return doubleAsync()(_dispatchSpy, _getStateSpy) 
          _dispatchSpy.should.have.been.calledOnce
          _getStateSpy.should.have.been.calledOnce
          expect(_globalState.GametaskStateObject.top).to.equal(20)
          return doubleAsync()(_dispatchSpy, _getStateSpy)
        }
    })

  })

  describe('(Action Handler) recieveGametask', () => {
    it('Should increment the state by the action payload\'s "value" property.', () => {
      let state = recieveGametask(undefined, {})
      expect(state).to.equal(0)
      state = recieveGametask(state, recieveGametask(left:10))
      expect(state).to.equal(left:10)
      state = recieveGametask(state, recieveGametask(left:10, top:10))
      expect(state).to.equal(left:20, top:10)
      state = recieveGametask(state, recieveGametask(left:10,top:-10))
      expect(state).to.equal(left:30,top:0)
    })
  })
})
