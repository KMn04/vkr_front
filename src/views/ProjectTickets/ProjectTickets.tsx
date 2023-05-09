import React, { useEffect } from 'react';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import TicketsTable from '../../components/TicketsTable/TicketsTable';
import { useStores } from '../../hooks/useStores';
import { AiOutlineLeft } from 'react-icons/ai';

const ProjectTickets: React.FC = () => {
  const {projectId} = useParams();

  const {projectStore} = useStores();
  const navigate = useNavigate();
  
  const goBackhandle = () => {
    navigate(`/projects/${projectId}`)
  }

  useEffect(() => {
    console.log('update')
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
        </div>
      <TicketsTable projectId={projectStore.id}/>
    </div>
  )
}

export default observer(ProjectTickets)