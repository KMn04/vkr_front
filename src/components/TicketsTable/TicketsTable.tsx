import { Table } from 'antd';
import React, { useEffect, useMemo } from 'react'
import './styles.css'
import { ITicket, TicketStatus, TicketStatusName } from '../../types/Ticket';
import { useNavigate } from 'react-router-dom';
import { useStores } from '../../hooks/useStores';
import { IProjectTask } from '../../types/Projects';
import { observer } from 'mobx-react';

export interface ITicketsTableProps {
  projectId: number
}

const TicketsTable: React.FC<ITicketsTableProps> = () => {
  const navigate = useNavigate();

  const {projectStore} = useStores();

  const onTicketIdClick = (id: number) => {
    navigate(`ticket/${id}`);
  }

  const columns = useMemo(() => [{
    title: '№',
    dataIndex: 'taskId',
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
      dataSource={projectStore.projectTasks.tasks}
    />
  );
}

export default observer(TicketsTable);