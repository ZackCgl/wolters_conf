import { BsArrowRight } from "react-icons/bs";

interface Props {
  handleLogin: () => void;
}

function PublicProcedure({ handleLogin }: Props) {
  return (
    <div className=" mt-10 grid grid-cols-1 items-center lg:grid-cols-2 ">
      <div className="container mr-4 flex flex-col py-16 font-medium text-white lg:mt-10 ">
        <h1 className="md:5xl text-4xl lg:text-5xl xl:text-7xl">
          Het beheren van{" "}
        </h1>
        <h1 className="md:5xl text-4xl lg:text-5xl xl:text-7xl">
          uw financiën is
        </h1>
        <h1 className="md:5xl text-4xl lg:text-5xl xl:text-7xl">
          een fluitje van een cent
        </h1>
        <div className="lg:ml-1">
          <p className="md:text-1xl mt-4 font-light lg:text-2xl">
            Vereenvoudig uw boekhoudproces en maak meer tijd vrij voor uw
            bedrijf.
          </p>
          <p className="md:text-1xl font-light lg:text-2xl">
            Met onze tool regel je snel je declaraties, facturen en andere
            financiële documenten
          </p>
        </div>
        <div>
          <button
            type="button"
            className="mt-6 flex items-center rounded-xl bg-purple-600 p-5 text-white hover:bg-purple-700"
            onClick={handleLogin}
          >
            Neem Ruby gratis <BsArrowRight className="ml-2" />
          </button>
        </div>
      </div>
      <div className="-ml-10 min-h-screen items-center justify-center lg:z-10 lg:flex">
        <div className="relative w-full max-w-lg">
          <div className="absolute top-0 -left-4 h-10 w-10 animate-blob rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl filter lg:h-72 lg:w-72"></div>
          <div className="animation-delay-2000 absolute top-0 -right-4 h-10 w-10 animate-blob rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter lg:h-72 lg:w-72"></div>
          <div className="animation-delay-4000 absolute -bottom-8 left-20 h-10 w-10 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter lg:h-72 lg:w-72"></div>
          <div className="relative m-8 space-y-4">
            <div className="flex items-center justify-between space-x-8 rounded-lg bg-white p-5">
              <div className="flex-1">
                <div className="w-38 h-8 items-center rounded bg-gray-100 lg:w-48">
                  <p className="p-1 font-medium text-black">
                    Facturen aanmaken
                  </p>
                </div>
              </div>
              <div>
                <div className="h-6 w-24 rounded-lg bg-purple-300"></div>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-8 rounded-lg bg-white p-5">
              <div className="flex-1">
                <div className="h-8 items-center rounded bg-gray-100 lg:w-56">
                  <p className="p-1 font-medium text-black">
                    Bonnetjes uploaden
                  </p>
                </div>
              </div>
              <div>
                <div className="h-6 w-20 rounded-lg bg-yellow-300"></div>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-8 rounded-lg bg-white p-5">
              <div className="flex-1">
                <div className="h-8 items-center rounded bg-gray-100 lg:w-48">
                  <p className="p-1 font-medium text-black">
                    Statistieken bekijken
                  </p>
                </div>
              </div>
              <div>
                <div className="h-6 w-20 rounded-lg bg-pink-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:h-full">
        <div>
          <div className="-mt-10 -ml-20 h-4 w-4 animate-blop rounded-full bg-purple-200 opacity-80 mix-blend-multiply blur-xl filter hover:opacity-80 hover:transition lg:h-96 lg:w-96"></div>
          <div className="md:hidden">
            <div className="absolute -mt-96 mr-4 text-white">
              <p className="-mt-20 text-gray-500 dark:text-gray-400">
                Onze online boekhoudapplicatie is ontworpen om het gemakkelijker
                dan ooit te maken om uw financiën te beheren en de baas te
                blijven over uw bedrijf. Met onze krachtige functies kunt u uw
                facturen uploaden en opslaan, en gemakkelijk facturen maken en
                verzenden naar uw klanten.
              </p>
              <blockquote className="my-4 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-gray-800">
                <p className="text-xl font-medium italic leading-relaxed text-gray-900 dark:text-white">
                  Dit betekent dat u uw inkomsten en uitgaven kunt bijhouden en
                  uw boekhouding georganiseerd kunt houden, allemaal op één
                  handige plek.
                </p>
              </blockquote>
              <p className="text-gray-500 dark:text-gray-400">
                Bovendien maakt onze gebruiksvriendelijke interface het voor
                iedereen gemakkelijk om te gebruiken, ongeacht uw
                ervaringsniveau. Laat het beheer van uw financiën u niet
                stressen - probeer vandaag nog onze online boekhoudtoepassing en
                zie hoe deze u kan helpen de controle over uw bedrijf te
                krijgen.
              </p>
            </div>
            <div className="py-52"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProcedure;
