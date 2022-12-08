import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'
import { REDIRECT_URL } from '../../../soap/redirect';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { relatiesSoap } from '../../../soap/relatiesSoap';
import { OfficesSoap } from '../../../soap/officesSoap';
import PublicProcedure from '../../Components/PublicProcedure';
import autoAnimate from '@formkit/auto-animate';

function Index() {
    const [accesToken, setAccesToken] = useState<string>("");
    const [companyCode, setCompanyCode] = useState<any>()
    const [fullsplit, setFullSplit] = useState<string>("");
    const [relations, setRelations] = useState<string[]>(["Loading..."]);
    const [succesfullAddedRelatie, setSuccesFullAddedRelatie] = useState<boolean>(false)
    const router = useRouter();
    const parent = useRef(null)
    const parentPage = useRef(null)
    
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
      parent.current && autoAnimate(parent.current)
      parentPage.current && autoAnimate(parentPage.current)
        getRelaties()
        getCompanyCode()
        
    }, [accesToken, companyCode, succesfullAddedRelatie])
    
    useEffect(() => {
      parent.current && autoAnimate(parent.current)
      parentPage.current && autoAnimate(parentPage.current)
    }, [parent, parentPage])

    const handleLogin = () => {
      window.location.replace(
        `https://login.twinfield.com/auth/authentication/connect/authorize?client_id=
        rubyf&redirect_uri=${REDIRECT_URL}&response_type=id_token+token&scope=openid+twf
        .user+twf.organisation+twf.organisationUser&state=SOME_RANDOM_STATE&nonce=SOME_RANDOM_NONCE`
      );
    };
        
    const handleLogout = () => {
      window.location.replace(REDIRECT_URL as string);
    };

    function getRelaties(){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open(
          "POST",
          "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
          true
        );
        const sr = relatiesSoap({accesToken, companyCode})
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              const parser = new DOMParser()
              const el = parser.parseFromString(xmlhttp.responseText, "text/html");
              const firstRelaties:any = el.childNodes[1]?.textContent
            
              const parseHtml = new DOMParser();
              const xmlDoc2 = parseHtml.parseFromString(firstRelaties,"text/xml");
              const relaties:any = (xmlDoc2.getElementsByTagName("dimensions")[0])
              
              const suppArray:any = []
              for(let i= 0; i < 500; i++){
                const demension:any = (relaties.getElementsByTagName("dimension")[i])
                suppArray.push(demension?.getElementsByTagName("name")[0]?.textContent)
              }
             
            setRelations(suppArray)
            }
          }
        };
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
              setCompanyCode(XML_ROW?.getElementsByTagName("office")[0]?.textContent)
              
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
          <Header activeRel={true} fullSplit={fullsplit} handleLogin={handleLogin} handleLogout={handleLogout} accesToken={accesToken}/>
          <main className="flex min-h-screen bg-gray-900">
          <div>
          <Sidebar fullSplit={fullsplit} />
         </div>
            <div ref={parentPage} className="flex ml-8 mt-20">
              
              {/*---PROTECTED PROCEDURE---*/}  
              {accesToken && 
              <div className='flex text-white mt-4'>
                

              {/*Relatie aanmaken */}
                <div className=''>
                  <Link href={`/relaties/toevoegen#id_token=${fullsplit}`}>
                  <button className=' flex flex-col rounded-xl bg-white/10 p-2
                 text-white hover:bg-white/20'>
                  Relatie Toevoegen
                  </button>
                  </Link>
                </div>
                  <div className='ml-6 w-full'>
                    <p className="text-white flex-col font-bold text-2xl">Relaties</p>
                    <div className="h-72 mt-4 rounded-md border border-purple-400 drop-shadow-md drop bg-gray-800 p-2 overflow-y-scroll scrollbar-hide text-white font-extralight text-1xl">
                      {relations?.map((sup:any, i:any) => {
                      return <div key={i}>
                                <p>{sup}</p>
                             </div>
                  })}
                    </div>
                  </div>
            </div>}
          </div>
          
          </main>
          </div>
        </>
      );
}

export default Index






