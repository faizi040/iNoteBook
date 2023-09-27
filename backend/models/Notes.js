const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema is a format of your collection in mongoDB like table structure in mysql
const NotesSchema = new Schema({    //defining a schema for your mongodb collection
  user: {      //saving user id
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
    //this portion is like foreign key usin primary key(id) of another model in our model type is indicating that this field is objectId of a moongoose Schema
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true

  },
  tag: {
    type: String,
    default: "General",

  },
  date: {
    type: Date,
    default: Date.now
    //sets current date only when a document inserted defultly if user does not add date by himself don't call the function like -> write Date.now()
  },

});

module.exports = mongoose.model('notes', NotesSchema);
//exporting model of Notesschema as notes model