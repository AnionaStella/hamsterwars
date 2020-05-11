const {
  Router
} = require('express');
// const {
//   auth,
//   db
// } = require('../firebase')

const router = new Router();

router.get('/', (req, res) => {
  try {
    res.status(200).send('you are at /frontend root')
  } catch (err) {
    console.error(err)
    res.status(500).send('Oops, something went wrong, can not find the page you are looking for')
  }

})

module.exports = router;