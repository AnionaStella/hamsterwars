const {
  Router
} = require('express');
const {
  auth,
  db
} = require('../firebase')

const router = new Router();


router.get('/', (req, res) => {
  res.send('you are at /charts root')
})

module.exports = router;