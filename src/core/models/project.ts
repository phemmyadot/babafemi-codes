
export interface Project {
  id: string;
  title: string;
  description: string;
  repository: string;
}
export interface ProjectDTO extends Document {
  _id: string;
  title: string;
  description: string;
  repository: string;
}
