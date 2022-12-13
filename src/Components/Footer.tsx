import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-white p-4 shadow dark:bg-gray-900 md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div></div>
        <ul className="mb-6 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
          <li>
            <Link href="/">
              <p className="mr-4 hover:underline md:mr-6 ">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/privacy_policy">
              <p className="mr-4 hover:underline md:mr-6">Privacy Policy</p>
            </Link>
          </li>
          <li>
            <Link href="/terms">
              <p className="mr-4 hover:underline md:mr-6 ">
                Terms and Conditions
              </p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p className="hover:underline">Contact</p>
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
      <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        © 2022{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Ruby Finance™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}

export default Footer;
