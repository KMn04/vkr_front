import { Card } from 'antd'
import React, { useEffect } from 'react'
import './styles.css'
import { useStores } from '../../hooks/useStores'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'

const Projects: React.FC = () => {
  const {projectsStore} = useStores()
  const navigate = useNavigate();

  useEffect(() => {
    projectsStore.fetchProjects()
  }, [])

  return (
    <div className="Projects">
      {projectsStore.projects.map((project) => (
        <Card 
          className="Projects__card" 
          key={project.id} 
          title={project.name}
          onClick={() => {
            navigate(`${project.id}`)
          }}
        >
          <p>{project.description}</p>
        </Card>
      ))}
      {projectsStore.state.isLoading && (<span>loading...</span>)}
    </div>
  )
}

export default observer(Projects)