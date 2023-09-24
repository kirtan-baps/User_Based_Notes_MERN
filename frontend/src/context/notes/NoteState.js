/* eslint-disable no-unused-vars */
import { useState } from "react";
import NoteContext from "./NoteContext";

import axios from "axios";

const NoteState = (props) => {
    const host = "http://localhost:3001";

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)



    // Add note
    const getNotes = async () => {
        // const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        //     method: "GET",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "auth-token": localStorage.getItem('token'),
        //     },
        // });
        // const json = await response.json()
        // // console.log("JSON", json);
        // setNotes(json)

        // ------With Axios-------------
        const headers = {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token'),
        }

        axios.get(`${host}/api/notes/fetchallnotes`, { headers })
            .then((response) => {
                console.log('Response:', response.data);
                setNotes(response.data)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }



    // Add note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json()
        setNotes(notes.concat(note))

        // ------With Axios-------------

        // const headers = {
        //     'Content-Type': 'application/json',
        //     "auth-token": localStorage.getItem('token'),
        // }

        // await axios.post(`${host}/api/notes/addnote`, { title, description, tag }, { headers })
        //     .then((response) => {
        //         console.log('Response:', response.data);
        //         // setNotes(notes.concat())
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

        // const note = {
        //     "_id": "650b61b72e1b1d2fc0a65bfd",
        //     "user": "6509fc009b6e20a79d1dfed7",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2023-09-20T20:18:40.068Z",
        //     "__v": 0
        // };
        // setNotes(notes.concat(note))
        // Push will not work to add
        // setNotes(notes.push(note))
    }




    // Edit note
    const editNote = async (id, title, description, tag) => {
        // API call

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json()
        console.log(json);

        // making a deep copy of a notes
        let newNotes = await JSON.parse(JSON.stringify(notes));
        // console.log(newNotes);

        console.log(notes);

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                // element.title = title && element.description = description && element.tag = tag;
                newNotes[title] = title;
                newNotes[description] = description;
                newNotes[tag] = tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    // Delete note
    const deleteNote = async (_id) => {

        // const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
        //     method: "DELETE",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "auth-token": localStorage.getItem('token'),
        //     },
        // });
        // const json = await response.json()
        // console.log("JSON", json);
        // const newNotes = notes.filter((note) => note._id !== _id)
        // setNotes(newNotes)


        // ------With Axios-------------
        const headers = {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token'),
        }

        axios.delete(`${host}/api/notes/deletenote/${_id}`, { headers })
            .then((response) => {
                console.log('Response:', response.data);
                const newNotes = notes.filter((note) => note._id !== _id)
                setNotes(newNotes)
            })
            .catch((error) => {
                console.error('Error:', error);
            })

    }


    return (

        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;

