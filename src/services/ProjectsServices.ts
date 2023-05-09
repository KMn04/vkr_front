import type { ICreateProjectRequest, IProject, IProjectListItem, IProjectMember, IProjectUpdate, IProjectWikiPage } from '../types/Projects';
import { ApiConnection } from './ApiConnection';

const mockProjects: IProjectListItem[] = [{
  projectId: 1,
  name: 'Project1',
  description: 'simple description'
}, {
  projectId: 2,
  name: 'Project2',
  description: 'simple description'
}, {
  projectId: 3,
  name: 'Project3',
  description: 'simple description'
}, {
  projectId: 4,
  name: 'Project4',
  description: 'simple description'
}, {
  projectId: 5,
  name: 'Project5',
  description: 'simple description'
}]

const mockProject: IProject = {
  budget: undefined,
  currencyCode: undefined,
  dateFinish: undefined,
  dateStart: undefined,
  description: "simple description",
  name: "projectPipka",
  ownerId: 2,
  projectId: 3,
  roleCode: 1,
  statusCode: 1,
  sumHoursFact: undefined,
  sumHoursPlan: undefined
};

class ProjectsService {
  static get RoutePrefix(): string {
    return 'projects';
  }

  static async getProject(id: number): Promise<IProject> {
    try {
      const response = await ApiConnection.get(this.RoutePrefix + '/' + id);
      return response.data;
    } catch {
      return mockProject;
    }
  }


  static async getProjectMembers(id: number): Promise<IProjectMember[]> {
    const response = await ApiConnection.get(`${this.RoutePrefix}/${id}/members`);
    return response.data;
  }


  /**
   * Получение проектов с бэка
  */
  static async getProjects(): Promise<IProjectListItem[]> {
    try {
      const response = await ApiConnection.get(this.RoutePrefix);

      return response.data;
    } catch {
      return mockProjects
    }
  }

  static async create(request: ICreateProjectRequest): Promise<{ id: number }> {
    try {
      const response = await ApiConnection.post(this.RoutePrefix, request)
      return response.data;
    } catch {
      return {
        id: 5
      }
    }
  }

  static async update(projectId: number, values: IProjectUpdate): Promise<void> {
    await ApiConnection.put(`${this.RoutePrefix}/${projectId}`, values)
  }

  static async getWiki(projectId: number): Promise<IProjectWikiPage[]> {
    try {
      const response = await ApiConnection.get(`${this.RoutePrefix}/${projectId}/wiki`);
      return response.data
    } catch {
      return [{
        id: 14,
        title: 'BaSe',
      }]
    }
  }

  static async getWikiPage(projectId: number, wikiPageId: number): Promise<IProjectWikiPage> {
    try {
      const response = await ApiConnection.get(`${this.RoutePrefix}/${projectId}/wiki/${wikiPageId}`);
      return response.data
    } catch {
      return {
        id: 14,
        title: 'BaSe',
        content: 'Контент'
      }
    }
  }

  static async createWikiPage(projectId: number, request: { title: string }): Promise<{ id: number }> {
    try {
      const response = await ApiConnection.post(`${this.RoutePrefix}/${projectId}/wiki`, request)
      return response.data;
    } catch {
      return {
        id: 5
      }
    }
  }
}

export default ProjectsService;
