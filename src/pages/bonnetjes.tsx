import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { customersSoap } from '../../soap/customersSoap';
import { companyAtom, REDIRECT_URL } from '../../soap/redirect';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { useAtom } from 'jotai'

function Bonnetjes() {
    const [accesToken, setAccesToken] = useState<string>("");
    const [companyCode, setCompanyCode] = useAtom(companyAtom)
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
              const suppliers:any = (xmlDoc2.getElementsByTagName("dimensions")[0])
              const suppArray:any = []
              for(let i= 0; i < 1000; i++){
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
         <div className='flex flex-col'>
          <Header fullSplit={fullsplit} handleLogin={handleLogin} handleLogout={handleLogout} accesToken={accesToken}/>
          <main className="flex min-h-screen bg-gradient-to-b from-[#233cfeb1] to-[#111c6fdf]">
          <div>
          <Sidebar />
         </div>
            <div className="flex ml-8 mt-20">
              
              {/*with acces*/}  
              {accesToken && 
              <div>
                <p className="text-white flex-col font-bold text-3xl">Crediteuren</p>
                <p className="text-white font-extralight text-2xl">{suppliers?.map((sup:any, i:any) => {
                return <div key={i}><p>{sup}</p></div>
              })}</p>
              </div>}
              
            </div>
          
            {/*without acces*/}  
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

export default Bonnetjes






