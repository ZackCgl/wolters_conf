import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    
<footer className="p-4 bg-white shadow md:px-6 md:py-8 dark:bg-gray-900">
    <div className="sm:flex sm:items-center sm:justify-between">
        <div></div>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
            <Link href="/"><p className="mr-4 hover:underline md:mr-6 ">Home</p></Link>
            </li>
            <li>
            <Link href="/privacy_policy"><p className="mr-4 hover:underline md:mr-6">Privacy Policy</p></Link>
            </li>
            <li>
                <Link href="/terms"><p className="mr-4 hover:underline md:mr-6 ">Terms and Conditions</p></Link>
            </li>
            <li>
            <Link href="/contact"><p className="hover:underline">Contact</p></Link>
            </li>
        </ul>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://flowbite.com/" className="hover:underline">Ruby Finance™</a>. All Rights Reserved.
    </span>
</footer>

  )
}

export default Footer