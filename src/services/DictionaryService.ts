import { CurrenciesItem, DictionaryItem, RolesItem, TaskPriorityItem, TaskStatusItem, TaskTypeItem } from "../types/Common";
import { ApiConnection } from "./ApiConnection";

class DictionaryService {
  static async getProjectStatuses(): Promise<any[]> {
    const response = await ApiConnection.get('/project_status');
    return response.data
  }

  static async getCurrencies(): Promise<DictionaryItem[]> {
    const response = await ApiConnection.get<CurrenciesItem[]>('/currencies');
    return response.data.map(cur => ({
      itemCode: cur.currencyCode,
      itemName: cur.name
    }))
  }

  static async getRoles(): Promise<DictionaryItem[]> {
    const response = await ApiConnection.get<RolesItem[]>('/roles');
    return response.data.map(role => ({
      itemCode: role.roleCode,
      itemName: role.name,
      description: role.description
    }))
  }

  static async getTaskPriorities(): Promise<DictionaryItem[]> {
    const response = await ApiConnection.get<TaskPriorityItem[]>('/task_priorities');
    return response.data.map(item => ({
      itemCode: item.taskPriorityCode,
      itemName: item.name
    }))
  }

  static async getTaskStatuses(): Promise<DictionaryItem[]> {
    const response = await ApiConnection.get<TaskStatusItem[]>('/task_statuses');
    return response.data.map(item => ({
      itemCode: item.taskStatusCode,
      itemName: item.name
    }))
  }

  static async getTaskTypes(): Promise<DictionaryItem[]> {
    const response = await ApiConnection.get<TaskTypeItem[]>('/task_types');
    return response.data.map(item => ({
      itemCode: item.taskTypeCode,
      itemName: item.name
    }))
  }
}

export default DictionaryService