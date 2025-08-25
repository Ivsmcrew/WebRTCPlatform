import type { Task } from "@/types/types";

// Ответ сервера
interface ResponseUnit {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

/**
 * Загрузить данные из JSONPlaceholder и вернуть результат в формате Task[]
 */
export async function fetchJsonPlaceholder(): Promise<Task[]> {
		const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')

		if (!res.ok) throw new Error('Failed to fetch tasks')

		const data: ResponseUnit[] = await res.json()

		const mapped: Task[] = data.map((t) => ({
			id: t.id,
			title: t.title,
			status: t.completed ? 'done' : 'in process',
		}))

		return mapped
}
