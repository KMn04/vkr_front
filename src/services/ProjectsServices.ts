import type { ICreateProjectRequest, IProject, IProjectListItem, IProjectWikiPage } from '../types/Projects';
import { ApiConnection } from './ApiConnection';
import { mockTicketInProgress, mockTicketOpen } from './TicketsService'

const mockProjects: IProjectListItem[] = [{
  id: 1,
  name: 'Project1',
  description: 'simple description'
}, {
  id: 2,
  name: 'Project2',
  description: 'simple description'
}, {
  id: 3,
  name: 'Project3',
  description: 'simple description'
}, {
  id: 4,
  name: 'Project4',
  description: 'simple description'
}, {
  id: 5,
  name: 'Project5',
  description: 'simple description'
}]

const mockProject: IProject = {
  id: 2,
  name: 'Project2',
  description: 'simple description',
  tickets: [
    mockTicketInProgress,
    mockTicketOpen
  ],
};

class ProjectsService {
  static get RoutePrefix(): string {
    return 'Project';
  }

  static async getProject(id: number): Promise<IProject> {
    try {
      const response = await ApiConnection.get(this.RoutePrefix + '/' + id);
      return response.data;
    } catch {
      return mockProject;
    }
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
      const response = await ApiConnection.post(this.RoutePrefix + '/create', request)
      return response.data;
    } catch {
      return {
        id: 5
      }
    }
  }

  static async getWiki(projectId: number): Promise<IProjectWikiPage[]> {
    try {
      const response = await ApiConnection.get(`${this.RoutePrefix}/${projectId}/wiki`);
      return response.data
    } catch {
      return []
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
