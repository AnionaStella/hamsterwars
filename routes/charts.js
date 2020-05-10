const {
  Router
} = require('express')
const {
  auth,
  db
} = require('../firebase')

const router = new Router()

async function getHamsterArray(orderBy) {
  let hamsterDocs = await db.collection('hamsters')
  let fbHamsters = await hamsterDocs.orderBy(orderBy, 'desc').limit(5).get()

  let hamsters = []
  fbHamsters.forEach(doc => {
    hamsters.push(doc.data())
  })
  return hamsters;
}


router.get('/top', async (req, res) => {
  try {

    res.status(200).send(await getHamsterArray("wins"))

  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

router.get('/bottom', async (req, res) => {
  try {

    res.status(200).send(await getHamsterArray("defeats"))

  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

module.exports = router