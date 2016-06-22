import GametaskRoute from 'routes/Gametask'

describe('(Route) Gametask', () => {
  let _route

  beforeEach(() => {
    _route = GametaskRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof(_route)).to.equal('object')
  })

  it('Configuration should contain path `gametask`', () => {
    expect(_route.path).to.equal('gametask')
  })

})
