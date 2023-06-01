export interface DictionaryItem {
  itemCode: number;
  itemName: string;
  description?: string;
}

export interface CurrenciesItem {
  currencyCode: number,
  name: string,
}

export interface RolesItem {
  roleCode: number;
  name: string;
  description: string;
}

export interface TaskTypeItem {
  taskTypeCode: number;
  name: string;
}

export interface TaskPriorityItem {
  taskPriorityCode: number;
  name: string;
}

export interface TaskStatusItem {
  taskStatusCode: number;
  name: string;
}