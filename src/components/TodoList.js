import React from 'react'
import Todo from './Todo'
import { Flex, List } from '@chakra-ui/react'

const ToDoList = ({ todos, setTodos, getTodos, setCurrentPage }) => {
	return (
		<Flex justifyContent="center" alignItems="center" pb="2rem">
			<List className='todo-list'>
				{(todos.map(todo => (
					<Todo
						setTodos={setTodos}
						getTodos={getTodos}
						todos={todos}
						todo={todo}
						key={todo.uuid}
						userId={todo.userId}
						dateSort={+new Date(todo.createdAt)}
						setCurrentPage={setCurrentPage}
					/>
				)))}
			</List>
		</Flex>
	)
}
export default ToDoList;