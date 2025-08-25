import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

import type { RootState, AppDispatch } from '../store/store'
import { fetchTasks } from '../store/tasksSlice'
import TaskTable from '../components/TaskTable'

const PAGE_TITLE = 'Список задач'

/**
 * Страница задач
 */
export default function TasksPage() {
	const dispatch = useDispatch<AppDispatch>()
	const { items, status, error } = useSelector((s: RootState) => s.tasks)

	// Загрузить данные, если они еще не загружены
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchTasks())
		}
	}, [status, dispatch])

	return (
		<>
			<Typography variant="h4" gutterBottom>
				{PAGE_TITLE}
			</Typography>
			{status === 'loading' && <CircularProgress />}
			{status === 'failed' && <Alert severity="error">{error}</Alert>}
			{status === 'succeeded' && <TaskTable tasks={items} />}
		</>
	)
}