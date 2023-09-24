const express = require('express');
const router = express.Router();

const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');

const { body, validationResult } = require('express-validator');



// Getting all the notes using   :GET "/api/notes/fetchallnotes" login Required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        res.status(500).json({ error: "Some Error Occurred" })
    }
})

// Add notes using   :POST "/api/notes/addnote" login Required
router.post('/addnote', fetchUser, [
    body('title', "Enter a title with minimum length 3").isLength({ min: 3 }),
    body('description', "Enter a description with minimum length 5").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Way 1
        const noteData = {
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        };

        // const note = await Note.insertMany(noteData);
        const note = await Note.create(noteData);
        res.json(note)

        // Way 2

        /* In the given code, `const note = new Notes({...})` creates a new instance of the `Notes`
        model with the provided properties: `title`, `description`, `tag`, and `user`. */
        // const note = new Note({
        //     title: title,
        //     description: description,
        //     tag: tag,
        //     user: req.user.id
        // });
        // const savedNote = note.save();

        // res.json(savedNote)

    } catch (error) {
        res.status(500).json({ error: "Some Error Occurred" })
    }
})



// update notes using   :POST "/api/notes/updatenote" login Required
router.put('/updatenote/:idForUpdate', fetchUser, [
    // No Validation Kept temporary

    // body('title', "Enter a title with minimum length 5").isLength({ min: 3 }),
    // body('description', "Enter a description with minimum length 5").isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        const newNoteData = {};

        // Way 1
        // if (title) { newNoteData.title = title }
        // if (description) { newNoteData.description = description }
        // if (tag) { newNoteData.tag = tag }

        // Way 2
        title && (newNoteData.title = title);
        description && (newNoteData.description = description);
        tag && (newNoteData.tag = tag);

        // -------------------------
        let note = await Note.findById(req.params.idForUpdate);
        if (!note) { return res.status(404).send("Not Found") }

        // Check all the felids by un commenting this

        // console.log(note.user);
        // console.log(note.user.toString());
        // console.log(req.user.id);

        // Allow updating only if user owns this note 
        if (/* `note.user.toString()` is converting the `user` field of the `note` (object) to a string. */
            note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        //  The line `note = await Note.findByIdAndUpdate(req.params.idForUpdate, { : newNoteData },
        // { new: true });` is updating a note in the database with the provided`idForUpdate`. * /

        // Not Sure about this concept
        // { new: true } -- If the note felid not exist then it will create a new note

        note = await Note.findByIdAndUpdate(req.params.idForUpdate, { $set: newNoteData }, { new: true });
        res.json(note)

    } catch (error) {
        res.status(500).json({ error: "Some Error Occurred" })
    }
})


// delete notes using   :DELETE "/api/notes/deletenote" login Required
router.delete('/deletenote/:idForDelete', fetchUser, [
    // No Validation Required
], async (req, res) => {
    try {
        let note = await Note.findById(req.params.idForDelete);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this note 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        //  The line `note = await Note.findByIdAndUpdate(req.params.idForUpdate, { : newNoteData },
        // { new: true });` is updating a note in the database with the provided`idForUpdate`. * /
        // { new: true } -- If the note felid not exist then it will create a new note

        note = await Note.findByIdAndDelete(req.params.idForDelete);
        // My Way
        // res.json([{ 'Success': "Note has been deleted" }, note])
        // Second Way
        res.json({ 'Success': "Note has been deleted", note })

    } catch (error) {
        res.status(500).json({ error: "Some Error Occurred" })
    }
})

module.exports = router;