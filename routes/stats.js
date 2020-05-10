const {
  Router
} = require('express');
const {
  auth,
  db
} = require('../firebase')

const router = new Router();


router.get('/:option', async (req, res) => {

  //Returnerar ett statsobject med totalt antal matcher som hållits.
  if (req.params.option == "total") {
    let gamesRef = await db.collection('games').get()
    let amountOfGames = gamesRef.size

    res.send({
      totalGames: amountOfGames
    })
  }

})

module.exports = router;