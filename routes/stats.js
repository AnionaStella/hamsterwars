const {
  Router
} = require('express');
const {
  auth,
  db
} = require('../firebase')

const router = new Router();


router.get('/:option', async (req, res) => {

  if (req.params.option == "total") {
    try {
      let gamesRef = await db.collection('games').get()
      let amountOfGames = gamesRef.size

      res.status(200).send({
        totalGames: amountOfGames
      })
    } catch (err) {
      console.error(err)
      res.status(500).send('Sorry, could not find total amount of games')
    }
  }


})

module.exports = router;