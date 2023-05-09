import React, { useMemo } from 'react';
import './styles.css'
import { Link, useNavigate, useParams } from 'react-router-dom';

export const Header: React.FC = () => {

  const {projectId} = useParams()
  const navigator = useNavigate();

  const goToMainHandler = () => {
    navigator('/')
  }

  const navigationLinks = useMemo(() => {
    if(projectId){
      return <Link className="Header__link" to={`/projects/${projectId}/tasks`}>Задачи</Link>
    }
    return null
  }, [projectId])

  return (
    <header className="Header">
      <h1 onClick={goToMainHandler}>TaskHub</h1>
      <nav className="Header__container">
        {navigationLinks}
        <Link className="Header__link" to="/projects">Проекты</Link>
        <Link className="Header__link" to="/cabinet">Профиль</Link>
      </nav>
    </header>
  )
}