import axios from 'axios'

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
})

export const getAllTasks = (response) =>
	instance.get('/user/tasks/',
		{
			params: {
				filterBy: response.status,
				order: response.selectedSort,
				pp: response.todosPerPage,
				page: response.currentPage,
			},
		}
	)

export const postOneTask = (ref) =>
	instance.post('/user/tasks/', {
		name: ref.current.value.trim(),
		done: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	})

export const patchNameTask = (todo, inputFocus) =>
	instance.patch(`/user/tasks/${todo.uuid}`, {
		name: inputFocus.current.value,
		done: todo.done,
		createdAt: todo.createdAt,
		updatedAt: new Date(),
	})


export const patchCompleteTask = (todo, inputFocus) =>
	instance.patch(`/user/tasks/${todo.uuid}`, {
		name: inputFocus.current.value,
		done: !todo.done,
		createdAt: todo.createdAt,
		updatedAt: new Date(),
	})

export const deleteOneTask = (todo) => instance.delete(`/user/tasks/${todo.uuid}`)
