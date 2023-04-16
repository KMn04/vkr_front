import { Card } from 'antd'
import React, { useEffect } from 'react'
import './styles.css'
import { useStores } from '../../hooks/useStores'
import { observer } from 'mobx-react'

const Projects: React.FC = () => {
  const {projectsStore} = useStores()

  useEffect(() => {
    projectsStore.fetchProjects()
  }, [])

  return (
    <div className="Projects">
      {projectsStore.projects.map((project) => (
        <Card key={project.id} title={project.name}>
          <p>{project.description}</p>
        </Card>
      ))}
      {projectsStore.state.isLoading && (<span>loading...</span>)}
    </div>
  )
}

export default observer(Projects)