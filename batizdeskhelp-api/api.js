'use strict'

const debug = require('debug')('batizhelpdesk:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const auth = require('express-jwt')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('batizhelpdesk-db')

const config = require('./config')

const api = asyncify(express.Router())

api.use(morgan('dev'))

api.use(bodyParser.urlencoded({extended: true}))
api.use(bodyParser.json())

let services, Problem, Status, User, Area, ConfigModel, Permission

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }

    Problem = services.Problem
    Status = services.Status
    User = services.User
    Area = services.Area
    ConfigModel = services.Config
    Permission = services.Permission
  }
  next()
})

api.post('/problems', auth(config.auth),async (req, res, next) => {
  const folio = req.body.folio
  debug(`BODY: ${JSON.stringify(req.body)} FOLIO: ${req.body.folio}`)
  const title = req.body.title
  const content = req.body.content
  const username = req.body.username
  const area = req.body.area
  const status = req.body.status

  let problem = {
    folio,
    title,
    content,
    username,
    area,
    status
  }
  debug(JSON.stringify(problem))

  try {
    await Problem.createOrUpdate(problem)
  } catch (e) {
    return next(e)
  }

  res.send(problem)
})

api.get('/problems', auth(config.auth), async (req, res, next) => {
  debug('A request has come to /problems')
  const { user } = req
  debug(`User ${JSON.stringify(user)}`)

  if(!user || !user.username) {
    return next(new Error('Not authorized'))
  }

  let problems = []
  try {
    if(user.admin) {
      problems = await Problem.findAll()
    } else {
      problems = await Problem.findByUsername(user.username)
    }
  } catch (e) {
    return next(e)
  }

  res.send(problems)
})
api.get('/problems/:folio', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /problems/${req.params.folio}`)

  let folio = req.params.folio
  let problem
  try {
    problem = await Problem.findByFolio(folio)
  } catch (e) {
    return next(e)
  }

  res.send(problem)
})

api.get('/problems/username/:username', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /problems/${req.params.username}`)

  let username = req.params.username
  let problems = []
  try {
    problems = await Problem.findByUsername(username)
  } catch (e) {
    return next(e)
  }

  res.send(problems)
})

api.get('/problems/area/:area', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /problems/${req.params.area}`)

  let area = req.params.area
  let problems = []
  try {
    problems = await Problem.findByArea(area)
  } catch (e) {
    return next(e)
  }

  res.send(problems)
})

api.get('/problems/:username/:area', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /problems/${req.params.username}/${req.params.area}`)

  let username = req.params.username
  let area = req.params.area
  let problems = []
  try {
    problems = await Problem.findByUsernameAndArea(username, area)
  } catch (e) {
    return next(e)
  }
  
  res.send(problems)
})

api.delete('/problems/folio/:folio', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /problems/${req.params.folio}`)

  let folio = req.params.folio
  let problem
  try {
    problem = await Problem.deleteProblem(folio)
  } catch (e) {
    return next(e)
  }

  res.send(`Problem with folio: ${folio} deleted successfully`)
})

api.patch('/problems/:folio', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /problems/${req.params.folio}`)

  let folio = req.params.folio
  let problem
  try {
    problem = await Problem.checkProblem(folio)
  } catch (e) {
    return next(e)
  }

  res.send(`Problem with folio: ${folio} successfully checked`)
})

api.get('/users', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /users GET`)

  let users = []
  try {
    users = await User.findAll()
  } catch (e) {
    return next(e)
  }

  res.send(users)
})

api.post('/users', auth(config.auth), async(req, res, next) => {
  debug('A request has come to /users')
  const { users } = req
  const username = req.body.username
  const password = req.body.password 
  const email = req.body.email
  const admin = req.body.admin
  let user = {
    username,
    password,
    email,
    admin
  }
  debug(`User: ${user}`)
  try {
    await User.createOrUpdate(user)
  } catch(e) {
    return next(e)
  }

  res.send(user)
})

api.get('/permission', async (req, res, next) => {
  debug(`A request has come to /permission`)
  debug(Permission)
})

api.post('/permission', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /permission`)
  const username = req.body.username
  const permission = req.body.permission
  
  let newPermission = {
    username,
    permission
  }

  try {
    await Permission.createOrUpdate(newPermission)
  } catch (e) {
    return next(e)
  }

  res.send(newPermission)
})

api.post('/users/:email', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /users/${req.params.email}`)
  const username = req.body.username
  const email = req.params.email
  debug(`USER ${username}`)
  let user = {
    username,
    email
  }
  try {
    await User.createOrUpdate(user)
  } catch (e) {
    return next(e)
  }

  res.send(user)
})

api.delete('/users/:email', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /users/${req.params.email}`)

  let email = req.params.email
  let user
  try {
    user = await User.deleteUser(email)
  } catch (e) {
    return next(e)
  }

  res.send(`User with email ${email} successfully deleted`)
})


api.get('/status', auth(config.auth), async (req, res, next) => {
  debug('A request has come to /status')

  let status = []
  try {
    status = await Status.findAll()
  } catch (e) {
    return next(e)
  }

  res.send(status)
})

api.post('/status', auth(config.auth), async(req, res, next) => {
  debug('A request has come to /status')

  const day = req.body.day
  let status = req.body.status

  let newstatus = {
    day,
    status
  }
  debug(`Status: ${newstatus}`)
  try {
    await Status.createOrUpdate(newstatus)
  } catch(e) {
    return next(e)
  }
  res.send(newstatus)
})

api.get('/area', auth(config.auth), async(req, res, next) => {
  let areas = []
  try {
    areas = await Area.findAll()
  } catch(e) {
    return next(e)
  }
  res.send(areas)
})

api.post('/area', auth(config.auth), async(req, res, next) => {
  debug('A request has come to /area')

  const area = req.body.area
  console.log(req.params)
  console.log(req.body)
  console.log(req.body.area)
  let newarea = {
    area
  }
  debug(`Area: ${newarea}`)
  try {
    await Area.createOrUpdate(newarea)
  } catch(e) {
    return next(e)
  }
  res.send(newarea)
})

api.delete('/area/:area', auth(config.auth), async (req, res, next) => {
  debug (`A request has come to /area/${req.params.area}`)

  let area = req.params.area
  let newArea
  try {
    newArea = await Area.deleteArea(area)
  } catch (e) {
    return next(e)
  }

  res.send(`Area ${area} successfully deleted`)
})

api.get('/config', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /config`)

  let configs = []
  
  try {
    configs = await ConfigModel.findAll()
  } catch (e) {
    return next(e)
  }

  res.send(configs)
})

api.post('/config', auth(config.auth), async (req, res, next) => {
  debug(`A request ha come to /config`)

  let configs = req.body.config
  let value = req.body.value

  let newConfig = {
    config: configs,
    value
  }

  try {
    await ConfigModel.createOrUpdate(newConfig)
  } catch (e) {
    return next(e)
  }

  res.send(newConfig)
})

api.delete('/config/:config', auth(config.auth), async (req, res, next) => {
  debug (`A request has come to /config/${req.params.config}`)

  let configs = req.params.config
  let newConfig
  try {
    newConfig = await ConfigModel.deleteOne(configs)
  } catch (e) {
    return next(e)
  }

  res.send(`Area ${configs} successfully deleted`)
})

module.exports = api