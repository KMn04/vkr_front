import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import './styles.css';
import { useStores } from '../../hooks/useStores';
import TicketsTable from '../../components/TicketsTable/TicketsTable';
import WikiDirectory from '../../components/WikiDirectory/WikiDirectory';

const ProjectPage: React.FC = () => {
  const {projectStore} = useStores();
  const {projectId} = useParams();

  useEffect(() => {
    const numId = projectId ? parseInt(projectId) : undefined;
    if(numId && !Number.isNaN(numId)){
      projectStore.fetch(numId)
    }
  }, [])

  return (
    <div className="ProjectPage">  
      <WikiDirectory projectId={projectStore.id ?? 0}/> 
      <div className="ProjectPage__container">
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