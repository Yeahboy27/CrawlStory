var {Story} = require('../Model/Story');

var Crawler = require('crawler');
var fs = require('fs');
var cheerio = require('cheerio');
var db = require('../db/StoryDb');


var c = new Crawler({
    rateLimit: 1,
    maxConnections: 10,
    callback: function(error, res, done) {
        if(error) {
            console.log(error)
        } else {
            var $ = res.$;
            var storyInfo = $('.storyinfo').each(function (i, elemnet) {
                var titleHTML = $(this, '.listTitle').html();
                $ = cheerio.load(titleHTML);
                var title = $('a').attr('title');
                var url = 'http://sstruyen.com'+$('a').attr('href');
                var updateTime = $(this, '.listInfo').children().eq(1).children().eq(4).text().substr(8, this.length);
                var newChapter = $(this).children().eq(1).children().eq(3).text().match(/\d+/g)[0];
                MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, database) => {
                    if (err) {
                        return console.log('Unable Connect Mongodb');
                    }
                    db.findStoryWithUrl(database, url).then(function (items) {
                        if(items.length == 0) {

                        }
                    }, function (err) {
                        console.log('Unable to connect to find Story at' + String(url));
                    })
                });
            });
        }
        done();
    }
})