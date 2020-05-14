const express = require('express')

const app = express()
app.use(express.json())

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