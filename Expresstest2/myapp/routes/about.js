var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('about', { user: "Great User", title: "homepage" });
});

module.exports = router;