import React, { PropsWithChildren } from 'react'
import './styles.css'
import { SideBar } from '../SideBar/Sidebar'
import {Header} from '../Header/Header'
import { Outlet } from 'react-router-dom'

export const MainLayout: React.FC<PropsWithChildren> = ({children}) => {

  return (
    <div className="MainLayout">
      <SideBar />
      <div className="MainLayout__content" >
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div> 
  )
}
