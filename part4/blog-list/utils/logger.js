import { NODE_ENV } from './config.js'

export const info = (...params) => {
  if (NODE_ENV !== 'test') console.log(...params)
}

export const error = (...params) => {
  console.error(...params)
}
