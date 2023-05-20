import { CurrenciesItem, DictionaryItem, RolesItem } from "../types/Common";
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