import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
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


// Fetch from JSONPlaceholder and map completed -> status
export const fetchTasks = createAsyncThunk<Task[]>(
'tasks/fetch',
async () => {
const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
if (!res.ok) throw new Error('Failed to fetch tasks')
const data: Array<{ id: number; title: string; completed: boolean }> = await res.json()
const mapped: Task[] = data.map((t) => ({
id: t.id,
title: t.title,
status: t.completed ? 'done' : 'pending',
}))
return mapped
}
)


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