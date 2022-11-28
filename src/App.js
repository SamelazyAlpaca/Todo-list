import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import './App.css';
import Form from './components/Form';
import ToDoList from './components/TodoList';
import Loader from './components/Loader';
import Pagination from './components/Pagination';
import { Container, Center } from '@chakra-ui/react'

function App() {
	const [todos, setTodos] = useState([])
	const [status, setStatus] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedSort, setSelectedSort] = useState('desc')
	const [todosCount, setTodosCount] = useState()
	const todosPerPage = 5

	const getTodos = () => {
		setIsLoading(true)
		axios.get(`${process.env.REACT_APP_BASE_URL}tasks/${process.env.REACT_APP_userId}?filterBy=${status}&order=${selectedSort}&pp=${todosPerPage}&page=${currentPage}`)
			.then((response) => {
				setTodosCount(response.data.count)
				setTodos(response.data.tasks)
				setIsLoading(false)
			})
			.catch((error) => {
				setIsLoading(false)
				switch (error.response.status) {
					case 400:
						console.log('Error response:', error.response);
						alert(error.response.data.message)
						break;
					case 404:
						console.log('Error request:', error.response);
						alert(error.response.statusText)
						break;
					case 500:
						console.log(error.request);
						alert(error.response.data)
						break;
				}
			})
	}

	const pageNumbers = []
	const paginationMemo = useMemo(() => {
		for (let i = 1; i <= Math.ceil(todosCount / todosPerPage); i++) {
			pageNumbers.push(i)
		}
	}, [todos, status, selectedSort, currentPage])

	useEffect(() => {
		getTodos()
	}, [currentPage, status, selectedSort]);
	// width: 100%;
	// max-width: 1200px;
	// padding: 0 15px;
	// margin: 0 auto;
	return (
		<Center className="App">
			<Container maxW="1200px" width="100%" padding="0 15px" >
				<header>
					<h1>Todo List</h1>
					<Form
						todos={todos}
						getTodos={getTodos}
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
						setTodos={setTodos}
						getTodos={getTodos}
						setCurrentPage={setCurrentPage}
					/>
				)}
				{!todos.length && !isLoading
					? <h2 style={{ marginTop: "2rem", padding: "1rem", textAlign: "center" }}>Список дел пуст... Самое время его пополнить!</h2>
					: null
				}
				{todosCount > todosPerPage && !isLoading ? (
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						pageNumbers={pageNumbers}
					/>
				) : null}
			</Container>
		</Center>
	);
}

export default App;
