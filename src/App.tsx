import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './components/MainLayout/MainLayout'
import Projects from './views/Projects/Projects'
import ProjectPage from './views/Project/Project'

function App() {

  const router = createBrowserRouter([
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
          element: <ProjectPage />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
