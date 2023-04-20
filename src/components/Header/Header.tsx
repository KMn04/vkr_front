import React from 'react';
import './styles.css'
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {

  return (
    <header className="Header">
      <nav className="Header__container">
        <Link className="Header__link" to="/projects">Проекты</Link>
      </nav>
    </header>
  )
}