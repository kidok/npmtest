var cheerio = require('cheerio');
var fs = require('fs');
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

function initModel(model, data, callback) {
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


fs.readFile('./sample.html', 'utf8', function(err, data) {
    //console.log(data);
    var $ = cheerio.load(data);
    var restaurants = [];
    var items = $('.sponsor_company, .regular_company');
    items.each(function(i, elem) {
        var tag_title = $(this).children('.tag_title');
        var tagTitleInfo = new TagTitleInfo(tag_title, $);

        var company_detail = $(this).children('.company_detail');
        var companyDetailInfo = new CompanyDetailInfo(company_detail, $);
        var restaurant = {};
        restaurant.id = tagTitleInfo.GetID();
        restaurant.href = tagTitleInfo.href;
        restaurant.name = tagTitleInfo.name;
        restaurant.addresses = companyDetailInfo.GetAddresses();
        restaurant.phone = companyDetailInfo.GetPhones();
        restaurant.category = companyDetailInfo.GetCategory();
        restaurant.keywords = companyDetailInfo.GetKeywords();
        restaurants[i] = restaurant;
    });
    console.log(restaurants);
    initModel(restaurantsModel, restaurants, function(){
    	console.log("done");
    });
    //console.log(items.children('a'));
    //console.log(items.children('.map_link'));
});
// var s = '<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>'

// var $ = cheerio.load(s);

// console.log($.html());
