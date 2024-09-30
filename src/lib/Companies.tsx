import { SiDell, SiHp, SiInfosys, SiTcs } from "react-icons/si";
import { FaAmazon, FaApple, FaFacebook, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const companies = [
  {
    value: "Google",
    logo: <FcGoogle className="mr-2 size-6" />,
  },
  {
    value: "Apple",
    logo: <FaApple className="mr-2 size-6" />,
  },
  {
    value: "Capgemini",
  },
  {
    value: "Microsoft",
    logo: <FaMicrosoft className="mr-2 size-6" />,
  },
  {
    value: "Meta",
    logo: <FaFacebook className="mr-2 size-6" />,
  },
  {
    value: "Amazon",
    logo: <FaAmazon className="mr-2 size-6" />,
  },
  {
    value: "hp",
    logo: <SiHp className="mr-2 size-6" />,
  },
  {
    value: "tcs",
    logo: <SiTcs className="mr-2 size-6" />,
  },
  {
    value: "dell",
    logo: <SiDell className="mr-2 size-6" />,
  },
  {
    value: "Infosys",
    logo: <SiInfosys className="mr-2 size-6" />,
  },
  {
    value: "Others",
  },
];

export default companies;
