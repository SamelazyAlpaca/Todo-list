export type TaskType = {
	id: string,
	name: string,
	done: boolean,
	createdAt: string,
	updatedAt: string,
}

export type ResponseType = {
	status: string,
	selectedSort: string,
	todosPerPage: number,
	currentPage: number,
}

export type FormType = {
	setStatus: Function,
	isLoading: boolean,
	setCurrentPage: Function,
	selectedSort: string,
	setSelectedSort: Function,
	setError: Function,
	getTodos: Function
}

export type TodolistType = {
	isLoading: boolean,
	setError: Function,
	todos: any[],
	getTodos: Function,
}

export type TodoType = {
	setError: Function,
	todo: any,
	getTodos: Function
}