import Image from "next/image";

interface TechStackProps {}

const TechStack: React.FC<TechStackProps> = ({}) => {
  const skills = [
    "javascript",
    "typescript",
    "angular",
    "vue-js",
    "react-js",
    "next-js",
    "nuxt",
    "react-native",
    "flutter",
    "dart",
    "ionic",
    "nodejs",
    "express-js",
    "aws",
    "aws-iam",
    "aws-rds",
    "lambda",
    "dynamodb",
    "firebase",
    "csharp",
    "xamarin",
    "dotnet",
    "graphql",
    "mongodb",
    "firestore",
    "html-5",
    "css3",
    "bootstrap",
    "material-ui",
    "bulma",
    "tailwind",
  ];
  return (
    <div className="slide-in-section transform transition translate-x-0 ease-in-out duration-500 py-[60px] pb-[105px] ">
      <h1 className="m-auto text-center text-2xl mb-4 font-medium">
        My Tech Stack
      </h1>
      <p className="m-auto text-center mb-[100px]">
        Technologies I’ve been working with recently
      </p>
      <div className="flex flex-wrap">
        {skills.map((s, i) => (
          <Image
            priority={true}
            key={i}
            width={60}
            height={60}
            src={`./assets/${s}.svg`}
            alt={s}
            className="m-4 h-[50px] md:h-[60px] w-[50px] md:w-[60px]"
          />
        ))}
      </div>
    </div>
  );
};

export default TechStack;
