import { type NextPage } from "next";
import Head from "next/head";
import Header from "../Components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { OfficesSoap } from "../../soap/officesSoap";
import { companyAtom, REDIRECT_URL } from "../../soap/redirect";
import Sidebar from "../Components/Sidebar";
import { useAtom } from 'jotai'

//DEV REDIRECT_URL

const Home: NextPage = () => {
  const [accesToken, setAccesToken] = useState<string>("");
  const [companyCode, setCompanyCode] = useAtom(companyAtom)
  const [fullsplit, setFullSplit] = useState<string>("");
  const [office, setOffice] = useState<string | null | undefined>("Geen");
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

getOffices()


},[accesToken])

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
          setCompanyCode(XML_ROW?.getElementsByTagName("office")[0]?.innerHTML)
          setOffice(XML_ROW?.getElementsByTagName("office")[0]?.attributes?.[0]?.nodeValue)
        }
      }
    };
    // Send the POST request
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    xmlhttp.send(sr);
  }


  

  

  
  return (
    <>
      <Head>
        <title>Ruby Finance App Home</title>
        <meta name="description" content="Boekhouden voor iedereen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
      <Header fullSplit={fullsplit} handleLogin={handleLogin} handleLogout={handleLogout} accesToken={accesToken}/>
      <main className="flex min-h-screen bg-gradient-to-b from-[#233cfeb1] to-[#111c6fdf]">
        <div>
          <Sidebar />
        </div>
        <div className="flex ml-8 mt-20">
        {accesToken && 
          <div className="">
            <p className="text-white flex-col font-bold text-3xl">Administratie</p>
            <p className="text-white font-extralight text-2xl">{office}</p>
          </div>}
        </div>

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
};

export default Home;






