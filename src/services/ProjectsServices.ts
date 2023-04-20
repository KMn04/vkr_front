import type { IProject, IProjectListItem } from '../types/Projects';
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
}

export default ProjectsService;
