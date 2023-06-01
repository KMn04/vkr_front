import React, { useEffect, useState } from 'react';
import './styles.css';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import TicketsTable from '../../components/TicketsTable/TicketsTable';
import { useStores } from '../../hooks/useStores';
import { AiOutlineLeft, AiOutlinePlus } from 'react-icons/ai';
import Modal from '../Modal/Modal';
import CreateTask from '../../components/CreateTask/CreateTask';

const ProjectTickets: React.FC = () => {
  const {projectId} = useParams();

  const {projectStore} = useStores();
  const navigate = useNavigate();

  const [isShowCreateTicket, setShowCreateTicket] = useState(false)
  
  const goBackhandle = () => {
    navigate(`/projects/${projectId}`)
  }

  const openCreateHandle = () => {
    setShowCreateTicket(true)
  }

  const closeCreateHandle = () => {
    setShowCreateTicket(false)
  }

  useEffect(() => {
    projectStore.fetch(+projectId!)
  }, [])

  if(!projectStore.id){
    return (<div>not find projectid</div>)
  }

  return (
    <div className="ProjectTickets">
      <div className="ProjectTickets__toolbar">
        <div 
          className="ProjectTickets__toolbarItem ProjectTickets__goBack" 
          onClick={goBackhandle}
        >
          <AiOutlineLeft size={14} />
          <span>к проекту</span>
        </div>
        <div className="ProjectTickets__toolbarItem" onClick={openCreateHandle}>
          <AiOutlinePlus size={14}/>
          <span>создать задачу</span>
        </div>
      </div>
      <TicketsTable tasks={projectStore.projectTasks.tasks}/>
      {isShowCreateTicket && (
        <Modal onClickOutside={closeCreateHandle}>
          <CreateTask onSuccess={() => {
            projectStore.fetch()
          }} onClose={closeCreateHandle}/>
        </Modal>
      )}
      <Outlet/>
    </div>
  )
}

export default observer(ProjectTickets)