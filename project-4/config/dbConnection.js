const mongoose = require('mongoose');

const dbConnection =()=>{
    mongoose.connect("mongodb://localhost:27017/project-4")
    .then(()=> console.log('db is connected'))
    .catch(err =>console.log(err));

}
module.exports = dbConnection;