import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { REDIRECT_URL } from "../../../soap/redirect";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { invoiceSoap } from "../../../soap/invoiceSoap";
import { OfficesSoap } from "../../../soap/officesSoap";
import PublicProcedure from "../../Components/PublicProcedure";
import autoAnimate from "@formkit/auto-animate";
import Footer from "../../Components/Footer";

function Index() {
  const [accesToken, setAccesToken] = useState<string>("");
  const [companyCode, setCompanyCode] = useState<any>();
  const [fullsplit, setFullSplit] = useState<string>("");
  const [requestedInvoiceNumber, setRequestedInvoiceNumber] = useState<any>(0);
  const router = useRouter();
  const parent = useRef(null);
  const parentPage = useRef(null);

  useEffect(() => {
    let accestoken: string | undefined = "";
    const firstsplit = router.asPath.split("access_token=");
    const secondsplit = firstsplit[1]?.split("&token_type")[0];
    accestoken = secondsplit;
    accestoken && setAccesToken(accestoken);

    const fullsplit: any = router.asPath.split("#id_token=")[1];
    setFullSplit(fullsplit);
  });

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
    parentPage.current && autoAnimate(parentPage.current);
    getCompanyCode();
  }, [accesToken, companyCode]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
    parentPage.current && autoAnimate(parentPage.current);
  }, [parent, parentPage]);

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
    const sr = OfficesSoap({ accesToken });
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const parser = new DOMParser();
          const el = parser.parseFromString(xmlhttp.responseText, "text/html");
          const offices: any = el.childNodes[1]?.textContent;

          const parseHtml = new DOMParser();
          const xmlDoc2 = parseHtml.parseFromString(offices, "text/xml");
          const XML_ROW: any = xmlDoc2.getElementsByTagName("offices")[0];
          setCompanyCode(
            XML_ROW?.getElementsByTagName("office")[0]?.textContent
          );
        }
      }
    };
    // Send the POST request
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    xmlhttp.send(sr);
  }

  function getInvoices() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
      true
    );
    const sr = invoiceSoap({ accesToken, companyCode, requestedInvoiceNumber });
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const parser = new DOMParser();
          const el = parser.parseFromString(xmlhttp.responseText, "text/html");
          const firstfacturen: any = el.childNodes[1]?.textContent;
          console.log(firstfacturen);

          {
            /*  const parseHtml = new DOMParser();
              const xmlDoc2 = parseHtml.parseFromString(firstfacturen,"text/xml");
              const suppliers:any = (xmlDoc2.getElementsByTagName("salesinvoice")[0])
              const demension:any = suppliers.getElementsByTagName("header")[0] */
          }
        }
      }
    };
    // Send the POST request
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    xmlhttp.send(sr);
  }
  return (
    <>
      <div className="flex flex-col">
        <Header
          activeFac={true}
          fullSplit={fullsplit}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          accesToken={accesToken}
        />
        <main className="flex min-h-screen bg-gray-900">
          <div>
            <Sidebar fullSplit={fullsplit} />
          </div>
          <div ref={parentPage} className="ml-8 mt-20 flex">
            {/*with acces*/}
            {accesToken && (
              <div className="text-white">
                <p className=" flex-col text-3xl font-bold">Facturen</p>
                <div className="flex">
                  <Link href={`/facturen/zoeken#id_token=${fullsplit}`}>
                    <button
                      className="mt-4 flex flex-col rounded-xl bg-white/10 p-2
                 text-white hover:bg-white/20"
                    >
                      Zoeken
                    </button>
                  </Link>
                  <Link href={`/facturen/aanmaken#id_token=${fullsplit}`}>
                    <button
                      className="mt-4 ml-4 flex flex-col rounded-xl bg-white/10 p-2
                 text-white hover:bg-white/20"
                    >
                      Aanmaken
                    </button>
                  </Link>
                  <button
                    onClick={getInvoices}
                    className="mt-4 ml-4 flex flex-col rounded-xl bg-white/10 p-2
                 text-white hover:bg-white/20"
                  >
                    Zie Facturen
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Index;
