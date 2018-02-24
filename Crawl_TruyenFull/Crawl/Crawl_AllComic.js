/**
 * Created by mac on 2/16/18.
 */
// var {mongoose} = require('./db/mongoose');
var {Story} = require('../Model/Story');

var Crawler = require('crawler');
var fs = require('fs');
var cheerio = require('cheerio');
var idStory = 1;

var c = new Crawler({
    rateLimit: 1,
    maxConnections: 10,
    callback: function(error, res, done) {
        if(error) {
            console.log(error)
        } else {
            var $ = res.$;
            var storyInfo = $('.storyinfo').each(function (i, elemnet) {
                // var imageHTML = $(this, '.imgCover1').html();
                // $ = cheerio.load(imageHTML);
                // var urlImageStory = $('img').attr('src');
                // console.log(urlImageStory);
                var titleHTML = $(this, '.listTitle').html();
                $ = cheerio.load(titleHTML);
                var title = $('a').attr('title');
                var url = 'http://sstruyen.com'+$('a').attr('href');
                var updateTime = $(this, '.listInfo').children().eq(1).children().eq(4).text().substr(8, this.length);
                var newChapter = $(this).children().eq(1).children().eq(3).text().match(/\d+/g)[0];
                idStory += 1;
                var story = new Story({
                    id: idStory,
                    title: title,
                    url: url,
                    newChapter: newChapter,
                    updateTime: updateTime
                });
                story.saveStoryToMongoDB();
            });
        }
        done();
    }
})
for(var i = 0; i < 477; i++) {
    c.queue({
        uri:'http://sstruyen.com/doc-truyen/index.php?search=&cate=&order=6&page=%d',i,
        preRequest: function(options, done) {
            setTimeout(function() {
                done();
            }, 1000)
        }
    })
}

