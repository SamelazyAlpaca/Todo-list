import React, { useState, useEffect, useMemo } from 'react'
import './App.css';
import Form from './components/Form';
import ToDoList from './components/TodoList';
import Loader from './components/Loader';
import Pagination from './components/Pagination';
import { Container, Center, Heading } from '@chakra-ui/react'
import { getAllTasks } from './services/axios-instance';

function App() {
	const [todos, setTodos] = useState([])
	const [status, setStatus] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedSort, setSelectedSort] = useState('desc')
	const [todosCount, setTodosCount] = useState()
	const todosPerPage = 5

	const getTodos = async () => {
		try {
			setIsLoading(true)
			const { data } = await getAllTasks({ status, selectedSort, todosPerPage, currentPage })

			setTodosCount(data.count)
			setTodos(data.tasks)
			setIsLoading(false)
		} catch (error) {
			console.log(error);
			setIsLoading(false)
			switch (error.response?.status) {
				case 400:
					console.log('Error 400:', error.response.data.message);
					alert('Запрос не может быть обработан, возможно где-то опечатка')
					break;
				case 404:
					console.log('Error 404:', error.response.statusText);
					alert('Не удалось загрузить задачи, попробуйте позже')
					break;
				case 422:
					console.log('Error 422:', error.response.data.message);
					alert('Не получилось обработать запрос, попробуйте позже')
					break;
				case 500:
					console.log('Error 500', error.response);
					alert('Сервер не может выполнить запрос, попробуйте позже')
					break;
			}
		}
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
	return (
		<Center>
			<Container maxW="1200px" width="100%" padding="0 15px" >
				<header>
					<Heading
						color="#fff"
						marginTop="3rem"
					>Todo List</Heading>
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
					? <h2 style={{ color: "#fff", marginTop: "2rem", padding: "1rem", textAlign: "center" }}>Список дел пуст... Самое время его пополнить!</h2>
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
