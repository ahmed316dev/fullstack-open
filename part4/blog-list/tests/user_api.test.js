// before each

import mongoose from 'mongoose'
import { User } from '../models/user'
import { api } from './blog_api.test'
import { initialUser, usersInDb, userWithInvalidPwdLength } from './test_helper'

beforeEach(async () => {
  await User.deleteMany({})

  const user = await new User(await initialUser())
  await user.save()
})
// tests here

test('invalid user is not created', async () => {
  const usersInDbBefore = await usersInDb()

  await api.post('/api/users').send(userWithInvalidPwdLength).expect(401)

  const usersInDbAfter = await usersInDb()

  expect(usersInDbBefore).toEqual(usersInDbAfter)
})

// after all
afterAll(() => {
  mongoose.connection.close()
})
