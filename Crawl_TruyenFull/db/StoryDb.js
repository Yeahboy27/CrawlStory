/**
 * Created by mac on 2/20/18.
 */
var MongoClient = require('mongodb').MongoClient;

module.exports = {
    findStoryWithId: function(db, storyId) {
        // return MongoClient.connect('mongodb://localhost:27017/TodoApp').then(function(db) {
        var dbo = db.db('DBMongo');
        return dbo.collection('Story').find({id: storyId}).toArray().then((docs) => {
            return docs[0];
        }).then(function (items) {
            return items;
        });
    },

    updateStoryWithId: function (db, storyId, numberOfSplit, category, author, totalChapter, content, urlImage, view,status) {
        // return MongoClient.connect('mongodb://localhost:27017/TodoApp').then(function(db) {
        var dbo = db.db('DBMongo');
            var collection = dbo.collection('Story');
            collection.findOneAndUpdate({id : storyId},
                {
                    $set: {
                        numberofSplitChapter: numberOfSplit,
                        category: category,
                        totalChapter: totalChapter,
                        content: content,
                        urlImage: urlImage,
                        view: view,
                        status: status,
                        author: author
                    },
                },
            {
                new: true
            }, function (err, doc) {
                    if(err) {
                        console.log('Something wrong when updating data');
                    }
                    console.log(doc);
                }
            );
    },

    findStoryWithUrl: function (db, url) {
        var dbo = db.db('DBMongo');
        var collection = dbo.collection('Story');
        collection.find({
            url: url
        }).toArray().then(function (items) {
            return items;
        })
    }
};

