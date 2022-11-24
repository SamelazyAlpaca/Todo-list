import React from 'react'
import Todo from './Todo'

const ToDoList = ({ todos, setTodos, todosList }) => {
	return (
		<div className='todo-container'>
			<ul className='todo-list'>
				{(todosList.map(todo => (
					<Todo
						setTodos={setTodos}
						todos={todos}
						todo={todo}
						key={todo.uuid}
						// createdAt={('0' + (+new Date(todo.createdAt).getDate())).slice(-2) + '-' + ('0' + (+new Date(todo.createdAt).getMonth() + 1)).slice(-2) + '-' + +new Date(todo.createdAt).getFullYear()}
						// dateSort={+new Date(todo.createdAt)}
						userId={todo.userId}
						dateSort={+new Date(todo.createdAt)}
					/>
				)))}
			</ul>
		</div>
	)
}
export default ToDoList;