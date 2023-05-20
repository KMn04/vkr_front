import React, { useLayoutEffect } from 'react'
import './styles.css'
import {Header} from '../Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { useStores } from '../../hooks/useStores'

export const MainLayout: React.FC = (  ) => {

  const {authStore, currenciesStore, rolesStore} = useStores();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if(!authStore.token){
      try{
        authStore.tryGetToken();
      }catch{
        navigate('/login');
        return;
      }
    }
    currenciesStore.fetch();
    rolesStore.fetch();
  }, [])

  return (
    <div className="MainLayout">
      <Header />
      <div className="MainLayout__content" >
        <Outlet />
      </div>
    </div> 
  )
}
