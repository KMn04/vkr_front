import type { IProject } from '../types/Projects';
import { ApiConnection } from './ApiConnection';

const mockProjects: IProject[] = [{
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
},]


class ProjectsService {
  static get RoutePrefix(): string {
    return 'Project';
  }

  /**
   * Получение проектов с бэка
   * @param query фильтр для получения проектов
  */
  static async getProjects(): Promise<IProject[]> {
    try {
      const response = await ApiConnection.get(this.RoutePrefix);

      return response.data;
    } catch {
      return mockProjects
    }

  }
}

export default ProjectsService;
