/**
 * Created by mac on 2/27/18.
 */
var crawlContentChapter = require('../Crawl/Crawl_Content_Chapter')
var Epub = require("epub-gen");
var option = {
    title: "Alice's Adventures in Wonderland", // *Required, title of the book.
    author: "Lewis Carroll", // *Required, name of the author.
    publisher: "Macmillan & Co.", // optional
    cover: "http://demo.com/url-to-cover-image.jpg", // Url or File path, both ok.
    content: [
        {
            title: "About the author", // Optional
            author: "John Doe", // Optional
            data: "<h2>Charles Lutwidge Dodgson</h2>"
            +"<div lang=\"en\">Better known by the pen name Lewis Carroll...</div>" // pass html string
        },
        {
            title: "Down the Rabbit Hole",
            data: "<p>Alice was beginning to get very tired...</p>"
        },
]
};

module.exports = {
    saveChapterContent: function (data, title, author, storyId, chapterId) {
        option.content = [{
            title: title,
            author: author,
            data: data
        }]
        new Epub(option, "/storyId/chapterId.epub");
    }
}

