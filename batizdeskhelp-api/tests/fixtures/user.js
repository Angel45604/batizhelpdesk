'use strict'

const user = {
  id: 1,
  email: 'angel.email@email.com',
  username: 'Angel',
  password: 'test-password',
  admin: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

const users = [
  user,
  extend(user, { id: 2, email: 'test1@test.test', admin: false, username: 'test' }),
  extend(user, { id: 3, email: 'test2@test.test', admin: true, username: 'test3'}),
  extend(user, { id: 4, email: 'test3@test.test', admin: false, username: 'test2' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: users,
  all: users,
  connected: users.filter(a => a.admin),
  platzi: users.filter(a => a.username === 'Angel'),
  byUuid: id => users.filter(a => a.email === id).shift(),
  byId: id => users.filter(a => a.id === id).shift()
}
