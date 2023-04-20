import { Table } from 'antd';
import React, { useMemo } from 'react'
import './styles.css'
import { ITicket, TicketStatus, TicketStatusName } from '../../types/Ticket';

export interface ITicketsTableProps {
  tickets: ITicket[];
}

const TicketsTable: React.FC<ITicketsTableProps> = ({tickets}) => {

  const onTicketIdClick = (id: number) => {
    window.alert(`Clicked on ticket with id ${id}`)
  }

  const columns = useMemo(() => [{
    title: '№',
    dataIndex: 'id',
    key: 'id',
    render: (id: number) => {
      return (
        <div
          className="TicketTable__idCell"
          onClick={() => onTicketIdClick(id)}
        >
          {id}
        </div>
      )
    }
  },{
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
  },{
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (status: keyof typeof TicketStatus) => {
      return TicketStatusName[status]
    }
  },{
    title: 'Автор',
    dataIndex: 'authorId',
    key: 'authorId',
    render: (_: any, ticket: ITicket) => {
      if(ticket.authorId){
        return ticket.authorName
      }
    }
  }], [])

  const onRowClick = () => {

  }

  return (
    <Table 
      onRow={onRowClick} 
      columns={columns} 
      dataSource={tickets}
    />
  );
}

export default TicketsTable;