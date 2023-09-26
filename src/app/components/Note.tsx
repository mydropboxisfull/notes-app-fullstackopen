import React, {useState, useEffect} from 'react'

function Note(props: any) {

  const [flag, setFlag] = useState(false);





  return (
    <div className='flex content-center justify-center p-4'>


    <div className="w-[12rem] h-[12rem] bg-yellow-200 p-2 flex flex-col justify-center items-center">
    <div className="text-black text-[100%] p-10">
      <p>{props.text}</p>

      <button
  className='p-2 bg-red-400'
  onClick={() => setFlag(!flag)} // Toggle the flag state
>
  {flag ? 'Flagged' : 'Not Flagged'}
</button>
      
    </div>
    </div>
    </div>
  )
}

export default Note

