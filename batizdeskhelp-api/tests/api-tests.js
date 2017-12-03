const test = require('ava')
const util = require('util')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const config = require('../config')
const auth = require('../auth')
const sign = util.promisify(auth.sign)


test.serial('Database', t=> {
    t.pass()
})
test.serial('Database/Models', t=> {
    t.pass()
})
test.serial('Database/Lib', t=> {
    t.pass()
})
test.serial.todo('Web - unfinished')
test.serial.todo('Web/Client')
test.serial.todo('Web/WebServices - unfinished')
test.serial.todo('Web/SetupStepper')
test.serial.todo('Web/CoreFunctionality')
test.serial.todo('Api ')
test.serial('Api/Auth', t=> {
    t.pass()
})
test.serial.todo('Api/Routes - not found')
test.serial.todo('Api/SessionStorage - unfinished')