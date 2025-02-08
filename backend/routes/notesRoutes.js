const express=require('express');
const authenticate = require('../middlewares/Auth');
const {createNewNote,fetchNotesOfUser, deleteNote, updateNote}=require('../controllers/notesController');
const router=express.Router();

router.get('/fetch',authenticate,fetchNotesOfUser);
router.post('/create',authenticate,createNewNote);
router.delete('/delete/:id',authenticate,deleteNote);
router.put('/update/:id',authenticate,updateNote);

module.exports=router;