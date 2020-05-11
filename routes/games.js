const {
  Router
} = require('express')
const {
  auth,
  db
} = require('../firebase')

const router = new Router()

router.post('/', (req, res) => {
  try {
    let match = {
      timestamp: new Date(),
      contestants: req.body.contestants,
      winner: req.body.winner
    }
    db.collection('games').add(match)
    res.status(200).send(match)
  } catch (err) {
    console.error(err)
    res.status(500).send('Oops, something went wrong. New match was not posted.')
  }

})

router.get('/', async (req, res) => {
  try {
    let matchDocs = await db.collection('games').get()
    let matches = []
    matchDocs.forEach(doc => {
      matches.push(doc.data())
    })

    res.status(200).send(matches)
  } catch (err) {
    console.error(err)
    res.status(500).send('Something went wrong, could not find any games')
  }

})

module.exports = router