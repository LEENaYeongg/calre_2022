const express = require('express'); const os = require('os');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Server Response Success:router');
});
module.exports = router;