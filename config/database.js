var mongoose = require('mongoose');
var keys = require('./keys');
module.exports = {
  database: 'mongodb://localhost:27017/student_crud',
  startDb: function() {
    // to get rid of an anooying warning
    mongoose.Promise = global.Promise;
    mongoose.connect(this.database, { useMongoClient: true });
    db = mongoose.connection;
    db.once('open', () => {
      console.log('Connected to mongoDb');
    });

    db.on('error', error => {
      console.log(error);
    });
  }
};
