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

module.exports.CompanyDetailInfo = CompanyDetailInfo;
module.exports.TagTitleInfo = TagTitleInfo;
