export type TaskStatus = 'done' | 'pending'

export interface Task {
	id: number
	title: string
	status: TaskStatus
}