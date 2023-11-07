import { Project, ProjectDTO } from "@/core/models/project";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = ({}) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get<ProjectDTO[]>("/api/projects").then((response) => {
      const _projects: Project[] = response.data.map((i) => {
        return {
          id: i._id?.toString() ?? "",
          title: i.title,
          description: i.description,
          repository: i.repository,
        };
      });
      setProjects(_projects);
    });
  }, []);

  return (
    <div id="projects" className=" min-h-[90vh] flex pb-20 sm:pb-10">
      <div className="slide-in-section transform transition translate-x-0 ease-in-out duration-500 m-auto">
        <h1 className="m-auto text-center text-2xl mb-4 font-medium">
          My Projects
        </h1>
        <p className="m-auto text-center mb-12">Things I’ve built so far</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map((p, i) => (
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden flex-col flex card"
              key={p.id}
            >
              <Image
                priority={true}
                width={400}
                height={400}
                className="w-full h-36 object-cover"
                src={`https://source.unsplash.com/random?nature,cloud,hills
              ${p.id}`}
                alt={p.title}
              />
              <div className="p-4 flex-col flex justify-between flex-1">
                <h2 className="text-lg font-medium capitalize">{p.title}</h2>
                <p className=" mt-2 text-sm flex-1">{p.description}</p>
                <div className="mt-4 flex text-right justify-end items-center">
                  <Image
                    priority={true}
                    width={50}
                    height={50}
                    className="h-4 w-4 object-cover mr-1"
                    src="./assets/github.svg"
                    alt={p.title}
                  />{" "}
                  <a
                    target="blank"
                    href={p.repository}
                    className="font-medium text-xs"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
