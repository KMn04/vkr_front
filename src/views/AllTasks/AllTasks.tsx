import React, { useEffect, useState } from 'react';
import './styles.css';
import TicketsTable from '../../components/TicketsTable/TicketsTable';
import TicketsService from '../../services/TicketsService';
import { IProjectTask } from '../../types/Projects';
import { useNavigate } from 'react-router-dom';

const AllTasks: React.FC = () => {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState<IProjectTask[]>([]);

  const fetch = async () => {
    const response = await TicketsService.getTasks();
    setTasks(response)
  }

  const onTicketClickHandle = (id: number, ticket: IProjectTask) => {
    navigate(`/projects/${ticket.projectId}/ticket/${id}`)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className="AllTasks__container">
      <TicketsTable tasks={tasks} onTicketClick={onTicketClickHandle}/>
    </div>
  )
}

export default AllTasks