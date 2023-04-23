import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './components/MainLayout/MainLayout'
import Projects from './views/Projects/Projects'

function App() {

  const router = createBrowserRouter([
    {
      path: '/auth',
      element: <div>authorization</div>
    },
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <div>произошла ошибка...</div>,
      children: [
        {
          path: 'projects',
          element: <Projects />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
