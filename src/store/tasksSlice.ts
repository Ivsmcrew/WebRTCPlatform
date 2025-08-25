import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { fetchJsonPlaceholder } from '@/api/jsonPlaceholder'

import type { Task } from '../types/types'

interface TasksState {
	items: Task[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error?: string
}

const initialState: TasksState = {
	items: [],
	status: 'idle',
}

// Загрузить данные из JSONPlaceholder и вернуть результат в формате Task[]
export const fetchTasks = createAsyncThunk<Task[]>(
	'tasks/fetch',
	fetchJsonPlaceholder,
)

// Слайс задач
const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks(state, action: PayloadAction<Task[]>) {
			state.items = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
			state.status = 'loading'
			state.error = undefined
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
			state.status = 'succeeded'
			state.items = action.payload
			})
			.addCase(fetchTasks.rejected, (state, action) => {
			state.status = 'failed'
			state.error = action.error.message
			})
	},
})


export const { setTasks } = tasksSlice.actions
export default tasksSlice.reducer