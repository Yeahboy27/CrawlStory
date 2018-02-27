/**
 * Created by mac on 2/27/18.
 */
const {MongoClient, ObjectID} = require('mongodb');

var Crawler = require('crawler');
var cheerio = require('cheerio');
var db = require('../db/StoryDb');
var genEpub = require('../Gen/GenEpub');
var crawlContent = new Crawler({
    maxConnections: 10,
    callback(error, res, done) {
        if(error) {
            console.log(error);
            console.log('Error in crawl content Chapter')
        } else {
            var $ = res.$;
            var content = $('div').html();
            var db = res.options.databsae;
            var dbo = db.db('DBMongo');
            dbo.collection('Story').find({
                id: res.options.storyId
            }).then(function (storyResult) {
                dbo.collection('Chapter').find({
                    id: res.options.chapterId
                }).then(function (chapter) {
                    genEpub.saveChapterContent(content, chapter['title'], story['author'], res.options.storyId, res.options.chapterId);
                })
            }, function (err) {
                console.log('Error in find story at Crawl Chapter');
            })
        }
    }
})

var c = new Crawler({
    maxConnections: 10,
    rateLimit: 1000,
    callback: function(error, res, done) {
        if(error) {
            console.log(error);
        } else {
            var $ = res.$;
            var contentData = $('.detail-content script').text();
            var regChapt = /var nChaptId = (?:\d+)/;
            var regChaptId = /(?:\d+)/;
            var nChaptId = contentData.match(regChapt)[0].match(regChaptId)[0];
            var regChapTime = /(?:\w+)-(?:\w+)-(?:\w+) (?:\w+):(?:\w+):(?:\w+)/;
            var chaptTime = contentData.match(regChapTime)[0].replace(/-| |:/gi, "");
            crawlContent.queue({
                uri: 'http://cf.sstruyen.com/doc-truyen/index.php?ajax=ct&id=' + nChaptId + "&t=" + chaptTime,
                storyId: res.options.storyId,
                chapterId: res.options.chapterId,
                database: res.options.database
            });
        }
        done();
    }
})

// c.queue('http://sstruyen.com/doc-truyen/ngon-tinh/vuong-bai-han-phi-manh-phu-duong-thanh/chuong-6-bong-dem-kinh-hong/453462.html');

module.exports =  {
    crawlChapter: function (url, storyId, chapterId, database) {
        c.queue({
            uri: url,
            storyId: storyId,
            chapterId: chapterId,
            database: database
        });
    }
}