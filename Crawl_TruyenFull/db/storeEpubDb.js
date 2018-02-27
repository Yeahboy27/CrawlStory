/**
 * Created by mac on 2/27/18.
 */
var MongoClient = require('mongodb').MongoClient;
var Binary = require('mongodb').Binary;

module.exports = {
    storeEpubtoDb: function (database, dir, chapterId) {
        var data = fs.readFileSync(dir);
        var insert_data = {};
        insert_data.file_data= Binary(data);
        var dbo = database.db('DBMongo')
        var collection = dbo.collection('Chapter');
        collection.findOneAndUpdate({
            id: chapterId
        }, {
            $set: {
                ePub: insert_data
            }
        }).then(function (result) {
            console.log(result);
        })
    }
}