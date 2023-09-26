"use client"

import React, { useState } from "react";

interface AddNoteProps {
  onNoteSubmit: (value: string) => void; // Assuming onNoteSubmit is a function that takes a string argument
}


function AddNote({ onNoteSubmit }: any) {

    const [inputValue, setInputValue] = useState("");
    const [submittedValue, setSubmittedValue] = useState("");

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
      };
    
      const handleSubmit = (event: any) => {
        event.preventDefault();
        setSubmittedValue(inputValue);
        setInputValue('');
    
        // Call the onNoteSubmit function to pass the new note input to the parent component Page.tsx
        onNoteSubmit(inputValue); // inputValue is an argument that is passed to the param 'newNote' in page.tsx
      };

  return (
 <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-full text-black"
          placeholder="Type something..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
      {/* {submittedValue && (
        <p className="mt-4">You submitted: {submittedValue}</p>
      )} */}
    </div>

  )
}

export default AddNote