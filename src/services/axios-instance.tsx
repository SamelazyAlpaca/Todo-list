import axios from 'axios'
import { MutableRefObject } from 'react';
import { ResponseType, TaskType } from '../types/types';

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
})



export const getAllTasks = (response: ResponseType) =>
	instance.get('/tasks/',
		{
			params: {
				filterBy: response.status,
				order: response.selectedSort,
				pp: response.todosPerPage,
				page: response.currentPage,
			},
		}
	)

export const postOneTask = (ref: MutableRefObject<HTMLInputElement | null>) =>
	instance.post<TaskType>('/tasks/', {
		name: ref.current!.value.trim(),
		done: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	})

export const patchNameTask = (todo: TaskType, inputFocus: MutableRefObject<HTMLInputElement | null>) =>
	instance.patch<TaskType>(`/tasks/${todo.id}`, {
		name: inputFocus.current!.value,
		done: todo.done,
		createdAt: todo.createdAt,
		updatedAt: new Date(),
	})


export const patchCompleteTask = (todo: TaskType, inputFocus: MutableRefObject<HTMLInputElement | null>) =>
	instance.patch<TaskType>(`/tasks/${todo.id}`, {
		name: inputFocus.current!.value,
		done: !todo.done,
		createdAt: todo.createdAt,
		updatedAt: new Date(),
	})

export const deleteOneTask = (todo: { id: string; }) => instance.delete(`/tasks/${todo.id}`)
