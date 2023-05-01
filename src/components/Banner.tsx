import Image from "next/image";
import Typewriter from "./Typewriter";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div 
      id="header"
      className="flex justify-center md:justify-between  h-[90vh] items-center flex-wrap">
      <div className="order-2 md:order-1 w-full md:w-auto h-[100px]">
        <Typewriter />
      </div>
      <div className="w-full md:w-auto order-1 md:order-2">
        <div className="border-4 border-[#00C0FD] rounded-full w-max h-max mb-4 md:mb-auto mx-auto">
          <Image
          priority={true}
            src="/assets/avatar.jpg"
            alt="My Image"
            className=" rounded-full h-[150px] w-[150px] md:h-[300px] md:w-[300px] border-2 
        border-[#42446E]"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
