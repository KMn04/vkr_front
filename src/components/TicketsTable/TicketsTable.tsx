import { Table } from 'antd';
import React, {  useMemo } from 'react'
import './styles.css'
import { TicketStatus, TicketStatusName } from '../../types/Ticket';
import { useNavigate } from 'react-router-dom';
import { IProjectTask } from '../../types/Projects';

export interface ITicketsTableProps {
  tasks: IProjectTask[];
  onTicketClick?: (id: number, ticket: IProjectTask) => void;
}

const TicketsTable: React.FC<ITicketsTableProps> = ({tasks, onTicketClick}) => {
  const navigate = useNavigate();

  const onTicketIdClick = (id: number, ticket: IProjectTask) => {
    if(onTicketClick){
      onTicketClick(id, ticket)
    }else{
      navigate(`ticket/${id}`);
    }
  }

  const columns = useMemo(() => [{
    title: '№',
    dataIndex: 'taskId',
    key: 'id',
    render: (id: number, ticket: IProjectTask) => {
      return (
        <div
          className="TicketTable__idCell"
          onClick={() => onTicketIdClick(id, ticket)}
        >
          {id}
        </div>
      )
    }
  },{
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
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
    render: (_: any, ticket: IProjectTask) => {
      if(ticket.authorId){
        return ticket.authorId
      }
    }
  }], [])

  return (
    <Table  
      columns={columns} 
      dataSource={tasks}
    />
  );
}

export default TicketsTable;