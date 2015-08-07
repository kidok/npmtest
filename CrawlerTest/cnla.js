var cheerio = require('cheerio');
var superagent = require('superagent');

function CompanyDetailInfo(company_detail, $) {
    this.company_detail = company_detail;
    this.$ = $;
};
CompanyDetailInfo.prototype.GetAddresses = function() {
    var that = this;
    var addresses = that.company_detail.find('.adress_text');
    var result = [];
    if (addresses && addresses.length > 0) {
        addresses.each(function(i, elem) {
            result[i] = that.$(this).children('a').text();
        });
    };
    return result;
};

CompanyDetailInfo.prototype.GetPhones = function() {
    var phoneText = this.company_detail.find('.list_phone').first().text();
    return phoneText;
};

CompanyDetailInfo.prototype.GetCategory = function() {
    var category = this.company_detail.find('.list_category').children('a').text();
    return category;
};

CompanyDetailInfo.prototype.GetKeywords = function() {
    var $ = this.$;
    var result = [];
    var keywords = this.company_detail.find('.list_tag').children('a');
    if (keywords && keywords.length > 0) {
        keywords.each(function(i, elem) {
            //console.log(elem);
            result[i] = $(elem).text();
        });
    };
    return result;
};

function TagTitleInfo(tag_title, $) {
    this.tag_title = tag_title;
    this.$ = $;
    this.tag_title_a = tag_title.children('a').first();
    this.name = this.tag_title_a.text();
    this.href = this.tag_title_a.attr('href');
};

TagTitleInfo.prototype.GetID = function() {
    var id = this.href.match(/id_(\S*).html/);
    if (id && id.length >= 2) {
        return id[1];
    };
    return "";
};

superagent.get('http://www.chineseinla.com/restaurant/task_list/catid_6/page_2.html')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36')
    .set('Cookie', '__atuvc=15%7C44%2C23%7C45%2C1%7C46; PHPSESSID=fi8hvbro04d6h35dde8h0bg9c4; mosvisitor=1; __utmt=1; __utma=125619416.54794317.1435086292.1435172122.1435360448.3; __utmb=125619416.32.10.1435360448; __utmc=125619416; __utmz=125619416.1435172123.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); b9afd5446abb1cde865304652e2c04b9=f55608057cb4dbb50040a0bfd9390cd9')
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
    });
