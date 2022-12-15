import { FiSettings } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Link from "next/link";

interface Props {
  fullSplit: string | undefined;
  activeIns?: boolean;
  activeFaq?: boolean;
}

function Sidebar({ fullSplit, activeIns, activeFaq }: Props) {
  return (
    <div className="w-10 font-bold text-white">
      <Link href={`/faq/#id_token=${fullSplit}`}>
        <AiOutlineQuestionCircle
          className={`fixed bottom-12 left-4 h-7 w-7 cursor-pointer 
          hover:text-purple-500 ${
            activeFaq ? "text-purple-500" : "text-white"
          }`}
        />
      </Link>
      <Link href={`/instellingen/#id_token=${fullSplit}`}>
        <FiSettings
          className={`fixed bottom-4 left-4 h-7 w-7 cursor-pointer 
          hover:text-purple-500 ${
            activeIns ? "text-purple-500" : "text-white"
          }`}
        />
      </Link>
    </div>
  );
}

export default Sidebar;
