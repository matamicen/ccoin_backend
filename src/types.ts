export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  email2: string;
}

export interface Sdgs {
  goal: number;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  serial: string;
  sdgs: number[];
  project_url: string;
  registry: number;
}
