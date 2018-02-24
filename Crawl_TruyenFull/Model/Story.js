/**
 * Created by mac on 2/16/18.
 */
const {MongoClient, ObjectID} = require('mongodb');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new Schema({
    id: Number,
    title:  String,
    category: Array,
    author:   Array,
    newChapter: String,
    view: Number,
    url: String,
    urlImage: String,
    date: { type: Date, default: Date.now },
    status: String,
    totalChapter: Number,
    updateTime: Date,
    numberofSplitChapter: Number
});

storySchema.method('saveToMongoDB', function () {
    MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
        if (err) {
            return console.log('Unable to connect to MongoDB server');
        }
        var dbo = db.db('DBMongo');
        dbo.collection('Story').insertOne({
            id: this.id,
            title:  this.title,
            category: this.category,
            author:   this.author,
            newChapter: this.newChapter,
            view: this.view,
            url: this.url,
            urlImage: this.urlImage,
            date: this.date,
            status: this.status,
            totalChapter: this.totalChapter
        }, (err, result) => {
            if (err) {
                return console.log('Unable to insert todo', err);
            }
        });
        console.log('Connected to MongoDB server');
        db.close();
    })
})
storySchema.method('saveStoryToMongoDB', function () {
    MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
        if (err) {
            return console.log('Unable to connect to MongoDB server');
        }
        var dbo = db.db('DBMongo');
        dbo.collection('Story').insertOne({
            id: this.id,
            title:  this.title,
            url: this.url,
            updateTime: this.updateTime,
            newChapter: this.newChapter
        }, (err, result) => {
            if (err) {
                return console.log('Unable to insert todo', err);
            }
        });
        db.close();
    })
})

storySchema.method('findStoryWithId', function (storyId) {
    MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
        if (err) {
            return console.log('Unable to connect to MongoDB server');
        }
        var dbo = db.db('DBMongo');
        dbo.collection('Story').find({id: 1}).toArray().then((docs) => {
            console.log(JSON.stringify(docs, undefined, 2));
            return docs;
        });
    })
})



var Story = mongoose.model('Story', storySchema);
module.exports = {Story}