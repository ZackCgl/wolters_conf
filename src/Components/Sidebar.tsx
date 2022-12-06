import {FiSettings} from "react-icons/fi"
import {AiOutlineQuestionCircle} from "react-icons/ai"
import Link from "next/link"

function Sidebar({fullSplit, active}:any) {
  return (
    <div className='w-10 text-white font-bold'>
         <AiOutlineQuestionCircle className='fixed h-7 w-7 bottom-14 left-4 cursor-pointer'/>
         <Link href={`/instellingen/#id_token=${fullSplit}`}><FiSettings className={`fixed h-7 w-7 bottom-4 left-4 cursor-pointer hover:text-indigo-400 ${active ? "text-indigo-400": "text-white"}`}  /></Link>
    </div>
  )
}

export default Sidebar