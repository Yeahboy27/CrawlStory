/**
 * Created by mac on 2/16/18.
 */
var mongoose = require('mongoose');
var {Story} = require('./Model/Story');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/');


// function  addNewStory(story) {
//     MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
//         if (err) {
//             return console.log('Unable to connect to MongoDB server');
//         }
//         var dbo = db.db('DBMongo');
//         db.collection('Story').insertOne({
//             title:  story.title,
//             category: story.category,
//             author:   story.author,
//             newChapter: story.newChapter,
//             view: story.view,
//             url: story.url,
//             urlImage: story.urlImage,
//             date: story.date,
//             status: story.status,
//             totalChapter: story.totalChapter
//         }, (err, result) => {
//           if (err) {
//             return console.log('Unable to insert todo', err);
//           }
//         });
//         console.log('Connected to MongoDB server');
//         db.close();
//     })
// }

module.exports = {mongoose};
