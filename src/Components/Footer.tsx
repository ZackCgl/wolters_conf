import Link from "next/link";
import React from "react";
import { BsInstagram, BsLinkedin, BsFacebook } from "react-icons/bs";

function Footer() {
  return (
    <footer className=" h-full bg-blue-700 p-16 text-white">
      <div className="grid grid-cols-1 justify-center gap-8 lg:flex">
        <div>
          <h1 className="text-lg font-bold">Info</h1>
          <p>Ruby Finance</p>
          <p>085 - 4835878</p>
          <p>info@rubyfinance.nl</p>
          <p>Fokkerstraat 18 </p>
          <p>2811 ER Reeuwijk</p>
          <p>BTW nr: NL857375568B01</p>
        </div>
        <div>
          <h1 className="text-lg font-bold">Chat met ons</h1>
          <p>Onze adviseurs staan voor jou </p>
          <p>klaar van Ma t/m Vr. </p>
          <p>van 10:00 tot 20:00 uur.</p>
          <p>Za. van 12.00 tot 18.00. Zo. gesloten.</p>
        </div>
        <div>
          <h1 className="text-lg font-bold">Snelle links</h1>
          <Link href={"/Algemene_voorwaarden_RubyFinance.pdf"}>
            <p>Algemene voorwaarden</p>
          </Link>
        </div>
      </div>
      <hr className="my-6 border-gray-200  sm:mx-auto lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-white sm:text-center">
          © 2022{" "}
          <a href="https://rubyfinance.nl/" className="hover:underline">
            Ruby Finance
          </a>
          . All Rights Reserved.
        </span>
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <Link
            href="https://www.facebook.com/profile.php?id=100089124375659"
            className="text-white hover:text-gray-900 "
          >
            <BsFacebook />
          </Link>
          <Link
            href="https://www.linkedin.com/company/rubyfinance/"
            className="text-white hover:text-gray-900 "
          >
            <BsLinkedin />
          </Link>
          <Link
            href="https://www.instagram.com/rubyfinance.nl/"
            className="text-white hover:text-gray-900 "
          >
            <BsInstagram />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
