import { ITicket, TicketStatus } from '../types/Ticket';
import { ApiConnection } from './ApiConnection';

export const mockTicketOpen: ITicket = {
  id: 355,
  title: 'Написать нормальный проект для диплома',
  status: TicketStatus.OPEN,
}

export const mockTicketInProgress: ITicket = {
  id: 405,
  title: 'Написать фронт для ВКР',
  status: TicketStatus.IN_PROGRESS,
  authorId: 33,
  authorName: 'Ивановна'
}

class TicketsService {
  static get RoutePrefix(): string {
    return 'Tickets';
  }

  static async getTicket(id: number): Promise<ITicket> {
    try {
      const response = await ApiConnection.get(this.RoutePrefix + '/' + id);
      return response.data;
    } catch {
      return mockTicketInProgress;
    }
  }
}

export default TicketsService;
