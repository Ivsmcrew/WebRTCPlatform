import * as React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import TasksPage from './pages/TasksPage'
import VideoRoomPage from './pages/VideoRoomPage'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'


export default function App() {
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Tasks & Video Room
					</Typography>
					<Button color="inherit" component={Link} to="/tasks">Tasks</Button>
				</Toolbar>
			</AppBar>
			<Container sx={{ py: 3 }}>
				<Routes>
					<Route path="/" element={<Navigate to="/tasks" replace />} />
					<Route path="/tasks" element={<TasksPage />} />
					<Route path="/room/:id" element={<VideoRoomPage />} />
					<Route path="*" element={<Typography>404 Not Found</Typography>} />
				</Routes>
			</Container>
		</>
	)
}