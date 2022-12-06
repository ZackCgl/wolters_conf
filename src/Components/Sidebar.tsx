import {FiSettings} from "react-icons/fi"
import {AiOutlineQuestionCircle} from "react-icons/ai"
import Link from "next/link"

function Sidebar({fullSplit, activeIns, activeFaq}:any) {
  return (
    <div className='w-10 text-white font-bold'>
         <Link href={`/faq/#id_token=${fullSplit}`}><AiOutlineQuestionCircle className={`fixed h-7 w-7 bottom-12 left-4 cursor-pointer hover:text-indigo-400 ${activeFaq ? "text-indigo-400": "text-white"}`}/></Link>
         <Link href={`/instellingen/#id_token=${fullSplit}`}><FiSettings className={`fixed h-7 w-7 bottom-4 left-4 cursor-pointer hover:text-indigo-400 ${activeIns ? "text-indigo-400": "text-white"}`}  /></Link>
    </div>
  )
}

export default Sidebar