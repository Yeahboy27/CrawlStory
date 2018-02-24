/**
 * Created by mac on 2/12/18.
 */
var Crawler = require('crawler');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var allTitle = [];
url = 'http://sstruyen.com/doc-truyen/truyen-moi-nhat/page-0.html'
// request(url, function (err, res, body) {
//     if(!err && res.statusCode == 200) {
//         var $ = cheerio.load(body)
//         var title = $('.storyinfo .float_left a').each(function (i, elemnet) {
//             var a = $(this, '.imgCover1').html();
//             $ = cheerio.load(a);
//             a = $('img').attr('src');
//             console.log(a);
//         });
//         // $ = cheerio.load(title)
//         // title = $('li h2').text();
//         // title = $('').text();
//         // console.log(title);
//     } else {
//         console.log('2')
//     }
// })

var Crawler = require("crawler");

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
        }
        done();
    }
});

// Queue just one URL, with default callback
c.queue('http://sstruyen.com/doc-truyen/truyen-moi-nhat/page-0.html');
