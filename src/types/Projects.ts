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
  wikiPageId: string;
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
  projectName?: string;
  projectTeamMemberId: number;
  projectMember: string;
  roleCode: number;
  roleName?: string;
  roleDescription?: string
}

export interface IProjectTask {
  taskId: number;
  name: string;
  description?: string;
  authorId: number;
  author?: string;
  assigneeId: number;
  assignee?: string;
  supervizorId: number;
  supervizor?: string;
  dateFinishFact?: string;
  dateFinishPlan?: string;
  dateStartPlan?: string;
  dateStartFact?: string;
  priorityCode: number;
  priority?: string;
  typeCode: number;
  type?: string;
  statusCode: number;
  status?: string;
  sumHoursFact?: number;
  sumHoursPlan?: number;
  projectId?: number;
  project?: string;
}

export interface IProjectUpdate {
  name: string,
  description: string
}
