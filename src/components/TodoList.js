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
						createdAt={todo.createdAt}
						dateSort={+new Date(todo.createdAt)}
					/>
				)))}
			</ul>
		</div>
	)
}
export default ToDoList;