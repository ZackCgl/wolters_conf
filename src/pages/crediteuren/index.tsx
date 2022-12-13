import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { customersSoap } from "../../../soap/customersSoap";
import { REDIRECT_URL } from "../../../soap/redirect";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { OfficesSoap } from "../../../soap/officesSoap";
import PublicProcedure from "../../Components/PublicProcedure";
import autoAnimate from "@formkit/auto-animate";
import Footer from "../../Components/Footer";

function Crediteuren() {
  const [accesToken, setAccesToken] = useState<string>("");
  const [companyCode, setCompanyCode] = useState<string | any>();
  const [fullsplit, setFullSplit] = useState<string>("");
  const [suppliers, setSuppliers] = useState<string[]>(["Loading..."]);
  const router = useRouter();
  const parent = useRef(null);
  const [show, setShow] = useState(false);
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
    getCustomers();
    getCompanyCode();
  }, [accesToken, companyCode]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => {
    setShow(true);
  };

  const handleLogin = () => {
    window.location.replace(
      `https://login.twinfield.com/auth/authentication/connect/authorize?client_id=rubyf&redirect_uri=${REDIRECT_URL}&response_type=id_token+token&scope=openid+twf.user+twf.organisation+twf.organisationUser&state=SOME_RANDOM_STATE&nonce=SOME_RANDOM_NONCE`
    );
  };

  const handleLogout = () => {
    window.location.replace(REDIRECT_URL as string);
  };

  function getCustomers() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
      true
    );
    const sr = customersSoap({ accesToken, companyCode });
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const parser = new DOMParser();
          const el = parser.parseFromString(xmlhttp.responseText, "text/html");
          const Firstsuppliers: any = el.childNodes[1]?.textContent;

          const parseHtml = new DOMParser();
          const xmlDoc2 = parseHtml.parseFromString(Firstsuppliers, "text/xml");
          const suppliers = xmlDoc2.getElementsByTagName("dimensions")[0];
          const suppArray: any[] = [];
          for (let i = 0; i < 1000; i++) {
            const demension = suppliers?.getElementsByTagName("dimension")[i];
            suppArray.push(
              demension?.getElementsByTagName("name")[0]?.textContent
            );
          }

          setSuppliers(suppArray);
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
    const sr = OfficesSoap({ accesToken });
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const parser = new DOMParser();
          const el = parser.parseFromString(xmlhttp.responseText, "text/html");
          const offices: any = el.childNodes[1]?.textContent;

          const parseHtml = new DOMParser();
          const xmlDoc2 = parseHtml.parseFromString(offices, "text/xml");
          const XML_ROW = xmlDoc2.getElementsByTagName("offices")[0];
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
  return (
    <>
      <div className="flex flex-col">
        <div className="z-10">
          <Header
            activeCred={true}
            fullSplit={fullsplit}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            accesToken={accesToken}
          />
        </div>
        <main className="flex min-h-screen bg-gray-900">
          <div>
            <Sidebar fullSplit={fullsplit} />
          </div>
          <div ref={parent} className=" ml-8 mt-20 flex">
            {accesToken && (
              <div className="mt-4 flex text-white">
                <div>
                  {/*Data invoer zie oude template rubyapp*/}
                  <Link href={`/crediteuren/toevoegen#id_token=${fullsplit}`}>
                    <button
                      className="mt-4 mr-2 flex flex-col rounded-xl bg-white/10
              p-2 text-white hover:bg-white/20"
                    >
                      Crediteur Toevoegen
                    </button>
                  </Link>
                </div>
                {/*with acces*/}
                {accesToken && (
                  <div className="ml-6 w-full">
                    <p className="flex-col text-2xl font-bold text-white">
                      Crediteuren
                    </p>
                    <p className="drop  text-1xl mt-4 h-72 overflow-y-scroll rounded-md border border-purple-400 bg-gray-800 p-2 font-extralight text-white drop-shadow-md scrollbar-hide">
                      {suppliers?.map((sup: string, i: number) => {
                        return (
                          <div key={i}>
                            <p>{sup}</p>
                          </div>
                        );
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Crediteuren;
