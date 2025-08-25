export type TaskStatus = 'done' | 'in process'

export interface Task {
	id: number
	title: string
	status: TaskStatus
}