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