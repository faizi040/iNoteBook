const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
//Route-1: get all the notes using get"api/notes/fetchallnotes" request.Login is required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
   try {
      const notes = await Notes.find({ user: req.user.id });
      //find notes where user is qual to user in the request
      res.json(notes);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occure");
   }


})
//Route-2: Add a new note using post"api/notes/addnote" request.Login is required
router.post('/addnote', fetchUser, [
   body('title', 'Title must be at leats 3 characters').isLength({ min: 3 }),
   body('description', 'Description must be atleats 5 characters').isLength({ min: 5 })
], async (req, res) => {
   const result = validationResult(req);   //picking errors of validation
   if (result.isEmpty()) {
      try {
         // second way of adding data into mongo db
         const { title, description, tag } = req.body;    //destructuring
         const newNote = new Notes({
            title, description, tag, user: req.user.id
         });
         const savedNote = await newNote.save();
         res.send(savedNote);


      } catch (error) {
         console.error(error.message);
         res.status(500).send("some error occure");
      }
   }
   else {
      res.status(400).json({ errors: result.array() });
   }

})

// Route-3: Update an existing note using PUT :/api/notes/updatenote".Login is required.specific note id is required
router.put('/updatenote/:id', fetchUser, async (req, res) => {

   const { title, description, tag } = req.body;  //destructurng
   try {


      const newNote = {};
      if (title) {
         newNote.title = title;
      }
      if (description) {
         newNote.description = description;
      }
      if (tag) {
         newNote.tag = tag;
      }

      //now finding the note if that note really exist of which id is given to us in request
      const note = await Notes.findById(req.params.id);
      if (!note) {
         return res.status(404).send("Not Found");
      }
      //now finding if the user logged in is accessing his note or some other person notes
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
      }
      else {
         let updateNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }); //upadte queryn---new true means in new contact came create it-(requirement for query)
         res.send(updateNote);
      }
   }
   catch (error) {
      console.error(error.message);
      res.status(500).send("some error occure");
   }


})

// Route-4: Delete an existing note using Delete :/api/notes/deletenote".Login is required.specific note id is required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
   try {


      //now finding the note if that note really exist of which id is given to us in request
      const note = await Notes.findById(req.params.id);
      if (!note) {
         return res.status(404).send("Not Found");
      }
      //now finding if the user logged in is accessing his note or some other person notes
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
      }
      else {
         let deleteNote = await Notes.findByIdAndDelete(req.params.id);
         //delete queryn
         res.json({ "Success": "Note has been Deleted Successfully", note: note });

      }
   }
   catch (error) {
      console.error(error.message);
      res.status(500).send("some error occure");
   }
})
module.exports = router;