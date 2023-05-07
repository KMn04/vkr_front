import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import { useStores } from '../../hooks/useStores';
import TicketsTable from '../../components/TicketsTable/TicketsTable';
import {AiOutlineLeft} from 'react-icons/ai'

const ProjectPage: React.FC = () => {
  const {projectStore} = useStores();
  const navigate = useNavigate();
  const {projectId} = useParams();

  useEffect(() => {
    const numId = projectId ? parseInt(projectId) : undefined;
    if(numId && !Number.isNaN(numId)){
      projectStore.fetch(numId)
    }
  }, [])

  const goBackhandle = () => {
    navigate('/projects')
  }

  const goAdminHandle = () => {
    navigate('administration')
  }

  if(projectStore.state.isLoading){
    return <span>Загрузка проекта...</span>
  }

  return (
    <div className="ProjectPage"> 
      <div className="ProjectPage__container">
        <div className="ProjectPage__toolbar">
          <div 
            className="ProjectPage__toolbarItem ProjectPage__goBack" 
            onClick={goBackhandle}
          >
            <AiOutlineLeft size={14} />
            <span>назад</span>
          </div>
          <div className="ProjectPage__toolbarItem ProjectPage__administration" onClick={goAdminHandle}>
            <span>администрирование</span>
          </div>
        </div>
        <div className="ProjectPage__title">
          {projectStore.name}
        </div>
        <div className="ProjectPage__description">
          {projectStore.description}
        </div>
        <div className="ProjectPage__tickets">
          <TicketsTable tickets={projectStore.tickets}/>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default observer(ProjectPage)