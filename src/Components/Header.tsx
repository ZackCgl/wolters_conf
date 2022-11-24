import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Header({loginExact}:any) {

  return (
    <div className='h-14 fixed backdrop-blur-sm w-screen p-2 items-center flex justify-between'>
        <div></div>
        <Link href="/"> <Image className='ml-32 cursor-pointer' src="https://i.imgur.com/S67aq4a.png" alt='ruby_logo' height={100} width={80}/></Link>
        <button
        className="mr-2 h-9 rounded-full bg-white/10 px-10 font-semibold text-white no-underline transition hover:bg-white/20"
       onClick={loginExact}
      >
      Sign in
      </button>
        </div>
  )
}

export default Header