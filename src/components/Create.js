import React, { useState } from 'react'
import toast from 'react-hot-toast';

function Create({ getData, data, setData,inputref }) {
   
    const handleChange=()=>{
        if(data!=='')
       getData(data); //ye hota h lifting problem .sending data from child tp parent.
      else toast.error("Please enter a todo before adding.",{
         position: "top-center"
      })
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleChange();
      }
    };
    
  return (
       <div className='create'>
        <input type='input'className='input' value={data} placeholder='Write Your ToDo Here...' onChange={(e)=>setData(e.target.value)} onKeyDown={handleKeyDown} ref={inputref}></input>
        <button className='btn'  onClick={handleChange}>Add</button>
       </div>
  )
}

export default Create