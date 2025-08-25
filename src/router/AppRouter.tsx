import { useRoutes } from 'react-router-dom'

import { appRoutes } from './router'

/**
 * Роутер приложения
 */
export default function AppRouter() {
  return useRoutes(appRoutes)
}