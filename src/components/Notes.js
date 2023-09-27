import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';

import {useNavigate} from 'react-router-dom';

const Notes = () => {
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "General" })
    //state regarding to this element
    const context = useContext(noteContext);
    // using context we created for notes
    const { notes, getNotes, editNote } = context;
    const ref = useRef('');
    const refClose = useRef('');
    const navigate = useNavigate();

    //using destructuring to get notes and saddNote value
    useEffect(() => {
        if(localStorage.getItem('token')){

            getNotes();
        //calling getNotes in useEffect so that all notes will be fetched before loading data on web
        }
        else{
            navigate('/login');
        }
        
    },)
    const updateNote = (currentNote) => {
        //as we are sending full note in the props of update note in noteItem
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        //setting actual values to evalues into note state
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        //calling editNote function with all required parameters
        console.log("updating the note", note);


    }
    //     The useRef Hook allows you to persist values between renders. It can be used to store a mutable value that does not cause a re-render when updated.It can be used to access a DOM element directly.need more understanding

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                ref={ref} data-bs-target="#exampleModal" style={{ display: 'none' }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Form</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form action="" >

                                {/* <div className="col-md-6"> */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id='etitle' name='etitle' value={note.etitle} onChange={handleChange} />
                                </div>
                                {/* </div> */}
                                {/* <div className="col-md-6"> */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id='edescription' name='edescription' value={note.edescription} onChange={handleChange} />
                                </div>
                                {/* </div> */}
                                {/* <div className="col-md-6"> */}
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id='etag' name='etag' value={note.etag} onChange={handleChange} />
                                </div>
                                {/* </div> */}



                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div >
            <h1 className="text-center my-5">
                Your Notes

            </h1>

            <div className="row">
                {notes.length === 0 ? <h5 className="text-center">No notes to display</h5> :
                    //full block ternary operator if no notes display h5 otherwise display all notes using map
                    notes.map((note) => {
                        //making key of every Noteitem different by using note id coming from mongo db)(_id)
                        return <Noteitem note={note} updateNote={updateNote} key={note._id} />

                        // returning noteItem and passing tat note details to noteItem in props
                    })}


            </div>
        </>
    )
}

export default Notes