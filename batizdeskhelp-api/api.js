'use strict'

const debug = require('debug')('batizdeskhelp:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('batizdeskhelp-db')

const config = require('./config')

const api = asyncify(express.Router())

api.use(morgan('dev'))

api.use(bodyParser.urlencoded({extended: true}))

let services, Problem, Status, User, Area

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
  }
  next()
})

api.post('/problems', async (req, res, next) => {
  const folio = req.body.folio
  debug(`BODY: ${JSON.stringify(req.body)} FOLIO: ${req.body.folio}`)
  const title = req.body.title
  const content = req.body.content
  const username = req.body.username
  let problem = {
    folio,
    title,
    content,
    username
  }
  debug(`PROBLEM: ${JSON.stringify(req.body)} ${title}`)

  try {
    await Problem.createOrUpdate(problem)
  } catch (e) {
    return next(e)
  }

  res.send(problem)
})

api.get('/problems', async (req, res, next) => {
  debug('A request has come to /problems')

  let problems = []
  try {
    problems = await Problem.findAll()
  } catch (e) {
    return next(e)
  }

  res.send(problems)
})

api.post('/users', async(req, res, next) => {
  debug('A request has come to /users')
  const username = req.body.username
  const password = req.body.password 
  const email = req.body.email
  const uuid = req.body.uuid
  let user = {
    username,
    password,
    email,
    uuid
  }
  debug(`User: ${user}`)
  try {
    await User.createOrUpdate(user)
  } catch(e) {
    return next(e)
  }

  res.send(user)
})

api.get('/status', async (req, res, next) => {
  debug('A request has come to /status')

  let status = []
  try {
    status = await Status.findAll()
  } catch (e) {
    return next(e)
  }

  res.send(status)
})

api.post('/status', async(req, res, next) => {
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

api.get('/area', async(req, res, next) => {
  debug('A request has come to /area')

  let areas = []
  try {
    areas = await Area.findAll()
  } catch(e) {
    return next(e)
  }
  res.send(areas)
})

api.post('/area', async(req, res, next) => {
  debug('A request has come to /area')

  const area = req.body.area
  
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

module.exports = api