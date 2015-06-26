var Crawler = require("simplecrawler");
var myCrawler = new Crawler("localhost", "/info/1", 3002);
var pageCount = 0;
var totalCrawlerPages = 500;

myCrawler.maxDepth = 2;
myCrawler.interval = 500;

myCrawler.on("fetchcomplete", function(queueItem, data) {
    console.log("Completed fetching resource:", queueItem.url);
    //console.log(data.toString('utf8'));
    pageCount++;
    if(pageCount == totalCrawlerPages){
    	console.log(myCrawler.queue)
		process.exit();   	
    }
});

myCrawler.on('complete', function() {
	console.log(myCrawler.queue)
    console.log('page count:' + pageCount);

});

var conditionID = myCrawler.addFetchCondition(function(parsedURL) {
    return !(parsedURL.path.match(/\.jpg$/i) || parsedURL.path.match(/\.js$/i) || parsedURL.path.match(/\.css$/i));
});

myCrawler.start();
