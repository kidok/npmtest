var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	//req.session.username = "sessiontest";
	console.log(req.files);
    res.render('index', {
        title: 'Express'
    });
});

router.post('/', function(req, res, next) {

	var file = req.files.file;
    var tempPath = file.path;
    
    console.log(file);
    res.render('index', {
        title: 'Express'
    });
})

module.exports = router;
