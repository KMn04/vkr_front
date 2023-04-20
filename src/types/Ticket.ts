export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_REVIEW = 'ON_REVIEW',
  CLOSED = 'CLOSED'
}

export enum TicketStatusName {
  OPEN = 'Не начато',
  IN_PROGRESS = 'В работе',
  ON_REVIEW = 'На ревью',
  CLOSED = 'Закрыто'
}

export interface ITicket {
  id: number;
  title: string;
  status: keyof typeof TicketStatus;
  authorId?: number;
  authorName?: string;
}