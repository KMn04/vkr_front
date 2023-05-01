import { makeAutoObservable, runInAction } from "mobx";
import { ErrorStateStore, FetchingStateStore, StateBaseStore, SuccessStateStore } from "./StateStores";
import ProjectsService from "../services/ProjectsServices";
import { ITicket } from "../types/Ticket";
import { IProjectEmployee } from "../types/Projects";

export class ProjectStore {
  id?: number;

  name?: string;

  description?: string;

  employees: IProjectEmployee[]

  tickets: ITicket[];

  state: StateBaseStore;

  constructor() {
    makeAutoObservable(this);
    this.tickets = [];
    this.employees = [];
    this.state = new StateBaseStore()
  }

  async fetch(id?: number) {
    this.state = new FetchingStateStore();
    try {
      if (id) {
        runInAction(() => {
          this.id = id;
        })
      }
      if (this.id) {
        const response = await ProjectsService.getProject(this.id);
        runInAction(() => {
          this.id = response.id
          this.name = response.name;
          this.description = response.description;
          this.tickets = response.tickets ?? [];
          this.state = new SuccessStateStore();
        })
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  get preparedUsers() {
    return this.employees.map(employee => ({
      userName: [employee.firstName, employee.secondName].join(' '),
      role: employee.role
    }))
  }
}