'use strict'

const debug = require('debug')('batizdeskhelp:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('batizdeskhelp-db')

const config = require('./config')

const api = asyncify(express.Router())

let services, Problem, Status

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
  }
  next()
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

module.exports = api