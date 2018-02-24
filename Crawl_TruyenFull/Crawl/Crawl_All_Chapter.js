/**
 * Created by mac on 2/19/18.
 */
var {Chapter} = require('../Model/Chapter');

var Crawler = require('crawler');
var fs = require('fs');
var cheerio = require('cheerio');


var c = new Crawler({
    maxConnections: 10,
    callback: function(error, res, done) {
        if(error) {
            console.log(error)
        } else {
            var status = 0
            var $ = res.$;
            if($('.truyeninfo img').attr('src') == null) {
                console.log('No story at idStory %d', res.options.storyId);
                return;
            }
            var listChapter = $('.m10t').children().eq(1).html();
            $ = cheerio.load(listChapter);
            var allChapter = $('.chuongmoi').children().each(function (i, element) {
                var titleChapter = $(this).children().attr('title');
                var chapterHTML = $(this, 'div').html();
                $ = cheerio.load(chapterHTML);
                var chapterId = $('div').text();
                chapterId = chapterId.substring(0, chapterId.length -1);
                var urlChapter = 'http://sstruyen.com' + $('a').attr('href');
                var chapter = new Chapter ({
                    id: chapterId,
                    title: titleChapter,
                    url: urlChapter,
                    storyId: res.options.storyId
                });
                chapter.saveChapterToMongoDB();
            })
        }
        done();
    }
})

// c.queue('http://sstruyen.com/doc-truyen/choc-tuc-vo-yeu---mua-mot-tang-mot/13758.html');
// c.queue('http://sstruyen.com/doc-truyen/hao-mon-thien-gioi-tien-the-anh-dung-yeu-em/15481.html');
c.queue({
    uri:'http://sstruyen.com/doc-truyen/choc-tuc-vo-yeu---mua-mot-tang-mot/13758/page-3.html#chaplist',
    storyId: "292828",
    numberofSplitChapter: 2
})


var db = require('../db/StoryDb');
db.findStoryWithId(5).then(function (items) {
    console.log(items);
}, function (err) {
    console.error('The promise was rejected', err, err.stack);
});