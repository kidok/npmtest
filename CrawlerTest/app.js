var Crawler = require("simplecrawler");

var myCrawler = new Crawler("localhost", "/info/1", 3002);

myCrawler.maxDepth = 2;

myCrawler.on("fetchcomplete", function(queueItem, data){
        console.log("Completed fetching resource:", queueItem.url);
        //console.log(data.toString('utf8'));
    });

myCrawler.start();