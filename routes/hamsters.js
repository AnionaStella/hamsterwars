const {
  Router
} = require('express');
const {
  auth,
  db
} = require('../firebase')

const router = new Router();

router.get('/', async (req, res) => {
  try {
    let hamsters = [];
    let hamsterDocs = await db.collection('hamsters').get()
    hamsterDocs.forEach(doc => {
      hamsters.push(doc.data())
    })

    res.status(200).send(hamsters)
  } catch (err) {
    res.status(500)
    console.error(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    if (req.params.id !== "random") {
      // Firebase är type sensitive
      let hamster = await db.collection('hamsters').doc(req.params.id).get()
      res.status(200).send(hamster.data())
    } else {
      let hamsters = [];
      let hamsterDocs = await db.collection('hamsters').get()
      hamsters = getHamsterArray(hamsterDocs);
      let randomHamster = Math.floor(Math.random() * (hamsters.length - 1))
      res.status(200).send(hamsters[randomHamster])
    }
  } catch (err) {
    res.status(500)
    console.error(err)
  }
})

function getHamsterArray(hamsterRef) {
  let hamsters = [];
  hamsterRef.forEach(doc => {
    hamsters.push(doc.data())
  })

  return hamsters;
}

router.put('/:id/result', async (req, res) => {

  try {
    let hamsterRef = await db.collection('hamsters').doc(req.params.id).get()
    let hamster = hamsterRef.data();

    if (req.body.won) {
      hamster.wins += 1
    } else {
      hamster.defeats += 1
    }
    hamster.games += 1

    db.collection('hamsters').doc(req.params.id).set(hamster)
      .then(res.status(200).send(hamster))
      .catch(err => {
        throw err
      })
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})


module.exports = router;