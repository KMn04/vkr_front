import type { ITicket } from "./Ticket";

export interface IProjectListItem {
  id: number;
  name: string;
  description: string;
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  tickets: ITicket[];
}

export interface ICreateProjectForm {
  title?: string;
  description?: string;
}


export interface ICreateProjectRequest {
  title: string;
  description?: string;
}

export interface IProjectWikiPage {
  id: number;
  title: string;
}