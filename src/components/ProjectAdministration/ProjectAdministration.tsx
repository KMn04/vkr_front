import Modal from "../../views/Modal/Modal"
import React from 'react'
import ProjectAdministrationContainer from "./ProjectAdministrationContainer"
import { useLocation, useNavigate } from "react-router-dom";

const ProjectAdministration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const onCLoseHandler = () => {
    navigate(location.pathname.replace('/administration', ''))
  }

  return (
    <Modal onClickOutside={onCLoseHandler}>
        <ProjectAdministrationContainer/>
    </Modal>
  )
}

export default ProjectAdministration