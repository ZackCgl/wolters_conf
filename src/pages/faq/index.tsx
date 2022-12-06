import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { customersSoap } from '../../../soap/customersSoap';
import { companyAtom, REDIRECT_URL } from '../../../soap/redirect';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { useAtom } from 'jotai'
import { relatiesSoap } from '../../../soap/relatiesSoap';
import { addRelatiesSoap } from '../../../soap/addRelatiesSoap';
import { OfficesSoap } from '../../../soap/officesSoap';

function Index() {
    const [accesToken, setAccesToken] = useState<string>("");
    const [companyCode, setCompanyCode] = useState<any>()
    const [fullsplit, setFullSplit] = useState<string>("");
    const [relations, setRelations] = useState<string[]>(["Loading..."]);
    const [succesfullAddedRelatie, setSuccesFullAddedRelatie] = useState<boolean>(false)
    const router = useRouter();
    const [naam, setNaam] = useState("")
    
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
        getCompanyCode()
        }, [accesToken, companyCode, succesfullAddedRelatie])
        
        const handleLogin = () => {
            window.location.replace(
              `https://login.twinfield.com/auth/authentication/connect/authorize?client_id=rubyf&redirect_uri=${REDIRECT_URL}&response_type=id_token+token&scope=openid+twf.user+twf.organisation+twf.organisationUser&state=SOME_RANDOM_STATE&nonce=SOME_RANDOM_NONCE`
            );
          };
        
          const handleLogout = () => {
            window.location.replace(REDIRECT_URL as string);
          };

      function getCompanyCode() {
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
              setCompanyCode(XML_ROW?.getElementsByTagName("office")[0]?.innerHTML)
              
            }
          }
        };
        // Send the POST request
        xmlhttp.setRequestHeader("Content-Type", "text/xml");
        xmlhttp.send(sr);
      }
      return (
        <>
         <div className='flex flex-col'>
          <Header fullSplit={fullsplit} handleLogin={handleLogin} handleLogout={handleLogout} accesToken={accesToken}/>
          <main className="flex min-h-screen bg-black">
          <div>
          <Sidebar fullSplit={fullsplit} activeFaq={true} />
         </div>
            <div className="flex ml-8 mt-20">
              
              {/*---PROTECTED PROCEDURE---*/}  
              {accesToken && 
              <div className='flex text-white'>
                

              {/*Relatie aanmaken */}
               
                 {/*Relaties mappen */}
                 <div className='ml-4'>
                  <p className="text-white flex-col font-bold text-3xl">FAQ</p>
                  <div className='mt-4 mr-4'>
                    
<div id="accordion-color" data-accordion="collapse" data-active-classNamees="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
  <h2 id="accordion-color-heading-1">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-color-body-1" aria-expanded="true" aria-controls="accordion-color-body-1">
      <span>What is Ruby ?</span>
      <svg data-accordion-icon className="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-color-body-1" className="hidden" aria-labelledby="accordion-color-heading-1">
    <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2 text-gray-500 dark:text-gray-400">Ruby  is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
      <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
    </div>
  </div>
  <h2 id="accordion-color-heading-2">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-color-body-2" aria-expanded="false" aria-controls="accordion-color-body-2">
      <span>Is there a Figma file available?</span>
      <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-color-body-2" className="hidden" aria-labelledby="accordion-color-heading-2">
    <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700">
      <p className="mb-2 text-gray-500 dark:text-gray-400">Ruby  is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.</p>
      <p className="text-gray-500 dark:text-gray-400">Check out the <a href="https://Ruby .com/figma/" className="text-blue-600 dark:text-blue-500 hover:underline">Figma design system</a> based on the utility classNamees from Tailwind CSS and components from Ruby .</p>
    </div>
  </div>
  <h2 id="accordion-color-heading-3">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-color-body-3" aria-expanded="false" aria-controls="accordion-color-body-3">
      <span>What are the differences between Ruby  and Tailwind UI?</span>
      <svg data-accordion-icon className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </h2>
  <div id="accordion-color-body-3" className="hidden" aria-labelledby="accordion-color-heading-3">
    <div className="p-5 font-light border border-t-0 border-gray-200 dark:border-gray-700">
      <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Ruby  are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Ruby  relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
      <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Ruby , Ruby  Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
      <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
      <ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
        <li><a href="https://Ruby .com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">Ruby  Pro</a></li>
        <li><a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
      </ul>
    </div>
  </div>
</div>

                  </div>
                </div>
              </div>}
              
            </div>
          
            {/*---PUBLIC PROCEDURE---*/}  
            {!accesToken && <div className=" container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
           <div
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
             
            >
              <h3 onClick={handleLogin} className="text-2xl font-bold">Sign In →</h3>
              <div className="text-lg">
                Sign in from your account - We offer the greatest features available.
              </div>
            </div>
          <div
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Ruby Finance, our docs are open source.
              </div>
            </div>
          </div>
        </div>}
            
          
          </main>
          </div>
        </>
      );
}

export default Index






