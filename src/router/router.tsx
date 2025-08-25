import { Navigate } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import TasksPage from '@/pages/TasksPage'
import VideoRoomPage from '@/pages/VideoRoomPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const appRoutes = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to="/tasks" replace /> },
      { path: '/tasks', element: <TasksPage /> },
      { path: '/room/:id', element: <VideoRoomPage /> },
    ]
  },
  { path: '*', element: <NotFoundPage /> }
]