'use strict'

const debug = require('debug')('batizdeskhelp:web')
const http = require('http')
const express = require('express')
const chalk = require('chalk')

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)

server.listen(port, () => {
    console.log(`${chalk.green('[batizdeskhelp-web]')} server listening on port ${port}`)
})