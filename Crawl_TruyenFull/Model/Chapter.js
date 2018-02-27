/**
 * Created by mac on 2/19/18.
 */
const {MongoClient, ObjectID} = require('mongodb');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chapterSchema = new Schema({
    id: Number,
    title:  String,
    storyId: Number,
    url: String,
    date: { type: Date, default: Date.now },
    ePub: Buffer
});

chapterSchema.method('saveChapterToMongoDB', function () {
    MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
        if (err) {
            return console.log('Unable to connect to MongoDB server');
        }
        var dbo = db.db('DBMongo');
        dbo.collection('Chapter').insertOne({
            id: this.id,
            title:  this.title,
            url: this.url,
            storyId: this.storyId,
            date: Date.now,
        }, (err, result) => {
            if (err) {
                return console.log('Unable to insert todo', err);
            }
        });
        db.close();
    })
})

var Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = {Chapter}