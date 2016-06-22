import React from 'react'
import { bindActionCreators } from 'redux'
import { Gametask } from 'components/Gametask/Gametask'
import { shallow } from 'enzyme'
//GAME TASK TEST
//These test cases are for the new game implementation.
//TEST cases written are only for rendering of dom element.

describe('(Component) Gametask', () => {

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render with an <h2> that includes text.', () => {
    expect(_wrapper.find('h2').text()).to.match(/'Find the Hidden Objects'/)
  })

  it('Should render with another <h2> that includes text.', () => {
    expect(_wrapper.find('h2').text()).to.match(/''/)
  })

  it('Should render exactly a buttons.', () => {
    expect(_wrapper).to.have.class('.btn')
  })

  it('Should render with a image to navigate.', () => {
    expect(_wrapper.find('img')).to.have.class(/'submarineBox'/)
  })

  it('Should render with a image to navigate.', () => {
    expect(_wrapper.find('img')).to.have.class(/'stone'/)
  })

  it('Should render with a image to navigate.', () => {
    expect(_wrapper.find('img')).to.have.class(/'tree'/)
  })

  it('Should render with a image to navigate.', () => {
    expect(_wrapper.find('img')).to.have.class(/'gift'/)
  })

})
