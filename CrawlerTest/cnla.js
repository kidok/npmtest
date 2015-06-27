var cheerio = require('cheerio');
var superagent = require('superagent');

superagent.get('http://www.chineseinla.com/restaurant/task_list/catid_6/page_2.html')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36')
    .set('Cookie', '__atuvc=15%7C44%2C23%7C45%2C1%7C46; PHPSESSID=fi8hvbro04d6h35dde8h0bg9c4; mosvisitor=1; __utmt=1; __utma=125619416.54794317.1435086292.1435172122.1435360448.3; __utmb=125619416.32.10.1435360448; __utmc=125619416; __utmz=125619416.1435172123.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); b9afd5446abb1cde865304652e2c04b9=f55608057cb4dbb50040a0bfd9390cd9')
    .end(function(err, res) {
        var $ = cheerio.load(res.text);
        var items = [];
        

        console.log($('.tag_title').children('a'));
    });
