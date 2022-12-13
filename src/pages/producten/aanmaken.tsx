import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { REDIRECT_URL } from "../../../soap/redirect";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { addRelatiesSoap } from "../../../soap/addRelatiesSoap";
import { OfficesSoap } from "../../../soap/officesSoap";
import PublicProcedure from "../../Components/PublicProcedure";
import Footer from "../../Components/Footer";

function Toevoegen() {
  const [accesToken, setAccesToken] = useState<string>("");
  const [companyCode, setCompanyCode] = useState<any>();
  const [fullsplit, setFullSplit] = useState<string>("");
  const [succesfullAddedRelatie, setSuccesFullAddedRelatie] =
    useState<boolean>(false);
  const router = useRouter();
  const [naam, setNaam] = useState("");

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
    getCompanyCode();
  }, [accesToken, companyCode, succesfullAddedRelatie]);

  const handleLogin = () => {
    window.location.replace(
      `https://login.twinfield.com/auth/authentication/connect/authorize?client_id=
              rubyf&redirect_uri=${REDIRECT_URL}&response_type=id_token+token&scope=openid+
              twf.user+twf.organisation+twf.organisationUser&state=SOME_RANDOM_STATE&nonce=SOME_RANDOM_NONCE`
    );
  };

  const handleLogout = () => {
    window.location.replace(REDIRECT_URL as string);
  };

  function addRelatie() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
      true
    );
    const sr = addRelatiesSoap({ accesToken, companyCode, naam });
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          setSuccesFullAddedRelatie(!succesfullAddedRelatie);
          setNaam("");
          router.push(`/relaties/#id_token=${fullsplit}`);
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
  return (
    <>
      <div className="flex flex-col">
        <div className="z-10">
          <Header
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
          <div className="ml-8 mt-20 flex">
            {/*---PROTECTED PROCEDURE---*/}
            {accesToken && (
              <div className="flex flex-col text-white">
                <div>
                  <p className="flex-col text-3xl font-bold text-white">
                    Product toevoegen
                  </p>
                </div>

                <div className="mt-4">
                  <label className="mr-2 font-bold">Naam:</label>
                  <input
                    className="rounded-md font-bold 
                  text-black"
                    value={naam}
                    onChange={(e) => setNaam(e.target.value)}
                  />
                  <button
                    className="mt-4 flex flex-col rounded-xl bg-white/10 p-2 
                  text-white hover:bg-white/20"
                    onClick={addRelatie}
                  >
                    Add Product
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

export default Toevoegen;
