import { ICreateTask } from '../components/CreateTask/CreateTask';
import type { ICreateProjectRequest, IProject, IProjectListItem, IProjectMember, IProjectTask, IProjectUpdate, IProjectWikiPage } from '../types/Projects';
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

  static async getProjectTasks(id: number): Promise<IProjectTask[]> {
    const response = await ApiConnection.get(`${this.RoutePrefix}/${id}/tasks`);
    return response.data;
  }

  static async getProjectTask(projectId: number, taskId: number): Promise<IProjectTask> {
    const response = await ApiConnection.get(`${this.RoutePrefix}/${projectId}/tasks/${taskId}`);
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

  static async createTask(projectId: number, request: ICreateTask): Promise<void> {
    await ApiConnection.post(`${this.RoutePrefix}/${projectId}/tasks`, {
      ...request,
      typeCode: 1,
      priorityCode: 1,

    })
  }

  static async update(projectId: number, values: IProjectUpdate): Promise<void> {
    await ApiConnection.put(`${this.RoutePrefix}/${projectId}`, values)
  }

  static async getWiki(projectId: number): Promise<IProjectWikiPage[]> {
    const response = await ApiConnection.get(`${this.RoutePrefix}/${projectId}/wiki`);
    return response.data
  }

  static async getWikiPage(projectId: number, wikiPageId: string): Promise<IProjectWikiPage> {
    const response = await ApiConnection.get(`${this.RoutePrefix}/${projectId}/wiki/${wikiPageId}`);
    return response.data;
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

  static async updateWikiPage(projectId: number, wikiPageId: string, payload: { title?: string, content?: string }): Promise<string> {
    const response = await ApiConnection.put(`${this.RoutePrefix}/${projectId}/wiki/${wikiPageId}`, payload);
    return response.data
  }

  static async editRole(projectId: number, userId: number, roleCode: number): Promise<void> {
    await ApiConnection.put(`${this.RoutePrefix}/${projectId}/team`, {
      userId: userId,
      roleCode: roleCode
    })
  }

  static async deleteUser(projectId: number, userId: number): Promise<void> {
    await ApiConnection.delete(`${this.RoutePrefix}/${projectId}/team/${userId}`)
  }
}

export default ProjectsService;
