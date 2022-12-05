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

        getRelaties()
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
             console.log(relaties)
              const suppArray:any = []
              for(let i= 0; i < 500; i++){
                const demension:any = (relaties.getElementsByTagName("dimension")[i])
                suppArray.push(demension?.getElementsByTagName("name")[0]?.innerHTML)
                
              }
             
            setRelations(suppArray)
            }
          }
        };
        // Send the POST request
        xmlhttp.setRequestHeader("Content-Type", "text/xml");
        xmlhttp.send(sr);
      }

      function addRelatie(){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open(
          "POST",
          "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
          true
        );
        const sr = addRelatiesSoap({accesToken, companyCode, naam})
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
             setSuccesFullAddedRelatie(!succesfullAddedRelatie)
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
          <Sidebar />
         </div>
            <div className="flex ml-8 mt-20">
              
              {/*---PROTECTED PROCEDURE---*/}  
              {accesToken && 
              <div className='flex text-white'>
                

              {/*Relatie aanmaken */}
                <div>
                 
                    {/*Data invoer zie oude template rubyapp*/}
                    <Link href={`/relaties/toevoegen#id_token=${fullsplit}`}><button className='mt-4 flex flex-col rounded-xl bg-white/10 p-2
                 text-white hover:bg-white/20'>Relatie Toevoegen</button></Link>
                </div>
                 {/*Relaties mappen */}
                 <div className='ml-4'>
                  <p className="text-white flex-col font-bold text-3xl">Relaties</p>
                  <div className="text-white font-extralight text-2xl">{relations?.map((sup:any, i:any) => {
                  return <div key={i}><p>{sup}</p></div>
                })}
                </div>
                </div>
              </div>}
              
            </div>
          
            {/*---PUBLIC PROCEDURE---*/}  
            {!accesToken && 
            <div className=" container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
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
          </div>
        </>
      );
}

export default Index






