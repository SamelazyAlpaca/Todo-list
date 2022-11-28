import React from 'react'
import Todo from './Todo'

const ToDoList = ({ todos, setTodos, getTodos, setCurrentPage }) => {
	return (
		<div className='todo-container'>
			<ul className='todo-list'>
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
			</ul>
		</div>
	)
}
export default ToDoList;