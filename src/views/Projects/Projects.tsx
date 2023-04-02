import { Card } from 'antd'
import React from 'react'
import './styles.css'

const mockProjects = [{
  id: 1,
  name: 'Project1',
  description: 'simple description'
},{
  id: 2,
  name: 'Project2',
  description: 'simple description'
},{
  id: 3,
  name: 'Project3',
  description: 'simple description'
},{
  id: 4,
  name: 'Project4',
  description: 'simple description'
},{
  id: 5,
  name: 'Project5',
  description: 'simple description'
},]


export const Projects: React.FC = () => {

  return (
    <div className="Projects">
      {mockProjects.map((project) => (
        <Card key={project.id} title={project.name}>
          <p>{project.description}</p>
        </Card>
      ))}
    </div>
  )
}