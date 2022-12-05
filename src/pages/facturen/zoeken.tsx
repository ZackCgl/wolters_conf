import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { customersSoap } from '../../../soap/customersSoap';
import { companyAtom, REDIRECT_URL } from '../../../soap/redirect';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { useAtom } from 'jotai'
import { invoiceSoap } from '../../../soap/invoiceSoap';
import { OfficesSoap } from '../../../soap/officesSoap';

function Zoeken() {
    const [accesToken, setAccesToken] = useState<string>("");
    const [companyCode, setCompanyCode] = useState<any>()
    const [fullsplit, setFullSplit] = useState<string>("");
    const [invoiceNumber, setInvoiceNumber] = useState<any>();
    const [requestedInvoiceNumber, setRequestedInvoiceNumber] = useState<any>(0);
    const [incBtw, setIncBtw] = useState<any>(0)
    const [exBtw, setExBtw] = useState<any>(0)
    const [Customer, setCustomer] = useState<any>()
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

        getInvoices()
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

    function getInvoices(){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open(
          "POST",
          "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
          true
        );
        const sr = invoiceSoap({accesToken, companyCode, requestedInvoiceNumber})
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              const parser = new DOMParser()
              const el = parser.parseFromString(xmlhttp.responseText, "text/html");
              const firstfacturen:any = el.childNodes[1]?.textContent
             
              const parseHtml = new DOMParser();
              const xmlDoc2 = parseHtml.parseFromString(firstfacturen,"text/xml");
              const suppliers:any = (xmlDoc2.getElementsByTagName("salesinvoice")[0])
              const demension:any = suppliers.getElementsByTagName("header")[0]
              const totals:any = suppliers.getElementsByTagName("totals")[0]
              if(demension == undefined){
                setInvoiceNumber(0)
                    setCustomer("")
                    setIncBtw(null)
                    setExBtw(null)
              }
              else{
                const invoicenumber:any = requestedInvoiceNumber > 0 && demension.getElementsByTagName("invoicenumber")[0]
                const customer:any = requestedInvoiceNumber > 0 && demension.getElementsByTagName("customer")[0]
                const valueinc:any = requestedInvoiceNumber > 0 && totals.getElementsByTagName("valueinc")[0]
                const valueex:any = requestedInvoiceNumber > 0 && totals.getElementsByTagName("valueexcl")[0]
                if(invoiceNumber == undefined){
                    setInvoiceNumber(0)
                    setCustomer("")
                    setIncBtw(0)
                    setExBtw(0)
                  }
                  else{
                    setInvoiceNumber(invoicenumber.innerHTML)
                    setCustomer(customer.innerHTML)
                    setIncBtw(valueinc.innerHTML)
                    setExBtw(valueex.innerHTML)
                  }
            }
             
             
             
              {/* const suppArray:any = []
              suppArray.push(demension?.getElementsByTagName("name")[0]?.innerHTML)
                
              
             
            setSuppliers(suppArray) */}
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
              
              {/*with acces*/}  
              {accesToken && 
              <div className='text-white'>
                <p className=" flex-col font-bold text-3xl">Zoeken</p>
                <div>
                <label>Zoek factuurnummer: </label><input className='text-black w-16 rounded-md' placeholder='bijv: 1' value={requestedInvoiceNumber} onChange={(e) => setRequestedInvoiceNumber(e.target.value)} />
                <button className='mt-4 flex flex-col rounded-xl bg-white/10 p-2 text-white hover:bg-white/20' onClick={getInvoices}>Zoek factuur</button>
                <p className="text-white font-extralight text-2xl">Invoicenumber: {invoiceNumber > 0 ? invoiceNumber : "Geen factuur gevonden"}</p>
                <p className="text-white font-extralight text-2xl">Klantnummer: {Customer}</p>
                <p className="text-white font-extralight text-2xl">Incl Btw: {incBtw}</p>
                <p className="text-white font-extralight text-2xl">Ex. Btw: {exBtw}</p>
                </div>
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

export default Zoeken






