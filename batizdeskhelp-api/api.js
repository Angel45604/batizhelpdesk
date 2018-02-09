'use strict'

const debug = require('debug')('batizdeskhelp:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const auth = require('express-jwt')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('batizdeskhelp-db')

const config = require('./config')

const api = asyncify(express.Router())

api.use(morgan('dev'))

api.use(bodyParser.urlencoded({extended: true}))
api.use(bodyParser.json())

let services, Problem, Status, User, Area, ConfigModel, Role
//Funcion temporal para probar
function genTmp(){
  return User.createOrUpdate({id : 1, username: 'pollo', email: 'eeee', password: '1234'}).then(us => {
    Area.createOrUpdate({id : 1, name: 'progra'}).then(ar => {
      //us.addArea(ar)
    })
  })
}
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
    Role = services.Role
  }
  next()
})

//Posts

api.post('/memes', async (req, res, next) => {
  //Falta sacar el usuario de req
  let areas = await User.getAreas({id : 3, username: 'Pablo', email: 'werwer', password: '1234'});
  res.send(areas);
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
api.post('/problems', auth(config.auth), async (req, res, next) => {
  console.log(req.body)
  const folio = req.body.folio
  debug(`BODY: ${JSON.stringify(req.body)} FOLIO: ${req.body.folio}`)
  const title = req.body.title
  const content = req.body.content
  const status = req.body.status

  let problem = {
    folio,
    title,
    content,
    status
  }
  debug(JSON.stringify(problem))
  await genTmp()
  try {
    await User.findByEmail(req.body.userEmail).then(us => {
      Area.findByName(req.body.areaName).then(ar => {
        Problem.createOrUpdate(problem, us, ar)
      })
    })
  } catch (e) {
    console.log('Hubo un error al crear el problema')
    return next(e)
  }

  res.send(problem)
})
api.post('/area', auth(config.auth), async(req, res, next) => {
  debug('A request has come to /area')
  nArea = {name: req.body.areaName}
  try {
     await Area.createOrUpdate(nArea)
  } catch(e) {
    return next(e)
  }
  res.send(nArea)
})
api.post('/users', auth(config.auth), async(req, res, next) => {
  debug('A request has come to /users')
  const username = req.body.username
  const password = req.body.password 
  const email = req.body.email
  const admin = req.body.admin
  let nUser = {
    username,
    password,
    email,
    admin
  }
  debug(`User: ${user}`)
  try {
    await User.createOrUpdate(nUser)
  } catch(e) {
    return next(e)
  }

  res.send(nUser)
})
api.post('/roles', auth(config.auth), async(req, res, next) => {
  const nRole = {name: req.body.roleName, isEditor: req.body.roleIsEditor}
  try {
    await Role.createOrUpdate(nRole)
  } catch(e){
    return next()
  }
  res.send(nRole)
})
api.post('/users/roles', auth(config.auth), async(req, res, next) => {
  await User.findByEmail(req.body.userEmail).then(us => {
    Role.findByName(req.body.roleName).then(ro => {
       us.addRole(ro);
    })
  })
  res.send({msg : 'Sí se conectó'})
})

// api.post('/users/area', async(req, res, next) => {
//   debug('A request has come to /users/area')
//   const area = req.body.area
//   const email = req.body.email
//   console.log(req.params)
//   console.log(req.body)
//   console.log(req.body.area)
//   let newarea = {
//     area
//   }
//   debug(`Area: ${newarea}`)
//   try {
//     console.log(await User.addArea(newarea, email))
//   } catch(e) {
//     return next(e)
//   }
//   res.send(newarea)
// })


//Gets

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

api.get('/role', async (req, res, next) => {
  debug(`A request has come to /role`)
  debug(Role)
})

api.post('/role', auth(config.auth), async (req, res, next) => {
  debug(`A request has come to /role`)
  const username = req.body.username
  const role = req.body.role
  
  let newRole = {
    username,
    role
  }

  try {
    await Role.createOrUpdate(newRole)
  } catch (e) {
    return next(e)
  }

  res.send(newRole)
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

api.get('/area', auth(config.auth), async(req, res, next) => {
  let areas = []
  try {
    areas = await Area.findAll()
  } catch(e) {
    return next(e)
  }
  res.send(areas)
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