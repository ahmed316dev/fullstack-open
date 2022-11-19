import dotenv from 'dotenv'

dotenv.config()

export const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
export const PORT = process.env.PORT || 3001
export const NODE_ENV = process.env.NODE_ENV

export const SECRET = process.env.SECRET
