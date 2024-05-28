import { Collection, Db, ObjectId } from "mongodb";
import clientPromise from ".";
import { Project, ProjectDTO } from "../models/project";

let client;
let db: Db;
let projects: Collection<ProjectDTO>;

const init = async () => {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db(process.env.DB_NAME);
    projects = await db.collection("projects");
  } catch (err) {
    throw new Error("Failed to establish connect to db");
  }
};

(async () => {
  await init();
})();

export const getProjects = async () => {
  try {
    if (!projects) await init();
    const result = await projects
      .find()
      .map((project) => ({ ...project, _id: project._id.toString() }))
      .toArray();
    return { projects: result };
  } catch (error) {
    return {
      error: "Failed to fetch projects",
    };
  }
};

export const addProject = async (project: ProjectDTO) => {
  try {
    const result = await projects.insertOne(project);
    return { projects: result };
  } catch (error) {
    return {
      error: "Failed to fetch projects",
    };
  }
};
