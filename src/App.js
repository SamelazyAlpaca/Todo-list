import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import './App.css';
import Form from './components/Form';
import ToDoList from './components/TodoList';
import Loader from './components/Loader';
import Pagination from './components/Pagination';

function App() {
	const [todos, setTodos] = useState([])
	const [status, setStatus] = useState('all')
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(2)
	const [selectedSort, setSelectedSort] = useState('down')
	const todosPerPage = 5
	const [todosCount, setTodosCount] = useState()

	const getTodos = async () => {
		try {
			setIsLoading(true)
			await axios.get(`https://todo-api-learning.herokuapp.com/v1/tasks/5?order=asc&pp=${todosPerPage}&page=${currentPage}`)
				.then((response) => {
					setTodosCount(response.data.count)
					setTodos(response.data.tasks)
					setIsLoading(false)
				})
		} catch (e) {
			setIsLoading(false)
			console.error("Can't get todos :", e.message);
			alert(`${e.message}, Please try again`)
		}
	}
	const dateByNew = () => {
		return [...todos].sort((a, b) => +new Date(a.createdAt).getTime() - +new Date(b.createdAt).getTime())
	}
	const dateByOld = () => {
		return [...todos].sort((a, b) => +new Date(b.createdAt).getTime() - +new Date(a.createdAt).getTime())
	}

	const sortByDate = () => {
		if (selectedSort === 'up') {
			return dateByNew()
		} else if (selectedSort === 'down') {
			return dateByOld()
		}
	}

	const filterHandler = (arr) => {
		switch (status) {
			case 'completed':
				return arr.filter(todo => todo.done === true)
			case 'uncompleted':
				return arr.filter(todo => todo.done === false)
			default:
				return arr
		}
	}

	const sortTodos = useMemo(() => {
		const sortingTodos = sortByDate()
		console.log('SORTING TODOS:', sortingTodos);
		return sortingTodos
	}, [todos, selectedSort, currentPage])

	const filterTodos = useMemo(() => {
		console.log('FILTERHANDLER:', filterHandler(sortTodos));
		return filterHandler(sortTodos)
	}, [todos, status, selectedSort, currentPage])

	const pageNumbers = []
	const paginationMemo = useMemo(() => {
		console.log('FILTERTODOS:', filterTodos);
		for (let i = 1; i <= Math.ceil(todosCount / todosPerPage); i++) {
			pageNumbers.push(i)
		}
		console.log('FILTERTODOS2222:', filterTodos);
		const lastTodoIndex = currentPage * todosPerPage
		console.log('LASTINDEX:', lastTodoIndex);
		const firstTodoIndex = lastTodoIndex - todosPerPage
		console.log('FIRSTINDEX:', firstTodoIndex);
		console.log('TODOS',todos);
		console.log('FILTERSLICE:' , filterTodos.slice(firstTodoIndex, lastTodoIndex));
		return filterTodos.slice(firstTodoIndex, lastTodoIndex)
	}, [todos, status, selectedSort, currentPage])



	useEffect(() => {
		getTodos()
	}, [currentPage]);

	useEffect(() => {
		sortByDate()
	}, [selectedSort])

	return (
		<div className="App">
			<div className='_container'>
				<header>
					<h1>Todo List</h1>
					<Form
						todos={todos}
						sortTodos={sortTodos}
						setTodos={setTodos}
						setStatus={setStatus}
						selectedSort={selectedSort}
						setSelectedSort={setSelectedSort}
						setCurrentPage={setCurrentPage}
					/>
				</header>
				{isLoading ? (
					<Loader />
				) : (
					<ToDoList
						todos={todos}
						todosList={paginationMemo}
						setTodos={setTodos}
					/>
				)}
				{!todos.length && !isLoading
					? <h2 style={{ marginTop: "2rem", padding: "1rem", textAlign: "center" }}>Список дел пуст... Самое время его пополнить!</h2>
					: null
				}
				{todosCount > todosPerPage ? (
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						pageNumbers={pageNumbers}
					/>
				) : null}
			</div>
		</div>
	);
}

export default App;
