import type { ITicket } from "./Ticket";

export interface IProjectListItem {
  projectId: number;
  name: string;
  description: string;
}

export interface IProject {
  projectId: number;
  name: string;
  description: string;
  budget?: string;
  currencyCode?: number;
  dateFinish?: string;
  dateStart?: string;
  ownerId: number;
  roleCode: number;
  statusCode: number;
  sumHoursFact?: number;
  sumHoursPlan?: number;
}

export interface ICreateProjectForm {
  title?: string;
  description?: string;
}


export interface ICreateProjectRequest {
  name: string;
  description?: string;
}

export interface IProjectWikiPage {
  id: number;
  title: string;
  content?: string;
}

export interface IProjectEmployee {
  userId: number;
  firstName: string;
  secondName: string;
  role: string;
}

export interface IProjectMemberUser {
  userId: number;
  firstName: string;
  secondName: string;
  login: string;
  email: string;
}

export interface IProjectMember {
  userId: number;
  user: IProjectMemberUser;
  roleCode: number;
  roleName: string
}

export interface IProjectUpdate {
  name: string,
  description: string
}
