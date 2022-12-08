import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Props{
  fullSplit: string | undefined 
  handleLogin: () => void
  handleLogout: () => void
  accesToken: string 
  activeDash?: boolean
  activeFac?: boolean
  activeCred?:boolean
  activeRel?: boolean
  activeOff?: boolean
  activeRapp?: boolean
  activeBank?: boolean
  activeAgenda?: boolean
}

function Header({
  fullSplit, 
  handleLogin,
  handleLogout,
  accesToken, 
  activeDash, 
  activeFac, 
  activeCred, 
  activeRel, 
  activeOff, 
  activeRapp, 
  activeBank, 
  activeAgenda
}:Props) {

  const [toggle, setToggle] = useState(false)
  const handleMobile = () => {
    setToggle(!toggle)
  }

  return (
  <div>
    <nav className=" border-gray-200 px-2 sm:px-4 py-2.5 h-14 fixed w-screen backdrop-blur-sm">
    <div className="container flex flex-wrap items-center justify-between mx-auto ">
      <Link href={`/#id_token=${fullSplit}`}> <Image className='cursor-pointer ml-4' src="https://i.imgur.com/S67aq4a.png" alt='ruby_logo' height={100} width={80}/></Link>
      
      <button onClick={handleMobile} type="button" className=" inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden " aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-10 h-10 text-white hover:text-indigo-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
      {toggle && <div className="w-full md:w-auto md:hidden" id="navbar-default">
        <ul className=" justify-center flex flex-col p-4 mt-4  z-10 bg-gradient-to-b from-[#5a6cf4fc] to-[#313b7afa] rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:backdrop-blur-sm md:bg-transparent">
          {!accesToken && <button onClick={() => handleLogin()} className='mb-4 mt-4 ml-2 flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 md:hidden'>Sign in</button>}
          {accesToken && <button onClick={() => handleLogout()} className='mb-4 mt-4 ml-2 flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 md:hidden'>Sign Out</button>}

          <li>
          <Link href={`/#id_token=${fullSplit}`}><p className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeDash ? "text-gray-400": "text-white"} `} aria-current="page">Dashboard</p></Link>
          </li>
          <li>
          <Link href={`/facturen#id_token=${fullSplit}`}><p  className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeFac ? "text-gray-400": "text-white"} `}>Facturen</p></Link>
          </li>
          <li>
          <Link href={`/crediteuren#id_token=${fullSplit}`}><p className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeCred ? "text-gray-400": "text-white"} `}>Crediteuren</p></Link>
          </li>
          <li>
          <Link href={`/relaties#id_token=${fullSplit}`}><p className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeRel ? "text-gray-400": "text-white"} `}>Relaties</p></Link>
          </li>
          <li>
            <p className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Offertes</p>
          </li>
          <li>
          <Link href={`/producten#id_token=${fullSplit}`}><p className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Producten</p></Link>
          </li>
          <li>
            <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Rapportages</a>
          </li>
          <li>
            <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Kennisbank</a>
          </li>
          <li>
            <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Agenda</a>
          </li>
          <li>
            <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Settings</a>
          </li>
          
        </ul>
      </div>}
      <div className="hidden w-full md:block md:w-auto p-4" id="navbar-default">
        <ul className="items-center justify-center font-bold flex flex-col border z-10 bg-black border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-lg md: md:border-0 md:backdrop-blur-sm md:bg-transparent">
        
          <li>
          <Link href={`/#id_token=${fullSplit}`}><p className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeDash ? "text-gray-400": "text-white"} `} aria-current="page">Dashboard</p></Link>
          </li>
          <li>
          <Link href={`/facturen#id_token=${fullSplit}`}><p className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeFac ? "text-gray-400": "text-white"} `}>Facturen</p></Link>
          </li>
          <li>
          <Link href={`/crediteuren#id_token=${fullSplit}`}><p className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeCred ? "text-gray-400": "text-white"} `}>Crediteuren</p></Link>
          </li>
          <li>
          <Link href={`/relaties#id_token=${fullSplit}`}><p className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeRel ? "text-gray-400": "text-white"} `}>Relaties</p></Link>
          </li>
          <li>
            <a href="#" className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeOff ? "text-gray-400": "text-white"} `}>Offertes</a>
          </li>
          <li>
          <Link href={`/producten#id_token=${fullSplit}`}><p className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeBank ? "text-gray-400": "text-white"} `}>Producten</p></Link>
          </li>
          <li>
            <a href="#" className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeRapp ? "text-gray-400": "text-white"} `}>Rapportages</a>
          </li>
          <li>
            <a href="#" className={`block py-2 pl-3 pr-4  rounded md:bg-transparent md:p-0 ${activeAgenda ? "text-gray-400": "text-white"} `}>Agenda</a>
          </li>
          <li>
          {!accesToken && <button onClick={() => handleLogin()} className='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-2 text-white hover:bg-white/20'>Sign in</button>}
          {accesToken && <button onClick={() => handleLogout()} className='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-2 text-white hover:bg-white/20'>Sign Out</button>}

          </li>
        </ul>
      </div>
    </div>
</nav>

        </div>
        
  )
}

export default Header