import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

interface Props {
  handleLogin: () => void;
}

function PublicProcedure({ handleLogin }: Props) {
  return (
    <div className=" mt-10 grid grid-cols-1 items-center lg:grid-cols-2 ">
      <div className="container flex flex-col py-16 font-medium text-white lg:mt-10 ">
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
          <Link href="https://rubyfinance.nl/">
            <button
              type="button"
              className="mt-6 flex items-center rounded-xl bg-gradient-to-r from-[#496adc] to-[#c57bfe] p-5 text-white "
            >
              Neem Ruby Direct <BsArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute">
        <div>
          <div className="-mt-10 -ml-20 h-96 w-96 animate-blop rounded-full bg-purple-200 opacity-80 mix-blend-multiply blur-xl filter hover:opacity-80 hover:transition"></div>
        </div>
      </div>
    </div>
  );
}

export default PublicProcedure;
