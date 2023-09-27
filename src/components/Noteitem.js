import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note,updateNote } = props;
    //destructuring
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <>
            <div className="col-md-3 mb-4">
                <div className="card" >

                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}.</p>
                        {/* <a href="#" className="btn btn-primary">{note.tag}</a> */}
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem



