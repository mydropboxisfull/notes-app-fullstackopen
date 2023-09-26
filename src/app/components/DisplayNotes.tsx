import React from 'react'
import Note from './Note'



function DisplayNotes({data}: any) {
  return (
    <div>
      {data.slice(0).reverse().map((item: any, index: any) => (
        <Note key={index} text={item} /> // Pass the 'text' prop with the current 'item'
      ))}
    </div>
  )
}

export default DisplayNotes