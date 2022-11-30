import React from 'react'
import {FiSettings} from "react-icons/fi"
import {AiOutlineQuestionCircle} from "react-icons/ai"

function Sidebar() {
  return (
    <div className='w-10 text-white font-bold'>
         <AiOutlineQuestionCircle className='fixed h-7 w-7 bottom-14 left-4 cursor-pointer'/>
        <FiSettings className='fixed h-7 w-7 bottom-4 left-4 cursor-pointer'/>
    </div>
  )
}

export default Sidebar