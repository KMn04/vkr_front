import { IProjectTask } from '../types/Projects';
import { ITicket, IUpdateTicketRequest } from '../types/Ticket';
import { ApiConnection } from './ApiConnection';

class TicketsService {
  static get RoutePrefix(): string {
    return 'tasks';
  }

  static async getTasks(): Promise<IProjectTask[]> {
    const response = await ApiConnection.get(this.RoutePrefix);
    return response.data
  }

  static async getTicket(id: number): Promise<ITicket> {
    const response = await ApiConnection.get(this.RoutePrefix + '/' + id);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await ApiConnection.delete(this.RoutePrefix + '/' + id)
  }

  static async update(taskId: number, request: IUpdateTicketRequest): Promise<void> {
    await ApiConnection.put(this.RoutePrefix + '/' + taskId, request)
  }
}

export default TicketsService;
