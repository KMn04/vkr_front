import React, { useMemo } from 'react';
import WikiDirectory from '../WikiDirectory/WikiDirectory';
import { Outlet, useParams } from 'react-router-dom';
import './styles.css'

const ProjectLayout: React.FC = () => {
  const {projectId} = useParams();

  const prepProjectId = useMemo(() => {
    if(projectId && parseInt(projectId)){
      return parseInt(projectId)
    }
  }, [projectId])

  if(!prepProjectId){
    return <div>Не верный идентификатор проекта</div>
  }

  return (
    <div className="ProjectLayout">
      <WikiDirectory projectId={prepProjectId} />
      <Outlet/>
    </div>
  )
}

export default ProjectLayout;