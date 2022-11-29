import Link from 'next/link'
import React from 'react'

function Sidebar({fullSplit}:any) {
  return (
    <div className='p-2'>
    <div className='text-white font-semibold ml-4 p-4 mr-4 '>
        <Link href={`/#id_token=${fullSplit}`}><p className='cursor-pointer hover:text-indigo-400'>Dashboard</p></Link>
        <p className='cursor-pointer hover:text-indigo-400'>Facturen</p>
        <Link href={`/bonnetjes#id_token=${fullSplit}`}><p className='cursor-pointer hover:text-indigo-400'>Bonnetjes</p></Link>
        <p className='cursor-pointer hover:text-indigo-400'>Relaties</p>
        <p className='cursor-pointer hover:text-indigo-400'>Offertes</p>
        <p className='cursor-pointer hover:text-indigo-400'>Bankkoppeling</p>
        <p className='cursor-pointer hover:text-indigo-400'>Rapportages</p>
        <p className='cursor-pointer hover:text-indigo-400'>Kennisbank</p>
        <p className='cursor-pointer hover:text-indigo-400'>Agenda</p>
        <br></br>
        <p className='cursor-pointer hover:text-indigo-400'>Settings</p>

    </div>
    </div>
  )
}

export default Sidebar