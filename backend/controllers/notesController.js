const notesModel = require("../models/notesModel");

async function fetchNotesOfUser(req, res) {
  try {
    const notes = await notesModel.find({ user: req.user.id }).sort({
      createdAt: -1,
    }); // Fetch notes sorted by creation date
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
}

async function createNewNote(req, res) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const note = new notesModel({
      title,
      content,
      user: req.user.id, // Attach the user's ID to associate the note with the logged-in user
    });

    await note.save(); // Save the note to the database
    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
}

async function deleteNote(req, res) {
  // const note=await notesModel.find({req.note._id})
  const { id } = req.params;
  try {
    const note = await notesModel.findOne({
      user: req.user.id,
      _id: req.params.id,
    });
    if (!note) {
      console.log("No note exists.");
      return res.status(404).json({ message: "Note not found" });
    }
    await notesModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully" });
    console.log("Note deleted successfully", id);
  } catch (err) {
    console.log(err);
  }
}

async function updateNote(req, res) {
  const { id } = req.params;
  const {title,content}=req.body;
  try {
    const note = await notesModel.findOne({
      user: req.user.id,
      _id: req.params.id,
    });
    if (!note) {
      console.log("No note exists.");
      return res.status(404).json({ message: "Note not found" });
    }
    await notesModel.findByIdAndUpdate(
      id,
      { title, content }, // Update object with new title & content
      { new: true }
    ); // Return the updated document);
    res.status(200).json({ message: "Note updated successfully" });
    console.log("Note updated successfully", id);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  fetchNotesOfUser,
  createNewNote,
  deleteNote,
  updateNote,
};
