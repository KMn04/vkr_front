import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import './styles.css';
import { useStores } from '../../hooks/useStores';
import TicketsTable from '../../components/TicketsTable/TicketsTable';

const ProjectPage: React.FC = () => {
  const {projectStore} = useStores();
  const {id} = useParams();

  useEffect(() => {
    const numId = id ? parseInt(id) : undefined;
    if(numId && !Number.isNaN(numId)){
      projectStore.fetch(numId)
    }
  }, [])

  return (
    <div className="ProjectPage">
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
  )
}

export default observer(ProjectPage)