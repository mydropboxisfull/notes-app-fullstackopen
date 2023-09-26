"use client"

import React, { useState, useEffect } from 'react';
import AddNote from './components/AddNote';
import DisplayNotes from './components/DisplayNotes';
import axios from 'axios';


// 9.23.23 NOTE: Flagged/!Flagged is not being tracked via server. 
// ALSO: We still need to make sure Fly.io server deploys properly and connects to MongoDB Atlas


export default function Home() {
  const [submittedData, setSubmittedData] = useState(["note1", "note2"]);



  // ------------------------------------------Rendering Notes ------------------------------------------------------


  // This useEffect hook loads the previous notes only when the component mounts
  // and whenever setSubmittedData is modified [setSubmittedData] (aka: when a new note is submitted it re-renders)
  // Using Axios it performs a get req and maps the res to Array to replace initial state ["note1", "note2"]
  const hook = () => {
    console.log('effect');
    axios
      .get('http://localhost:3001/api/notes')
      .then(response => {
        console.log('promise fulfilled');
        // Use map to extract the 'message' values from the 'notes' array
        const messages = response.data.map((note: { message: string; }) => note.message);
        setSubmittedData(messages); // Set 'submittedData' to the array of messages
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  }
  
  useEffect(hook, [setSubmittedData])


    // ------------------------------------------Adding New Notes ------------------------------------------------------

  // This func is passed as a prop called onNoteSubmit to the AddNote component
  // the inputvalue is also passed as an argument to 'newNote'

  const handleNoteSubmission = (newNote: string) => {
    // Make an HTTP POST request to your server
    axios
      .post('http://localhost:3001/api/notes', { message: newNote, status: false })
      .then((response) => {
        console.log('Note saved:', response, 'DATA:::', response.data);
        setSubmittedData([...submittedData, newNote]);
      })
      .catch((error) => {
        console.error('Error saving note:', error);
      });
  };
  

  return (
    <div>
      <div className='flex content-center justify-center'>
        <h1 className='text-5xl'>Quick Notes</h1>
      </div>

      <AddNote onNoteSubmit={handleNoteSubmission} /> 
      <DisplayNotes data={submittedData} />
    </div>
  );
}
