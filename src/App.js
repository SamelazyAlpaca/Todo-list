import React, { useState, useEffect, useMemo } from 'react'
import './App.css';
import Form from './components/Form';
import ToDoList from './components/TodoList';
import Loader from './components/Loader';
import Pagination from './components/Pagination';
import { Container, Center, Heading, Alert, AlertIcon, AlertTitle, Text } from '@chakra-ui/react'
import { getAllTasks } from './services/axios-instance';
import { CloseIcon } from '@chakra-ui/icons';

function App() {
	const [todos, setTodos] = useState([])
	const [status, setStatus] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedSort, setSelectedSort] = useState('desc')
	const [todosCount, setTodosCount] = useState()
	const [error, setError] = useState('')
	const todosPerPage = 5

	const getTodos = async () => {
		try {
			setIsLoading(true)
			const { data } = await getAllTasks({ status, selectedSort, todosPerPage, currentPage })
			setTodosCount(data.count)
			setTodos(data.tasks)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			setError(error.response.data.message)
		}
	}
	const pageNumbers = []
	const paginationMemo = useMemo(() => {
		for (let i = 1; i <= Math.ceil(todosCount / todosPerPage); i++) {
			pageNumbers.push(i)
		}
	}, [todos, status, currentPage, error])

	const errorClose = () => {
		setError('')
	}

	useEffect(() => {
		getTodos()
	}, [currentPage, status, selectedSort]);
	return (
		<>
			<Center>
				<Alert
					borderRadius='5px'
					maxWidth='sm'
					status='error'
					opacity={`${error ? '1' : '0'}`}
					transition=' opacity 0.3s ease-in-out'
				>
					<AlertIcon />
					<AlertTitle w='100%'>
						{error}
					</AlertTitle>
					<CloseIcon
						onClick={errorClose}
						_hover={{ cursor: 'pointer' }}
					/>
				</Alert>
			</Center>

			<Center>
				<Container maxW="1200px" width="100%" padding="0 15px" >
					<header>
						<Heading
							color="#fff"
							marginTop="3rem"
						>
							<Text>
								Todo List
							</Text>
						</Heading>
						<Form
							todos={todos}
							getTodos={getTodos}
							setTodos={setTodos}
							setStatus={setStatus}
							selectedSort={selectedSort}
							setSelectedSort={setSelectedSort}
							setCurrentPage={setCurrentPage}
							setError={setError}
						/>
					</header>
					<Center h="32px">
						{isLoading
							? <Loader />
							: null
						}
					</Center>
					<ToDoList
						todos={todos}
						setTodos={setTodos}
						getTodos={getTodos}
						setCurrentPage={setCurrentPage}
						setError={setError}
					/>
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
		</>
	);
}

export default App;
