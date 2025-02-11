import { useState, useEffect } from "react";
import "./Notes.css"; // Import CSS file for styling

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Edit modal state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch("https://news-mania-eta.vercel.app/notes/fetch", {
          method: "GET",
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  // Function to add a new note
  const addNote = async () => {
    if (title.trim() === "" || content.trim() === "") return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch("https://news-mania-eta.vercel.app/notes/create", {
        method: "POST",
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const data = await response.json();
      setNotes([...notes, data.note]);

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // Function to open the edit dialog
  const openEditDialog = (note) => {
    setSelectedNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditDialogOpen(true);
  };

  // Function to update a note
  const handleUpdateNote = async () => {
    if (!selectedNote) return;

    try {
      const response = await fetch(`https://news-mania-eta.vercel.app/notes/update/${selectedNote._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const data = await response.json();

      // Update UI
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === selectedNote._id ? { ...note, title: editTitle, content: editContent } : note
        )
      );

      setEditDialogOpen(false); // Close the modal after updating
      setSelectedNote(null); // Clear selected note
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Function to delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`https://news-mania-eta.vercel.app/notes/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Saved News Notes</h2>

      {/* Add Note Form */}
      <div className="note-form">
        <input
          type="text"
          placeholder="Headline Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Details or summary of the news..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea-field"
        />
        <button onClick={addNote} className="add-btn">
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note._id} className="note-card">
            <h3 className="note-title">{note.title}</h3>
            <p className="note-content">{note.content}</p>
            <button onClick={() => deleteNote(note._id)} className="delete-btn">
              Delete
            </button>

            <button onClick={() => openEditDialog(note)} className="edit-btn">
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Edit Note Modal */}
      {/* Edit Note Modal */}
      {/* Edit Note Modal */}
      {editDialogOpen && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
                {/* Close Button */}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditDialogOpen(false)} // Close modal when clicked
                  aria-label="Close"
                >
                  {/* <span aria-hidden="true">&times;</span> */}
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="editTitle">Title</label>
                  <input
                    type="text"
                    id="editTitle"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editContent">Content</label>
                  <textarea
                    id="editContent"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateNote}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
