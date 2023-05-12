import { ApiConnection } from "./ApiConnection";

class DictionaryService {
  static async getProjectStatuses(): Promise<any[]> {
    const response = await ApiConnection.get('/project_status');
    return response.data
  }

  static async getCurrencies(): Promise<any[]> {
    const response = await ApiConnection.get('/project_status');
    return response.data
  }

  static async getRoles(): Promise<any[]> {
    const response = await ApiConnection.get('/project_status');
    return response.data
  }

  static async getTaskPriorities(): Promise<any[]> {
    const response = await ApiConnection.get('/project_status');
    return response.data
  }

  static async getTaskStatuses(): Promise<any[]> {
    const response = await ApiConnection.get('/project_status');
    return response.data
  }

  static async getTaskTypes(): Promise<any[]> {
    const response = await ApiConnection.get('/project_status');
    return response.data
  }
}

export default DictionaryService