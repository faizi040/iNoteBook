const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";
const connectToMongo = () => {    //connecting to mongoDB database
    mongoose.connect(mongoURI, {     //an asyncrounous function returns promises
        useNewUrlParser: true, useUnifiedTopology: true,
    }).then(() => {
        console.log("connected to mongo db");
    }).catch((error) => console.log(error.message));

}
module.exports = connectToMongo;