import { type NextPage } from "next";
import Head from "next/head";
import Header from "../Components/Header";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { OfficesSoap } from "../../soap/officesSoap";
import {  REDIRECT_URL } from "../../soap/redirect";
import Sidebar from "../Components/Sidebar";
import Image from "next/image"
import PublicProcedure from "../Components/PublicProcedure";
import {RiArrowDropDownFill} from "react-icons/ri"
import autoAnimate from "@formkit/auto-animate";

//DEV REDIRECT_URL



const Home: NextPage = () => {
  const [accesToken, setAccesToken] = useState<string>("");
  const [fullsplit, setFullSplit] = useState<string>("");
  const [office, setOffice] = useState<string | null | undefined>("Loading...");
  const router = useRouter();
  const [show, setShow] = useState(false)
  const parent = useRef(null)

  useEffect(() => {
    let accestoken:string | undefined = "";
    const firstsplit = router.asPath.split("access_token=");
    const secondsplit = firstsplit[1]?.split("&token_type")[0];
    accestoken = secondsplit;
    accestoken && setAccesToken(accestoken);

    const fullsplit:any = router.asPath.split("#id_token=")[1];
    setFullSplit(fullsplit);
  });

useEffect(() => {

getOffices()

},[accesToken])

useEffect(() => {
  parent.current && autoAnimate(parent.current)
}, [parent])

const handleLogin = () => {
  window.location.replace(
    `https://login.twinfield.com/auth/authentication/connect/authorize?client_id=rubyf&redirect_uri=${REDIRECT_URL}&response_type=id_token+token&scope=openid+twf.user+twf.organisation+twf.organisationUser&state=SOME_RANDOM_STATE&nonce=SOME_RANDOM_NONCE`
  );
};

const handleLogout = () => {
  window.location.replace(REDIRECT_URL as string);
};

  function getOffices() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
      true
    );
    const sr = OfficesSoap({accesToken})
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const parser = new DOMParser()
          const el = parser.parseFromString(xmlhttp.responseText, "text/html");
          const offices:any = el.childNodes[1]?.textContent
          const parseHtml = new DOMParser();
          const xmlDoc2 = parseHtml.parseFromString(offices,"text/xml");
          const XML_ROW:any = (xmlDoc2.getElementsByTagName("offices")[0])
          setOffice(XML_ROW?.getElementsByTagName("office")[0]?.attributes?.[0]?.nodeValue)
        }
      }
    };
    // Send the POST request
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    xmlhttp.send(sr);
  }

  function getGreeting() {
    // Get the current hour
    let hour = new Date().getHours();
  
    // Return a greeting based on the current hour
    if (hour >= 0 && hour < 12) {
      return "Goedemorgen klant!,";
    } else if (hour >= 12 && hour < 18) {
      return "Goedemiddag klant!";
    } else {
      return "Goedenavond klant!";
    }
  }

  const reveal = () => setShow(!show)
    
 

  return (
    <>
      <Head>
        <title>Ruby Finance App Home</title>
        <meta name="description" content="Boekhouden voor iedereen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col">
      <Header 
        activeDash={true} 
        fullSplit={fullsplit} 
        handleLogin={handleLogin} 
        handleLogout={handleLogout} 
        accesToken={accesToken}/>

        <main className="flex min-h-screen bg-black">
          <div>
          <Sidebar fullSplit={fullsplit} />
          </div>
          {accesToken && <div className="sm:flex lg:flex ml-8 mt-20">
         
            <div ref={parent}>
              <p onClick={reveal} className="dropdown-label flex cursor-pointer text-indigo-400 font-semibold  decoration-indigo-400 text-1xl hover:text-indigo-300 ">Selecteer administratie<RiArrowDropDownFill className="dropdown-label h-7 w-7"/></p>
              {show &&<p className="dropdown-content flex text-white font-normal text-1xl ">{office}</p>}
            </div>
            <div className="flex flex-col mr-4 lg:ml-4">
            <div className="text-white font-bold text-2xl">
              {getGreeting()}
            </div>
           
            <div className="mt-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md 
            dark:bg-gray-800 dark:border-gray-700">
              <Image 
              width={500}
              height={500} src="https://i.imgur.com/p5bASKY.jpg" alt="">
              </Image>
              
              <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900
                     dark:text-white">Ruby technology acquisitions 2022</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of 2021 so far, 
                  in reverse chronological order.</p>
                <a href="#" className="flex rounded-xl gap-4 items-center bg-white/10 p-4 text-white 
                hover:bg-white/20">
                  Read more
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" 
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 
                    1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 
                    1 0 010-1.414z" clip-rule="evenodd">
                    </path>
                  </svg>
               </a>
              </div>
              
            </div>
            
          </div>
          <div className="text-white">
             
              </div>
        </div>}
        
          {!accesToken && 
              <PublicProcedure handleLogin={handleLogin}/>}
        
        </main>
      </div>
    </>
  );
};

export default Home;






