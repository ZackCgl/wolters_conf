import { Head } from 'next/document';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { customersSoap } from '../../soap/customersSoap';
import { REDIRECT_URL } from '../../soap/redirect';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';


function bonnetjes() {
    const [accesToken, setAccesToken] = useState<string>("");
    const [fullsplit, setFullSplit] = useState<string>("");
    const [suppliers, setSuppliers] = useState<string[]>();
    const router = useRouter();
    
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

        getCustomers()
        
        }, [accesToken])
        
        const handleLogin = () => {
            window.location.replace(
              `https://login.twinfield.com/auth/authentication/connect/authorize?client_id=rubyf&redirect_uri=${REDIRECT_URL}&response_type=id_token+token&scope=openid+twf.user+twf.organisation+twf.organisationUser&state=SOME_RANDOM_STATE&nonce=SOME_RANDOM_NONCE`
            );
          };
        
          const handleLogout = () => {
            window.location.replace(REDIRECT_URL as string);
          };

    function getCustomers(){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open(
          "POST",
          "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
          true
        );
        const sr = customersSoap({accesToken})
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              var parser = new DOMParser()
              var el = parser.parseFromString(xmlhttp.responseText, "text/html");
              const Firstsuppliers:any = el.childNodes[1]?.textContent
              let xmlDoc2;
              var parseHtml = new DOMParser();
              xmlDoc2 = parseHtml.parseFromString(Firstsuppliers,"text/xml");
              const suppliers:any = (xmlDoc2.getElementsByTagName("dimensions")[0])
              console.log(suppliers)
              let suppArray:any = []
              for(let i= 0; i < 21; i++){
                const demension:any = (suppliers.getElementsByTagName("dimension")[i])
                suppArray.push(demension?.getElementsByTagName("name")[0]?.innerHTML)
                
              }
             
              setSuppliers(suppArray)
            }
          }
        };
        // Send the POST request
        xmlhttp.setRequestHeader("Content-Type", "text/xml");
        xmlhttp.send(sr);
      }
      return (
        <>
         
          <Header loginExact={handleLogin} handleLogout={handleLogout} accesToken={accesToken}/>
          <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="flex mt-16">
            
              {accesToken && <Sidebar fullSplit={fullsplit}/>}
             
            
           
            {accesToken && <div className="mr-10"><h2 className="text-white font-bold flex-col">Bonnetjes</h2></div>}
          {accesToken && <div><p className="text-white">Crediteuren: {suppliers?.map((sup:any, i:any) => {
            return <div key={i}><p>{sup}</p></div>
          })}</p></div>}
          
          </div>
          
            
            {!accesToken && <div className=" container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
               <Link
                  className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                  href="https://create.t3.gg/en/usage/first-steps"
                >
                  <h3 className="text-2xl font-bold">Sign Out →</h3>
                  <div className="text-lg">
                    Sign in from your account - We offer the greatest features available.
                  </div>
                </Link>
              <Link
                  className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                  href="https://create.t3.gg/en/introduction"
                >
                  <h3 className="text-2xl font-bold">Documentation →</h3>
                  <div className="text-lg">
                    Learn more about Ruby Finance, our docs are open source.
                  </div>
                </Link>
              </div>
            </div>}
            
          
          </main>
        </>
      );
}

export default bonnetjes


