import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { customersSoap } from '../../../soap/customersSoap';
import { companyAtom, REDIRECT_URL } from '../../../soap/redirect';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { productsSoap } from '../../../soap/productsSoap';
import { OfficesSoap } from '../../../soap/officesSoap';
import { addInvoicesSoap } from '../../../soap/addInvoiceSoap';
import { relatiesSoap } from '../../../soap/relatiesSoap';

function Aanmaken() {
    const [accesToken, setAccesToken] = useState<string>("");
    const [companyCode, setCompanyCode] = useState<any>()
    const [fullsplit, setFullSplit] = useState<string>("");
    const [invoiceNumber, setInvoiceNumber] = useState<any>();
    const [requestedInvoiceNumber, setRequestedInvoiceNumber] = useState<any>(0);
    const [relations, setRelations] = useState<string[]>([""]);
    const router = useRouter();
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [ isClickedProductsButton, setIsClickedProductsButton] = useState<boolean>(false);
    const [chosenCustomer, setChosenCustomer] = useState<string>("")
    const [products, setProducts] = useState<any>("")
    const [soapProducts, setSoapProducts] = useState<any>("")
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
        
        }, [accesToken, companyCode])
        
        const handleLogin = () => {
            window.location.replace(
              `https://login.twinfield.com/auth/authentication/connect/authorize?client_id=rubyf&redirect_uri=${REDIRECT_URL}&response_type=id_token+token&scope=openid+twf.user+twf.organisation+twf.organisationUser&state=SOME_RANDOM_STATE&nonce=SOME_RANDOM_NONCE`
            );
          };
        
          const handleLogout = () => {
            window.location.replace(REDIRECT_URL as string);
          };

    function addInvoices(){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open(
          "POST",
          "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
          true
        );
        const sr = addInvoicesSoap({accesToken, companyCode, chosenCustomer})
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              const parser = new DOMParser()
              const el = parser.parseFromString(xmlhttp.responseText, "text/html");
              if(!el) console.log("error with the document");
              router.push(`/facturen/#id_token=${fullsplit}`)
              console.log("factuur aangemaakt")
              console.log(el)
            
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

      function getRelaties(){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open(
          "POST",
          "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
          true
        );
        const sr = relatiesSoap({accesToken, companyCode})
        xmlhttp.onreadystatechange = () => {
          setRelations(["Loading..."])
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
                suppArray.push(demension?.getElementsByTagName("code")[0]?.innerHTML)
                
              }
             
            setRelations(suppArray)
            }
          }
        };
        // Send the POST request
        xmlhttp.setRequestHeader("Content-Type", "text/xml");
        xmlhttp.send(sr);
      }

      function getProducts(){
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open(
          "POST",
          "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
          true
        );
        const sr = productsSoap({accesToken, companyCode, products})
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
             
              const parser = new DOMParser()
              const el = parser.parseFromString(xmlhttp.responseText, "text/html");
             
             const firstRelaties:any = el.childNodes[1]?.textContent 
             console.log(firstRelaties)
             const parseHtml = new DOMParser();
             const xmlDoc2 = parseHtml.parseFromString(firstRelaties,"text/xml");
              const suppliers:any = (xmlDoc2.getElementsByTagName("article")[0])
              const demension:any = suppliers.getElementsByTagName("header")[0]
              const totals:any = suppliers.getElementsByTagName("code")[0]
             if(!totals) {
              setSoapProducts("Geen product gevonden ")
            }
            else{
              setSoapProducts(totals.innerHTML)
              setIsClickedProductsButton(false)
            }
             
           
            }
          }
        };
        // Send the POST request
        xmlhttp.setRequestHeader("Content-Type", "text/xml");
        xmlhttp.send(sr);
      }

      function selectCustomers(){
       
       setIsClicked(!isClicked)
       getRelaties()
       }

       function selectProducts(){
        setIsClickedProductsButton(!isClickedProductsButton)
       
       }

       function searchProducts(){
        getProducts()
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
                <p className=" flex-col font-bold text-3xl">Aanmaken</p>
                <div>
                <button onClick={selectCustomers} className='mt-4 flex flex-col rounded-xl bg-white/10 p-2
                 text-white hover:bg-white/20'>Selecteer Debiteur</button>
                 {isClicked && <div className="text-white font-extralight text-1xl">{relations?.map((sup:any, i:any) => {
                  return <div className='' key={i}><p onClick={() => {setChosenCustomer(sup); setIsClicked(false)}} className='hover:font-semibold cursor-pointer'>{sup}</p></div>
                })}
                </div>}
                {chosenCustomer}
                <button onClick={selectProducts} className='mt-4 flex flex-col rounded-xl bg-white/10 p-2
                 text-white hover:bg-white/20'>Selecteer product</button>
                  {isClickedProductsButton && <div className='flex items-center'>
                    <input className='rounded-md mt-2 h-8 text-black' value={products} onChange={(e) => setProducts(e.target.value)} />
                    <button onClick={searchProducts} className='ml-2 mt-2 flex flex-col rounded-xl bg-white/10 p-2
                 text-white hover:bg-white/20'>Zoek</button>
                 </div>}
               {soapProducts}
                 
                <button onClick={addInvoices} className='mt-4 flex flex-col rounded-xl bg-white/10 p-2
                 text-white hover:bg-white/20'>Create Invoice</button>
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

export default Aanmaken








