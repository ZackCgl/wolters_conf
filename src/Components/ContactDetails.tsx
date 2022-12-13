import React, { useState } from 'react'
import {MdAlternateEmail} from "react-icons/md"

function ContactDetails() {

    const [phone, setPhone] = useState<any>("")

    const handleEmail = () => {
        window.open(`mailto:info@rubyfinance?subject=Contact&body=Telefoonnummer: ${phone}`);
    }
    
  return (
    <div className=''>
        <h2 className='text-3xl font-bold '>Get in touch</h2>
        <div className=' flex items-center justify-center mt-4'>
        <input type="text" className='rounded-md h-7 text-black placeholder-gray-400' value={phone} placeholder='tel. nummer' onChange={(e) => setPhone(e.target.value)} />
        <button onClick={handleEmail} className='ml-2 flex flex-col rounded-xl bg-purple-800 p-1.5
                 text-white hover:bg-purple-900'>Bel mij terug</button>
                 </div>
                 <div className='flex mt-4 items-center'><MdAlternateEmail className='h-8 w-8 mr-1'/> <p className=''>info@rubyfinance.nl</p></div>
       
    </div>
  )
}

export default ContactDetails