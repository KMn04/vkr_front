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

  if(projectStore.state.isLoading || !projectStore.id){
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
        <div className="ProjectPage__mainInfo">
          <div className="ProjectPage__meta">
            <div className="ProjectPage__title">
              {projectStore.name}
            </div>
            <div className="ProjectPage__description">
              {projectStore.description}
            </div>
          </div>
          <div className="ProjectPage__components">
            <div className="ProjectPage__members">
              <h3>Команда</h3>
              {projectStore.projectMembers.preparedMembers.map((member) => (
                <div key={member.userId}>{`${member.fullName}(${member.user.login}, ${member.roleName})`}</div>
              ))}
            </div>
            <div className="ProjectPage__notifiactions">
              <h3>Уведомления</h3>
            </div>
          </div>
        </div>
        <div className="ProjectPage__tickets">
          <TicketsTable tasks={projectStore.projectTasks.tasks}/>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default observer(ProjectPage)