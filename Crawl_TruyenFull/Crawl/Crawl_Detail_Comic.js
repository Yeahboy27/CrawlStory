/**
 * Created by mac on 2/18/18.
 */
var {Chapter} = require('../Model/Chapter');
var {Story} = require('../Model/Story');
const {MongoClient, ObjectID} = require('mongodb');

var Crawler = require('crawler');
var fs = require('fs');
var cheerio = require('cheerio');
var db = require('../db/StoryDb');

var c = new Crawler({
    maxConnections: 10,
    rateLimit: 1000,
    callback: function(error, res, done) {
        if(error) {
            console.log(error);
        } else {
            var $ = res.$;
            if($('.truyeninfo img').attr('src') == null) {
                console.log('No story at idStory %d', res.options.storyId);
            } else {
            var urlImage = 'http://sstruyen.com'+$('.truyeninfo img').attr('src');
            var author = $('.truyeninfo div ul li .cp2 a').attr('title');
            var category = [];
            var listCategory = $('.truyeninfo  .item li').children().eq(3).find('a').each(function (i, element) {
                category.push($(this).attr('title'));
            });
            var totalChapter = $('.truyeninfo .item li .cp1:contains("Chương")').parent().children().eq(1).text();
            var status = $('.truyeninfo .item li .cp1:contains("Trạng")').parent().children().eq(1).text();
            var content = $('.story_description').contents()[1].data;
            var view = $('.truyeninfo .item li .cp1:contains("Lần")').parent().children().eq(1).text();
            var numberofSplitChapter = $('.page-split').children().eq($('.page-split').children().length -1).text();
            db.updateStoryWithId(res.options.database, res.options.storyId, numberofSplitChapter,category,author,totalChapter,content,urlImage,view,status);
        }}
        done();
    }
})

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, database) => {
    if(err) {
        return console.log('Unable Connect Mongodb');
    }

    for(var i = 10; i < 20; i++) {
        db.findStoryWithId(database,i).then(function (items) {
            c.queue({
                uri: items['url'],
                storyId:items['id'],
                database: database
            })
        }, function(err) {
        console.error('The promise was rejected', err, err.stack);
        })
    }
})







