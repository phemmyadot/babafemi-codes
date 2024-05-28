import Image from "next/image";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-white py-3 shadow fixed bottom-0 w-full">
      <div className="container mx-auto px-4">
        <div className="space-x-4 flex justify-center">
          <a
            href="https://www.linkedin.com/in/babafemi-adojutelegan/"
            className="  flex items-center"
          >
            <Image
              priority={true}
              width={50}
              height={50}
              className="h-3.5 w-3.5 object-cover mr-1"
              src="/assets/linkedin.svg"
              alt="github"
            />
            LinkedIn
          </a>
          <a
            href="https://github.com/phemmyadot"
            className=" flex items-center"
          >
            <Image
              priority={true}
              width={50}
              height={50}
              className="h-4 w-4 object-cover mr-1"
              src="/assets/github.svg"
              alt="github"
            />
            GitHub
          </a>
          <a
            href="https://babafemi-adojutelegan.hashnode.dev/"
            className=" flex items-center"
          >
            <Image
              priority={true}
              width={50}
              height={50}
              className="h-4 w-4 object-cover mr-1"
              src="/assets/hashnode.svg"
              alt="hashnode"
            />
            Hashnode
          </a>
        </div>
        <div className="mt-2 text-center text-gray-400">
          &copy; 2023 Babafemi Codes. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
