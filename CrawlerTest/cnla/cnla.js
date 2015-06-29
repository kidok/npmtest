var cheerio = require('cheerio');
var superagent = require('superagent');
var CompanyDetailInfo = require('./models/restaurant.js').CompanyDetailInfo;
var TagTitleInfo = require('./models/restaurant.js').TagTitleInfo;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurant');

var restaurantsModel = mongoose.model('restaurant', {
    uid: String,
    name: String,
    href: String,
    addresses: Array,
    phone: String,
    category: String,
    keywords: Array
});

function initModel(model, data, callback, isAdd) {
    if (isAdd) {
        model.create(data, function(err, result) {
            console.log("add all " + model.modelName);
            callback(null, 1);
        });
    } else {
        model.find(function(err, results) {
            //console.log(stores);
            if (results.length > 0) {
                results.forEach(function(result) {
                    model.remove(function(err) {});
                });
                console.log("delete all ", model.modelName);
            };
            model.create(data, function(err, result) {
                console.log("add all " + model.modelName);
                callback(null, 1);
            });
        });
    }

}


function myFun(i) {
    var currentpage = 'http://www.chineseinla.com/restaurant/task_list/catid_6/page_' + i + '.html';
    var referpage = 'http://www.chineseinla.com/restaurant/task_list/catid_6/page_' + (i - 1) + '.html'
    console.log(currentpage);
    console.log(referpage);
    superagent.get(currentpage)
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36')
        .set('Cookie', '__atuvc=15%7C44%2C23%7C45%2C1%7C46; PHPSESSID=fi8hvbro04d6h35dde8h0bg9c4; mosvisitor=1; __utmt=1; __utma=125619416.54794317.1435086292.1435172122.1435360448.3; __utmb=125619416.32.10.1435360448; __utmc=125619416; __utmz=125619416.1435172123.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); b9afd5446abb1cde865304652e2c04b9=f55608057cb4dbb50040a0bfd9390cd9')
        .set('Referer', referpage)
        .end(function(err, res) {
            var $ = cheerio.load(res.text);
            var restaurants = [];
            var items = $('.sponsor_company, .regular_company');
            items.each(function(i, elem) {
                var tag_title = $(this).children('.tag_title');
                var tagTitleInfo = new TagTitleInfo(tag_title, $);

                var company_detail = $(this).children('.company_detail');
                var companyDetailInfo = new CompanyDetailInfo(company_detail, $);
                var restaurant = {};
                restaurant.uid = tagTitleInfo.GetID();
                restaurant.name = tagTitleInfo.name;
                restaurant.href = tagTitleInfo.href;
                restaurant.addresses = companyDetailInfo.GetAddresses();
                restaurant.phone = companyDetailInfo.GetPhones();
                restaurant.category = companyDetailInfo.GetCategory();
                restaurant.keywords = companyDetailInfo.GetKeywords();
                restaurants[i] = restaurant;
            });
            console.log("page:" + i + ", restaurants:" + restaurants.length);
            initModel(restaurantsModel, restaurants, function() {
                console.log("done");
            }, true);
        });
};

var i = 3;
var timer = setInterval(function() {
    myFun(i);
    console.log(i++);
    if (i === 8) clearInterval(timer);
    console.log('post-interval'); //this will still run after clearing
}, 5000);
