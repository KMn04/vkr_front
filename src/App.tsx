import './App.css'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { MainLayout } from './components/MainLayout/MainLayout'
import Projects from './views/Projects/Projects'
import ProjectPage from './views/Project/Project'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import TicketModal from './views/TicketModal/TicketModal'
import ProjectAdministration from './components/ProjectAdministration/ProjectAdministration'
import ProjectLayout from './components/Projectlayout/ProjectLayout'
import ProjectWikiPage from './views/ProjectWikiPage/ProjectWikiPage'

function App() {

  const router = createBrowserRouter([
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <div>произошла ошибка...</div>,
      children: [
        {
          path: '/',
          loader: () => { 
            return redirect('projects')
          }
        },
        {
          path: 'projects',
          element: <Projects />
        },
        {
          path: 'projects/:projectId',
          element: <ProjectLayout />,
          children: [
            {
              path: '',
              element: <ProjectPage />,
              children: [
                {
                  path: 'ticket/:ticketId',
                  element: <TicketModal/>
                },{
                  path: 'administration',
                  element: <ProjectAdministration/>
                }
              ]
            },{
              path: 'wiki/:wikiPageId',
              element: <ProjectWikiPage />
            }
          ]
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
