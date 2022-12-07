import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { REDIRECT_URL } from '../../../soap/redirect';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { OfficesSoap } from '../../../soap/officesSoap';
import { addCrediteurSoap } from '../../../soap/addCrediteurSoap';
import PublicProcedure from '../../Components/PublicProcedure';

function Toevoegen() {
    const [accesToken, setAccesToken] = useState<string>("");
    const [companyCode, setCompanyCode] = useState<any>()
    const [fullsplit, setFullSplit] = useState<string | undefined>("");
    const [succesfullAddedRelatie, setSuccesFullAddedRelatie] = useState<boolean>(false)
    const router = useRouter();
    const [naam, setNaam] = useState("")
    
    useEffect(() => {
        let accestoken:string | undefined = "";
        const firstsplit = router.asPath.split("access_token=");
        const secondsplit = firstsplit[1]?.split("&token_type")[0];
        accestoken = secondsplit;
        accestoken && setAccesToken(accestoken);
        const fullsplit = router.asPath.split("#id_token=")[1];
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

      function addRelatie(){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open(
          "POST",
          "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
          true
        );
        const sr = addCrediteurSoap({accesToken, companyCode, naam})
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
             setSuccesFullAddedRelatie(!succesfullAddedRelatie)
             setNaam("")
             router.push(`/crediteuren/#id_token=${fullsplit}`)
            }
          }
        }
         // Send the POST request
         xmlhttp.setRequestHeader("Content-Type", "text/xml");
         xmlhttp.send(sr);
      }

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
          <Sidebar fullSplit={fullsplit} />
         </div>
            <div className="flex ml-8 mt-20">
              
              {/*---PROTECTED PROCEDURE---*/}  
              {accesToken && 
              <div className='flex flex-col text-white'>
                 {/*Relaties mappen */}
                <div>
                  <p className="text-white flex-col font-bold text-3xl">Crediteur toevoegen</p>
                  
                </div>

              {/*Relatie aanmaken */}
                <div className='mt-4'>
                 
                    {/*Data invoer zie oude template rubyapp*/}
                  <label className='font-bold mr-2'>Naam:</label><input className='rounded-md text-black font-bold' value={naam} onChange={(e) => setNaam(e.target.value)} />
                  <button className='mt-4 flex flex-col rounded-xl bg-white/10 p-2 text-white hover:bg-white/20' onClick={addRelatie}>Add Relatie</button>

                </div>
              </div>}
              
            </div>
          
            {/*---PUBLIC PROCEDURE---*/}  
            {!accesToken && 
            <PublicProcedure handleLogin={handleLogin}/>}
            
          </main>
          </div>
        </>
      );
}

export default Toevoegen






