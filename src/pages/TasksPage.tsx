import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { fetchTasks } from '../store/tasksSlice'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import TaskTable from '../components/TaskTable'


export default function TasksPage() {
const dispatch = useDispatch<AppDispatch>()
const { items, status, error } = useSelector((s: RootState) => s.tasks)


useEffect(() => {
if (status === 'idle') {
dispatch(fetchTasks())
}
}, [status, dispatch])


return (
<>
<Typography variant="h4" gutterBottom>
Список задач
</Typography>
{status === 'loading' && <CircularProgress />}
{status === 'failed' && <Alert severity="error">{error ?? 'Ошибка загрузки'}</Alert>}
{status === 'succeeded' && <TaskTable tasks={items} />}
</>
)
}