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
	getTodos: Function,
}

export type TodolistType = {
	isLoading: boolean,
	setError: Function,
	todos: [],
	getTodos: Function,
}

export type TodoType = {
	setError: Function,
	todo: TaskType,
	getTodos: Function,
}
export type PaginationType = {
	todos: [],
	error: any,
	todosCount: number,
	todosPerPage: number,
	currentPage: number,
	status: string,
	setCurrentPage: Function,
}
export type SignInUpType = {
	signIn: boolean,
	setSignIn: Function,
}