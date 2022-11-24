import axios from 'axios'
import React, { useRef, useState } from 'react'

const Todo = ({ todo, todos, setTodos }) => {
	const [readOnly, setReadOnly] = useState(true)
	const inputFocus = useRef(null)

	const deleteHandler = () => {
		// setTodos(todos.filter(el => el.uuid !== todo.uuid))
		axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/5/${todo.uuid}`)
	}

	const completeHandler = () => {
		todos.find((item) => {
			if (item.uuid === todo.uuid) {
				todo.done = !todo.done
			}
		})
		setTodos([...todos])
	}

	const editHandler = () => {
		todos.find((item) => {
			if (item.uuid === todo.uuid) {
				setReadOnly(false)
				inputFocus.current.focus()
			}
		})
	}

	const keydownBlurInput = (e) => {
		if (e.target.readOnly === false && e.key === 'Escape') {
			inputFocus.current.value = e.target.defaultValue
			setReadOnly(true)
			e.target.blur()
		} else if (e.target.readOnly === false && e.key === 'Enter') {
		// console.log(todo.userId);

			// todos.find((item) => {
			// 	if (item.uuid === todo.uuid) {
			// 		console.log(todo);
			// 		todo.name = inputFocus.current.value
			// 	}
			// 	// return item
			// })
			console.log(inputFocus.current.value);

			console.log(todo);
			axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/5/${todo.uuid}`,
			{name: `${inputFocus.current.value}`})
			.then((response) => {
				console.log('Edit response',response.data);
				setTodos([...todos])
			})
			// setTodos([...todos])
			e.target.blur()
		}
	}

	const inputOnBlur = (e) => {
		setReadOnly(true)
	}

	return (
		<div className='todo'>
			<input
				onKeyDown={keydownBlurInput}
				onBlur={inputOnBlur}
				ref={inputFocus}
				readOnly={readOnly}
				defaultValue={todo.name}
				className={`todo-item ${todo.done ? "completed" : ''} ${readOnly ? '' : 'todo-item-border'}`}
			/>
			<li className='todo-item-date'>
				{('0' + (+new Date(todo.createdAt).getDate())).slice(-2) + '-' + ('0' + (+new Date(todo.createdAt).getMonth() + 1)).slice(-2) + '-' + +new Date(todo.createdAt).getFullYear()}
			</li>
			<div className='button-wrapper'>
				<button onClick={editHandler} className='edit-btn'>
					<i className="fas fa-edit" />
				</button>
				<button onClick={completeHandler} className='complete-btn'>
					<i className='fas fa-check' />
				</button>
				<button onClick={deleteHandler} className='trash-btn'>
					<i className='fas fa-trash' />
				</button>
			</div>
		</div>
	)
}
export default Todo;