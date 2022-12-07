import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { customersSoap } from '../../../soap/customersSoap';
import { REDIRECT_URL } from '../../../soap/redirect';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { OfficesSoap } from '../../../soap/officesSoap';
import PublicProcedure from '../../Components/PublicProcedure';

function Crediteuren() {
    const [accesToken, setAccesToken] = useState<string>("");
    const [companyCode, setCompanyCode] = useState<string | any>()
    const [fullsplit, setFullSplit] = useState<string>("");
    const [suppliers, setSuppliers] = useState<string[]>(["Loading..."]);
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
        getCompanyCode()
        
        }, [accesToken, companyCode])
        
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
        const sr = customersSoap({accesToken, companyCode})
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              const parser = new DOMParser()
              const el = parser.parseFromString(xmlhttp.responseText, "text/html");
              const Firstsuppliers:any = el.childNodes[1]?.textContent
             
              const parseHtml = new DOMParser();
              const xmlDoc2 = parseHtml.parseFromString(Firstsuppliers,"text/xml");
              const suppliers = (xmlDoc2.getElementsByTagName("dimensions")[0])
              const suppArray:any[] = []
              for(let i= 0; i < 1000; i++){
                const demension = (suppliers?.getElementsByTagName("dimension")[i])
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
              const XML_ROW = (xmlDoc2.getElementsByTagName("offices")[0])
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
          <Header activeCred={true} fullSplit={fullsplit} handleLogin={handleLogin} handleLogout={handleLogout} accesToken={accesToken}/>
          <main className="flex min-h-screen bg-black">
          <div>
          <Sidebar fullSplit={fullsplit} />
         </div>
            <div className="flex ml-8 mt-20">
            {accesToken &&<div>
                 
                 {/*Data invoer zie oude template rubyapp*/}
                 <Link href={`/crediteuren/toevoegen#id_token=${fullsplit}`}><button className='mt-4 flex flex-col rounded-xl bg-white/10 p-2
              text-white hover:bg-white/20 mr-2'>Crediteur Toevoegen</button></Link>
             </div>}
              {/*with acces*/}  
              {accesToken && 
              <div>
                <p className="text-white flex-col font-bold text-3xl">Crediteuren</p>
                <p className="text-white font-extralight text-2xl">{suppliers?.map((sup:string, i:number) => {
                return <div key={i}><p>{sup}</p></div>
              })}</p>
              </div>}
              
            </div>
          
            {/*without acces*/}  
            {!accesToken && 
            <PublicProcedure handleLogin={handleLogin}/>}
            
          </main>
          </div>
        </>
      );
}

export default Crediteuren






