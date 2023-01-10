import { type NextPage } from "next";
import Head from "next/head";
import Header from "../Components/Header";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { OfficesSoap } from "../Components/data/officesSoap";
import { REDIRECT_URL } from "../Components/data/redirect";
import Sidebar from "../Components/Sidebar";
import PublicProcedure from "../Components/PublicProcedure";
import { RiArrowDropDownFill } from "react-icons/ri";
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Footer from "../Components/Footer";
import Link from "next/link";
import { trpc } from "../utils/trpc";

//DEV REDIRECT_URL

const Home = () => {
  const [accesToken, setAccesToken] = useState<string>("");
  const [fullsplit, setFullSplit] = useState<string>("");
  const [office, setOffice] = useState<string | null | undefined>("");
  const router = useRouter();
  const [show, setShow] = useState(false);
  const parent = useRef(null);
  const parentPage = useRef(null);
  const parentHeader = useRef(null);

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
    mutate_res();
  }, []);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
    parentPage.current && autoAnimate(parentPage.current);
    parentHeader.current && autoAnimate(parentHeader.current);
    getOffices();
  }, [accesToken]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
    parentPage.current && autoAnimate(parentPage.current);
  }, [parentPage, parent]);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
    parentPage.current && autoAnimate(parentPage.current);
  }, [parentPage, parent]);
  useEffect(() => {
    parentHeader.current && autoAnimate(parentHeader.current);
  }, [parentPage, parent, parentHeader]);

  const reveal = () => {
    setShow(!show);
  };

  const {
    mutate: mutate_res,
    data: data_res,
    isLoading: isLoadingItems,
  } = trpc.contact.getItems.useMutation();

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
          setOffice(
            XML_ROW?.getElementsByTagName("office")[0]?.attributes?.[0]
              ?.nodeValue
          );
        }
      }
    };
    // Send the POST request
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    xmlhttp.send(sr);
  }

  function getGreeting() {
    // Get the current hour
    const hour = new Date().getHours();

    // Return a greeting based on the current hour
    if (hour >= 0 && hour < 12) {
      return "Goedemorgen en welkom terug!";
    } else if (hour >= 12 && hour < 18) {
      return "Goedemiddag en welkom terug!";
    } else {
      return "Goedenavond en welkom terug!";
    }
  }

  return (
    <>
      <Head>
        <title>Ruby Finance App | Home</title>
        <meta name="description" content="Boekhouden voor iedereen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col">
        <div className="z-30" ref={parentHeader}>
          <Header
            activeDash={true}
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
          <div className="ml-8 mt-28 sm:flex lg:flex" ref={parentPage}>
            {accesToken && (
              <div className="flex">
                <div ref={parent}>
                  <p
                    onClick={reveal}
                    className="dropdown-label text-1xl flex cursor-pointer rounded-lg bg-gradient-to-r from-[#496adc] to-[#c57bfe]  p-2 font-semibold text-white"
                  >
                    Selecteer administratie
                    <RiArrowDropDownFill className="h-7 w-7" />
                  </p>
                  {show && (
                    <p className="dropdown-content text-1xl mt-1 flex font-normal text-white ">
                      {office}
                    </p>
                  )}
                </div>

                <div className="mr-4 flex flex-col lg:ml-4">
                  <div className="mt-14 text-2xl font-bold text-white">
                    {getGreeting()}
                  </div>

                  <div
                    className="mt-8 max-w-sm rounded-lg border border-gray-200  shadow-md 
            dark:border-gray-700 "
                  >
                    <div className="p-5">
                      <a href="#">
                        <h5
                          className="mb-2 text-2xl font-bold tracking-tight text-gray-900
                     dark:text-white"
                        >
                          Ruby Finance App 2023
                        </h5>
                      </a>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Benieuwd naar alle functies van de app? Ga direct naar
                        de meest gestelde vragen.
                      </p>
                      <Link href="/faq">
                        <p
                          className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-[#496adc] to-[#c57bfe] p-4 text-white 
                "
                        >
                          Ga naar FAQ
                          <svg
                            aria-hidden="true"
                            className="ml-2 -mr-1 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 
                    1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 
                    1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="hidden flex-col text-white lg:ml-80 lg:mt-20 lg:flex">
                  {data_res?.map((article: any, index: number) => {
                    return (
                      <div key={index} className="mt-6 -ml-0 lg:-ml-40">
                        <Link
                          href={`https://rubyfinance.nl/blogs/${article.fields.title}`}
                        >
                          <div className="flex">
                            <div className="w-4/6">
                              <div className="flex">
                                <img
                                  src={article?.fields.profile.fields.file.url}
                                  alt="blog_banner"
                                  className="h-6 w-6 rounded-full object-cover "
                                />
                                <p className=" ml-2 font-semibold">
                                  {article.fields.author}
                                </p>
                              </div>
                              <div className="">
                                <h3 className="text-md mt-2 font-extrabold">
                                  {article.fields.title}
                                </h3>
                              </div>
                            </div>

                            <div className="w-2/6">
                              <img
                                src={article.fields.image.fields.file.url}
                                alt="blog_banner_nieuw"
                                className="ml-6 h-14 w-14 rounded-md object-cover "
                              />
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {!accesToken && <PublicProcedure handleLogin={handleLogin} />}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
