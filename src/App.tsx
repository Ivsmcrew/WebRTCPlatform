import { Routes, Route, Navigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import TasksPage from './pages/TasksPage'
import VideoRoomPage from './pages/VideoRoomPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Tasks & Video Room
					</Typography>

				</Toolbar>
			</AppBar>
			<Container sx={{ py: 3 }}>
				<Routes>
					<Route path="/" element={<Navigate to="/tasks" replace />} />
					<Route path="/tasks" element={<TasksPage />} />
					<Route path="/room/:id" element={<VideoRoomPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</>
	)
}