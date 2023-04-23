import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './components/MainLayout/MainLayout'
import Projects from './views/Projects/Projects'
import ProjectPage from './views/Project/Project'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import TicketModal from './views/TicketModal/TicketModal'
import ReactDOM from 'react-dom'
import { TicketModalContainer } from './views/TicketModal/TicketModalContainer'

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
          path: 'projects',
          element: <Projects />
        },
        {
          path: 'projects/:id',
          element: <ProjectPage />,
          children: [
            {
              path: 'ticket/:ticketId',
              element: <TicketModal/>
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
