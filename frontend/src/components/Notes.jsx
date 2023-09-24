/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';


const Notes = () => {
    let navigate = useNavigate();

    const context = useContext(noteContext);
    console.log(context)
    const { notes, getNotes, editNote } = context;
    // console.log(notes)
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
        getNotes();
    }, []);


    const ref = useRef(null);
    // const refClose = useRef(null);

    const [note, setNote] = useState({
        etitle: '',
        edescription: '',
        etag: '',
    })

    const handleClick = (e) => {
        // console.log(refClose)
        editNote(note.id, note.etitle, note.edescription, note.etag);
        // refClose.current.click();
    }

    const onChangeFunc = (e) => {
        // console.log(e.target.name)
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const updateNote = (currentNote) => {
        ref.current.click();

        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    return (
        <>
            <AddNote />
            {/* <button type="button" data-bs-toggle="modal" data-bs-target="#myModal">Launch modal</button> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChangeFunc} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Description</label>
                                    <input type="text" className="form-control" name='edescription' id="edescription" value={note.edescription} onChange={onChangeFunc} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="" className="form-label">Tag</label>
                                    <input type="text" className="form-control" name='etag' id="etag" value={note.etag} onChange={onChangeFunc} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length < 3 || note.edescription < 5}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row' >
                {notes.map((note, index) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes