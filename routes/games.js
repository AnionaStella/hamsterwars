const {
  Router
} = require('express')
const {
  auth,
  db
} = require('../firebase')

const router = new Router()

router.post('/', (req, res) => {
  let match = {
    timestamp: new Date(),
    contestants: req.body.contestants,
    winner: req.body.winner
  }
  db.collection('games').add(match)
  res.status(200).send(match)
})

router.get('/', async (req, res) => {
  let matchDocs = await db.collection('games').get()
  let matches = []
  matchDocs.forEach(doc => {
    matches.push(doc.data())
  })

  res.status(200).send(matches)
})

module.exports = router