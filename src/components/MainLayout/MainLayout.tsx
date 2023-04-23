import React, { useEffect, useLayoutEffect } from 'react'
import './styles.css'
import { SideBar } from '../SideBar/Sidebar'
import {Header} from '../Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useStores } from '../../hooks/useStores'

export const MainLayout: React.FC = (  ) => {

  const {authStore} = useStores();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if(!authStore.token){
      try{
        authStore.tryGetToken();
      }catch{
        navigate('/login')
      }
    }
  }, [])

  return (
    <div className="MainLayout">
      <SideBar />
      <div className="MainLayout__content" >
        <Header />
        <Outlet />
      </div>
    </div> 
  )
}
