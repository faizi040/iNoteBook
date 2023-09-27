import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    // using context we created for notes
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    //declaring a state to save the data 
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        // {...note}: This is the spread operator (...) used to create a shallow copy of the existing "note" object
        // console.log(note);
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
       setNote({ title: "", description: "", tag: "" });

    }
    return (
        <>
            <h1 className="text-center my-3">
                Add a New Note
            </h1>
            <form action="" className='d-flex flex-column align-items-center'>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id='title' name='title' value={note.title} onChange={handleChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id='description' name='description' value={note.description} onChange={handleChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id='tag' name='tag' value={note.tag} onChange={handleChange} />
                    </div>
                </div>
               
                <div className="col-md-6 d-flex justify-content-center">
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </div>
            </form>
        </>
    )
}

export default AddNote