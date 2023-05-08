import { Button, Card } from 'antd'
import React, { useEffect, useState } from 'react'
import './styles.css'
import { useStores } from '../../hooks/useStores'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'
import CreatePoject from '../../components/CreateProject/CreateProject'
import Modal from '../Modal/Modal'

const Projects: React.FC = () => {
  const {projectsStore} = useStores()
  const navigate = useNavigate();
  const [isOpenCreateProject, setOpenCreateProject] = useState(false);

  const openCreateProjectHandler = () => {
      setOpenCreateProject(true)
  }

  const closeCreateOpenHandler = () => {
    setOpenCreateProject(false)
  }

  useEffect(() => {
    projectsStore.fetchProjects()
  }, [])

  return (
    <div className="Projects">
      <div className="Projects__toolbar">
        <Button onClick={openCreateProjectHandler}>Создать проект</Button>
      </div>
      {projectsStore.projects.map((project) => (
        <Card 
          className="Projects__card" 
          key={project.projectId} 
          title={project.name}
          onClick={() => {
            navigate(`${project.projectId}`)
          }}
        >
          <p>{project.description}</p>
        </Card>
      ))}
      {projectsStore.state.isLoading && (<span>loading...</span>)}
      {isOpenCreateProject && (
        <Modal onClickOutside={closeCreateOpenHandler}>
          <CreatePoject onClose={closeCreateOpenHandler}/>
        </Modal>
      )}
    </div>
  )
}

export default observer(Projects)