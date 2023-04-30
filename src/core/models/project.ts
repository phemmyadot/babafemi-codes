import { ObjectId } from "mongodb";

export interface Project {
  id: string;
  title: string;
  description: string;
  repository: string;
}
export interface ProjectDTO {
  _id?: ObjectId;
  title: string;
  description: string;
  repository: string;
}
