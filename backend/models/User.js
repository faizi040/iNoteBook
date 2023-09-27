const mongoose = require('mongoose');
const { Schema } = mongoose;
// Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.z

const UserSchema = new Schema({     //defining a schema for your mongodb collection
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
    //sets current date only when a document inserted defultly if user does not add date by himself don't call the function like -> write Date.now()
  },
  
});

module.exports=mongoose.model('user',UserSchema);
//exporting model of Userschema as user model