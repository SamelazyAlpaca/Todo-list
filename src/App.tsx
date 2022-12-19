import React, { useState, useEffect } from 'react'
import './App.css';
import './logout.css';
import Form from './components/Form';
import ToDoList from './components/TodoList';
import Pagination from './components/Pagination';
import SignInUp from './components/SignInUp';
import {
	Container,
	Center,
	Heading,
	Alert,
	AlertIcon,
	AlertTitle,
	Text,
	Flex
} from '@chakra-ui/react'
import { getAllTasks } from './services/axios-instance';
import { CloseIcon } from '@chakra-ui/icons';

const App = () => {
	const [signIn, setSignIn] = useState<boolean>(false)
	const [todos, setTodos] = useState<[]>([])
	const [status, setStatus] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [selectedSort, setSelectedSort] = useState<string>('desc')
	const [todosCount, setTodosCount] = useState<number>(0)
	const [error, setError] = useState<string>('')
	const todosPerPage: number = 5


	const getTodos = async () => {
		try {
			setIsLoading(true)
			const { data } = await getAllTasks({ status, selectedSort, todosPerPage, currentPage })
			setTodosCount(data.count)
			setTodos(data.tasks)
			setIsLoading(false)
		} catch (error: any) {
			setIsLoading(false)
			setError(error.response.data.message)
		}
	}

	const errorClose = () => {
		setError('')
	}

	useEffect(() => {
		if (todos.length < 1 && currentPage >= 1) {
			setCurrentPage(1)
		}
	}, [todos.length, todosCount])

	useEffect(() => {
		getTodos()
	}, [currentPage, status, selectedSort]);

	return (
		<>
			<SignInUp
				setSignIn={setSignIn}
				signIn={signIn}
			/>
			{!signIn ? null : (
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
								<Flex
									w="100%"
									justify="end"
									pr="5rem"
									color="#fff"
								>
									<Flex
										pr="1rem"
										align="center"
										gap="10px"
									>
										<i className="fas fa-user"></i>
										<Text>Username</Text>
									</Flex>
									<Flex
										className='button-logout'
										pr="1rem"
										align="center"
										gap="10px"
										cursor="pointer"
									// onClick={setSignIn(true)}
									>
										<span></span>
										<span></span>
										<span></span>
										<span></span>
										<Text>
											Log Out
										</Text>
										<i className="fa fa-sign-out"></i>
									</Flex>
								</Flex>
								<Heading
									color="#fff"
									marginTop="3rem"
								>
									<Text>
										Todo List
									</Text>
								</Heading>
								<Form
									getTodos={getTodos}
									setStatus={setStatus}
									selectedSort={selectedSort}
									setSelectedSort={setSelectedSort}
									setCurrentPage={setCurrentPage}
									setError={setError}
									isLoading={isLoading}
								/>
							</header>
							<ToDoList
								todos={todos}
								getTodos={getTodos}
								setError={setError}
								isLoading={isLoading}
							/>
							{!todosCount && !isLoading
								? <h2 style={{ color: "#fff", marginTop: "2rem", padding: "1rem", textAlign: "center" }}>Список дел пуст... Самое время его пополнить!</h2>
								: null
							}
							{todosCount > todosPerPage && !isLoading ? (
								<Pagination
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									status={status}
									todos={todos}
									error={error}
									todosCount={todosCount}
									todosPerPage={todosPerPage}
								/>
							) : null}
						</Container>
					</Center>
				</>
			)}
		</>
	);
}

export default App;
