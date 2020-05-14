const express = require('express')
const app = express()
const authKey = require('./auth')
app.use(express.json())

let auth = (req, res, next) => {
  const apiKey = authKey
  if (req.method !== 'GET') {
    if (apiKey === req.headers['authorization']) {
      next()
    } else {
      res.status(403).send({
        msg: 'Incorrect key, update and try again'
      })
    }
  } else {
    next()
  }

}
app.use(auth)

app.use('/', express.static('public')) //-- to serve frontend

app.use('/assets', express.static('assets'))

const chartsRoute = require('./routes/charts')
app.use('/charts', chartsRoute)

const gamesRoute = require('./routes/games')
app.use('/games', gamesRoute)

const hamstersRoute = require('./routes/hamsters')
app.use('/hamsters', hamstersRoute)

const statsRoute = require('./routes/stats')
app.use('/stats', statsRoute)



app.listen(3000, () => {
  console.log('Server up and running')
})