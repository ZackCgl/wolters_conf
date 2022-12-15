import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { REDIRECT_URL } from "../../Components/data/redirect";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { productsSoap } from "../../Components/data/productsSoap";
import { OfficesSoap } from "../../Components/data/officesSoap";
import { addInvoicesSoap } from "../../Components/data/addInvoiceSoap";
import { relatiesSoap } from "../../Components/data/relatiesSoap";
import PublicProcedure from "../../Components/PublicProcedure";
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Link from "next/link";
import Footer from "../../Components/Footer";

function Aanmaken() {
  const [accesToken, setAccesToken] = useState<string>("");
  const [companyCode, setCompanyCode] = useState<any>();
  const [fullsplit, setFullSplit] = useState<string>("");
  const [relations, setRelations] = useState<string[]>([""]);
  const router = useRouter();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isClickedProductsButton, setIsClickedProductsButton] =
    useState<boolean>(false);
  const [chosenCustomer, setChosenCustomer] = useState<string>("");
  const [products, setProducts] = useState<any>("");
  const [soapProducts, setSoapProducts] = useState<any>("");
  const [soapName, setSoapName] = useState<any>("");
  const [producten, setProducten] = useState<any>([]);
  const [units, setUnits] = useState<any>([]);
  const [exbtw, setExbtw] = useState<any>([]);
  const [incbtw, setInc] = useState<any>([]);
  const [grootboek, setGrootboek] = useState<any>([]);
  const [vatcode, setVatcode] = useState<any>([]);
  const [show, setShow] = useState(false);
  const parent = useRef(null);
  const parentDebiteuren = useRef(null);
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
    parentDebiteuren.current && autoAnimate(parentDebiteuren.current);
    parentPage.current && autoAnimate(parentPage.current);
    getCompanyCode();
  }, [accesToken, companyCode]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
    parentDebiteuren.current && autoAnimate(parentDebiteuren.current);
    parentPage.current && autoAnimate(parentPage.current);
  }, [parent, parentDebiteuren, parentPage]);

  const reveal = () => {
    setShow(!show);
  };
  const handleLogin = () => {
    window.location.replace(
      `https://login.twinfield.com/auth/authentication/connect/authorize?client_id=rubyf&redirect_uri=${REDIRECT_URL}&response_type=id_token+token&scope=openid+twf.user+twf.organisation+twf.organisationUser&state=SOME_RANDOM_STATE&nonce=SOME_RANDOM_NONCE`
    );
  };

  const handleLogout = () => {
    window.location.replace(REDIRECT_URL as string);
  };

  function addInvoices() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
      true
    );
    const sr = addInvoicesSoap({ accesToken, companyCode, chosenCustomer });
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const parser = new DOMParser();
          const el = parser.parseFromString(xmlhttp.responseText, "text/html");
          if (!el) console.log("error with the document");
          router.push(`/facturen/#id_token=${fullsplit}`);
          console.log("factuur aangemaakt");
          console.log(el);
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

  function getRelaties() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
      true
    );
    const sr = relatiesSoap({ accesToken, companyCode });
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const parser = new DOMParser();
          const el = parser.parseFromString(xmlhttp.responseText, "text/html");
          const firstRelaties: any = el.childNodes[1]?.textContent;

          const parseHtml = new DOMParser();
          const xmlDoc2 = parseHtml.parseFromString(firstRelaties, "text/xml");
          const relaties: any = xmlDoc2.getElementsByTagName("dimensions")[0];
          console.log(relaties);
          const suppArray: any = [];
          for (let i = 0; i < 500; i++) {
            const demension: any =
              relaties.getElementsByTagName("dimension")[i];
            suppArray.push(
              demension?.getElementsByTagName("code")[0]?.textContent
            );
            suppArray.push(
              demension?.getElementsByTagName("name")[0]?.textContent
            );
            suppArray.push("//");
          }

          const added = suppArray.filter((e: string) => e !== "DEB"); // will return ['A', 'C']
          const added2 = added.join(" ").split("//");
          setRelations(added2);
          console.log(suppArray.join(" ").split("//"));
        }
      }
    };
    // Send the POST request
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    xmlhttp.send(sr);
  }

  function getProducts() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://api.accounting.twinfield.com/webservices/processxml.asmx?wsdl",
      true
    );
    const sr = productsSoap({ accesToken, companyCode, products });
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const parser = new DOMParser();
          const el = parser.parseFromString(xmlhttp.responseText, "text/html");

          const firstRelaties: any = el.childNodes[1]?.textContent;

          const parseHtml = new DOMParser();
          const xmlDoc2 = parseHtml.parseFromString(firstRelaties, "text/xml");
          const suppliers: any = xmlDoc2.getElementsByTagName("article")[0];
          console.log(suppliers);
          const demension: any = suppliers.getElementsByTagName("header")[0];
          const lines: any = suppliers.getElementsByTagName("lines")[0];

          {
            /*producten */
          }
          const supArrayPro: any = [];
          for (let i = 0; i < 100; i++) {
            const line: any = lines.getElementsByTagName("line")[i];

            supArrayPro.push(
              line?.getElementsByTagName("name")[0]?.textContent
            );
          }
          setProducten(supArrayPro);
          {
            /*units */
          }
          const supArrayUn: any = [];
          for (let i = 0; i < 100; i++) {
            const line: any = lines.getElementsByTagName("line")[i];

            supArrayUn.push(
              line?.getElementsByTagName("units")[0]?.textContent
            );
          }
          setUnits(supArrayUn);

          {
            /*vatcode */
          }
          const vatcode: any = [];
          for (let i = 0; i < 100; i++) {
            const line: any = demension.getElementsByTagName("line")[i];
            vatcode.push(line?.getElementsByTagName("vatcode")[0]?.textContent);
          }
          setVatcode(vatcode);

          {
            /*exbtw */
          }
          const supArrayUnitspriceexcl: any = [];
          for (let i = 0; i < 100; i++) {
            const line: any = lines.getElementsByTagName("line")[i];

            supArrayUnitspriceexcl.push(
              line?.getElementsByTagName("unitspriceexcl")[0]?.textContent
            );
          }
          setExbtw(supArrayUnitspriceexcl);

          {
            /*incBtw */
          }
          const supArrayUnitspriceinc: any = [];
          for (let i = 0; i < 100; i++) {
            const line: any = lines.getElementsByTagName("line")[i];

            supArrayUnitspriceinc.push(
              line?.getElementsByTagName("unitspriceinc")[0]?.textContent
            );
          }
          setInc(supArrayUnitspriceinc);

          {
            /*incBtw */
          }
          const supArrayGrootboek: any = [];
          for (let i = 0; i < 100; i++) {
            const line: any = lines.getElementsByTagName("line")[i];

            supArrayGrootboek.push(
              line?.getElementsByTagName("freetext1")[0]?.textContent
            );
          }
          setGrootboek(supArrayGrootboek);

          const totals: any = suppliers.getElementsByTagName("code")[0];
          const name: any = demension.getElementsByTagName("name")[0];
          const vatcode1: any = demension.getElementsByTagName("vatcode")[0];

          if (!totals) {
            setSoapProducts("Geen product gevonden ");
          } else {
            setSoapProducts(totals.textContent);
            setSoapName(name.textContent);
            setVatcode(vatcode1.textContent);
            setIsClickedProductsButton(false);
          }
        }
      }
    };
    // Send the POST request
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    xmlhttp.send(sr);
  }

  function selectCustomers() {
    reveal();
    getRelaties();
  }

  function selectProducts() {
    setIsClickedProductsButton(!isClickedProductsButton);
  }

  function searchProducts() {
    getProducts();
  }

  return (
    <>
      <div className="flex flex-col">
        <Header
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
            {accesToken ? (
              <div className="text-white">
                <p className="flex-col text-3xl font-bold">Aanmaken</p>
                <div>
                  <div className="flex">
                    <div ref={parentDebiteuren}>
                      <button
                        onClick={selectCustomers}
                        className="dropdown-label mt-4 flex flex-col rounded-xl bg-white/10 p-1.5
                  text-white hover:bg-white/20"
                      >
                        Selecteer Relatie
                      </button>
                      {show && (
                        <div className=" text-1xl h-40 overflow-y-scroll font-extralight text-white scrollbar-hide">
                          {relations?.map((sup: any, i: any) => {
                            return (
                              <div className="" key={i}>
                                <p
                                  onClick={() => {
                                    setChosenCustomer(sup);
                                    setShow(false);
                                  }}
                                  className="dropdown-content cursor-pointer hover:font-semibold"
                                >
                                  {sup}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div>
                      <Link href={`/relaties/toevoegen#id_token=${fullsplit}`}>
                        <button
                          className="dropdown-label ml-2 mt-4 flex flex-col rounded-xl bg-white/10 p-1.5
                 text-white hover:bg-white/20"
                        >
                          Relatie toevoegen
                        </button>
                      </Link>
                    </div>
                  </div>
                  {chosenCustomer}
                  <div className="flex">
                    <div ref={parent}>
                      <button
                        onClick={selectProducts}
                        className="dropdown-label mt-4 flex flex-col rounded-xl bg-white/10 p-1.5
                 text-white hover:bg-white/20"
                      >
                        Selecteer product
                      </button>
                      {isClickedProductsButton && (
                        <div className="flex items-center">
                          <input
                            placeholder='"12345"'
                            className="dropdown-content mt-2 ml-2 h-7 w-16 rounded-md text-black placeholder-slate-500"
                            value={products}
                            onChange={(e) => setProducts(e.target.value)}
                          />
                          <button
                            onClick={searchProducts}
                            className="ml-2 mt-2 flex flex-col rounded-xl bg-white/10 p-1.5
                 text-white hover:bg-white/20"
                          >
                            Zoek
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <Link href={`/producten/aanmaken#id_token=${fullsplit}`}>
                        <button
                          className="dropdown-label ml-2 mt-4 flex flex-col rounded-xl bg-white/10 p-1.5
                 text-white hover:bg-white/20"
                        >
                          Product toevoegen
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="">
                    <div className="mt-4 grid grid-cols-2 lg:mt-2 lg:grid-cols-8">
                      <div className="p-2">
                        <label>Code</label>
                        <p>{soapProducts}</p>
                      </div>
                      <div className="p-2">
                        <label>Naam</label>
                        <p>{soapName}</p>
                      </div>
                      <div className="p-2">
                        <label>Producten</label>
                        <p>
                          {producten?.map((line: any, i: number) => {
                            return <div key={i}>{line}</div>;
                          })}
                        </p>
                      </div>
                      <div className="p-2">
                        <label>Eenheden</label>
                        <p>
                          {units?.map((unit: any, i: number) => {
                            return <div key={i}>{unit}</div>;
                          })}
                        </p>
                      </div>
                      <div className="p-2">
                        <label>Vatcode</label>
                        <p>{vatcode}</p>
                      </div>
                      <div className="p-2">
                        <label>Ex. btw</label>
                        <p>
                          {exbtw?.map((ex: any, i: number) => {
                            return <div key={i}>{ex}</div>;
                          })}
                        </p>
                      </div>
                      <div className="p-2">
                        <label>Inc. btw</label>
                        <p>
                          {incbtw?.map((inc: any, i: number) => {
                            return <div key={i}>{inc}</div>;
                          })}
                        </p>
                      </div>
                      <div className="p-2">
                        <label>Grootboek</label>
                        <p>
                          {grootboek?.map((grootboek: any, i: number) => {
                            return <div key={i}>{grootboek}</div>;
                          })}
                        </p>
                      </div>
                      <div className="p-2">
                        <label>Totaal</label>
                        <p>TBC</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={addInvoices}
                    className="mt-4 flex flex-col rounded-xl bg-purple-800 p-2
                 text-white hover:bg-purple-900"
                  >
                    Create Invoice
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Aanmaken;
