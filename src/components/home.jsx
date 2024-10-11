import React from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
    const[value, setValue] = useState();
    const navigate = useNavigate()
    const handlejoinRoom =useCallback(()=>{
navigate(`/room/${value}`)
    },[navigate,value])
  return (
    <div>
      <input value={value} 
      onChange={(e)=>setValue(e.target.value)}  
      type='text' 
      placeholder='Enter room code'/>

      <button onClick={handlejoinRoom}>Join</button>
    </div>
  )
}

export default HomePage
