/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/NoteContext";


const AddNote = () => {
    const context = useContext(noteContext);
    console.log(context)
    const { addNote } = context;

    const [note, setNote] = useState({
        title: '',
        description: '',
        tag: '',
    })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: "", tag: '' })
    }

    const onChangeFunc = (e) => {
        // console.log(e.target.name)
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form >
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Title</label>
                    <input type="text" value={note.title} className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChangeFunc} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Description</label>
                    <input type="text" value={note.description} className="form-control" name='description' id="description" onChange={onChangeFunc} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Tag</label>
                    <input type="text" value={note.tag} className="form-control" name='tag' id="tag" onChange={onChangeFunc} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length < 3 || note.description.length < 5} >Submit</button>
            </form>
        </div>
    )
}

export default AddNote