/* @flow */

export type GametaskObject = {
  id: number,
  value: string
}

export type GametaskStateObject = {
  current: ?number,
  left: ?number,
  top: ?number,
  offsetLeft: ?number,
  offsetTop: ?number,
  playing: boolean,
  gametasks: Array<GametaskObject>
}