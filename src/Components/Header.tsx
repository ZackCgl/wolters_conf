import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  fullSplit: string | undefined;
  handleLogin: () => void;
  handleLogout: () => void;
  accesToken: string;
  activeDash?: boolean;
  activeFac?: boolean;
  activeCred?: boolean;
  activeRel?: boolean;
  activeOff?: boolean;
  activeRapp?: boolean;
  activeBank?: boolean;
  activeAgenda?: boolean;
}

function Header({
  fullSplit,
  handleLogin,
  handleLogout,
  accesToken,
  activeDash,
  activeFac,
  activeCred,
  activeRel,
  activeOff,
  activeRapp,
  activeBank,
  activeAgenda,
}: Props) {
  const [toggle, setToggle] = useState(false);
  const handleMobile = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <nav className="fixed h-14 w-screen border-gray-200 px-2 py-2.5 backdrop-blur-sm sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between ">
          <Link href={`/#id_token=${fullSplit}`}>
            {" "}
            <Image
              className="ml-4 cursor-pointer"
              src="https://i.imgur.com/S67aq4a.png"
              alt="ruby_logo"
              height={100}
              width={80}
            />
          </Link>

          <button
            onClick={handleMobile}
            type="button"
            className=" ml-3 inline-flex items-center rounded-lg p-2 text-sm lg:hidden "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-10 w-10 text-white hover:text-indigo-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          {toggle && (
            <div className=" w-full lg:hidden" id="navbar-default">
              <ul className="z-10 mt-4 flex flex-col justify-center rounded-lg bg-gradient-to-b from-[#5a6cf4fc] to-[#313b7afa] p-4 md:space-y-3 ">
                {!accesToken && (
                  <button
                    onClick={() => handleLogin()}
                    className="mb-4 mt-4 ml-2 flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                  >
                    Inloggen
                  </button>
                )}
                {accesToken && (
                  <button
                    onClick={() => handleLogout()}
                    className="mb-4 mt-4 ml-2 flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                  >
                    Sign Out
                  </button>
                )}

                <li>
                  <Link href={`/#id_token=${fullSplit}`}>
                    <p
                      className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                        activeDash ? "text-gray-400" : "text-white"
                      } `}
                      aria-current="page"
                    >
                      Dashboard
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href={`/facturen#id_token=${fullSplit}`}>
                    <p
                      className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                        activeFac ? "text-gray-400" : "text-white"
                      } `}
                    >
                      Facturen
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href={`/crediteuren#id_token=${fullSplit}`}>
                    <p
                      className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                        activeCred ? "text-gray-400" : "text-white"
                      } `}
                    >
                      Crediteuren
                    </p>
                  </Link>
                </li>
                <li>
                  <Link href={`/relaties#id_token=${fullSplit}`}>
                    <p
                      className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                        activeRel ? "text-gray-400" : "text-white"
                      } `}
                    >
                      Relaties
                    </p>
                  </Link>
                </li>
                <li>
                  <p className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                    Offertes
                  </p>
                </li>
                <li>
                  <Link href={`/producten#id_token=${fullSplit}`}>
                    <p className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                      Producten
                    </p>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  >
                    Rapportages
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  >
                    Kennisbank
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  >
                    Agenda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0  md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          )}
          <div className="hidden p-4 lg:flex" id="navbar-default">
            <ul className="z-10 flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-black font-bold md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:backdrop-blur-sm lg:text-sm xl:text-lg">
              {accesToken && (
                <li>
                  <Link href={`/#id_token=${fullSplit}`}>
                    <p
                      className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                        activeDash ? "text-gray-400" : "text-white"
                      } `}
                      aria-current="page"
                    >
                      Dashboard
                    </p>
                  </Link>
                </li>
              )}
              {accesToken && (
                <li>
                  <Link href={`/facturen#id_token=${fullSplit}`}>
                    <p
                      className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                        activeFac ? "text-gray-400" : "text-white"
                      } `}
                    >
                      Facturen
                    </p>
                  </Link>
                </li>
              )}
              {accesToken && (
                <li>
                  <Link href={`/crediteuren#id_token=${fullSplit}`}>
                    <p
                      className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                        activeCred ? "text-gray-400" : "text-white"
                      } `}
                    >
                      Crediteuren
                    </p>
                  </Link>
                </li>
              )}
              {accesToken && (
                <li>
                  <Link href={`/relaties#id_token=${fullSplit}`}>
                    <p
                      className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                        activeRel ? "text-gray-400" : "text-white"
                      } `}
                    >
                      Relaties
                    </p>
                  </Link>
                </li>
              )}
              {accesToken && (
                <li>
                  <a
                    href="#"
                    className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                      activeOff ? "text-gray-400" : "text-white"
                    } `}
                  >
                    Offertes
                  </a>
                </li>
              )}
              {accesToken && (
                <li>
                  <Link href={`/producten#id_token=${fullSplit}`}>
                    <p
                      className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                        activeBank ? "text-gray-400" : "text-white"
                      } `}
                    >
                      Producten
                    </p>
                  </Link>
                </li>
              )}
              {accesToken && (
                <li>
                  <a
                    href="#"
                    className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                      activeRapp ? "text-gray-400" : "text-white"
                    } `}
                  >
                    Rapportages
                  </a>
                </li>
              )}
              {accesToken && (
                <li>
                  <a
                    href="#"
                    className={`block rounded py-2 pl-3  pr-4 md:bg-transparent md:p-0 ${
                      activeAgenda ? "text-gray-400" : "text-white"
                    } `}
                  >
                    Agenda
                  </a>
                </li>
              )}
              <li>
                {!accesToken && (
                  <button
                    onClick={() => handleLogin()}
                    className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-2 text-white hover:bg-white/20"
                  >
                    Inloggen
                  </button>
                )}
                {accesToken && (
                  <button
                    onClick={() => handleLogout()}
                    className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-2 text-white hover:bg-white/20"
                  >
                    Sign Out
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
