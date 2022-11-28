import axios from 'axios'
import React, { useRef, useState } from 'react'

const Todo = ({ todo, todos, getTodos, setCurrentPage }) => {
	const [readOnly, setReadOnly] = useState(true)
	const inputFocus = useRef(null)
 
	const deleteHandler = () => {
		console.log(todo.uuid);
		axios.delete(`${process.env.REACT_APP_BASE_URL}task/${process.env.REACT_APP_userId}/${todo.uuid}`)
			.then( () => {
				getTodos()
				if (todos.length === 1) {
					setCurrentPage(prev => prev - 1)
				}
			})
			.catch((error) => {
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
						alert(error.response.data)
						break;
				}
			})
	}

	const completeHandler = () => {

		axios.patch(`${process.env.REACT_APP_BASE_URL}task/${process.env.REACT_APP_userId}/${todo.uuid}`,
			{
				name: inputFocus.current.value,
				done: !todo.done,
				createdAt: todo.createdAt,
				updatedAt: new Date(),
			})
			.then(() => {
				getTodos()
			})
			.catch((error) => {
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
						alert(error.response.data)
						break;
				}
			})

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
			axios.patch(`${process.env.REACT_APP_BASE_URL}task/${process.env.REACT_APP_userId}/${todo.uuid}`,
				{
					name: inputFocus.current.value,
					done: todo.done,
					createdAt: todo.createdAt,
					updatedAt: new Date(),
				})
				.then((response) => {
					console.log('Edit response', response.data);
				})
				.catch((error) => {
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
							alert(error.response.data)
							break;
					}
				})
			e.target.blur()
		}
	}

	const inputOnBlur = (e) => {
		setReadOnly(true)
	}

	return (
		<div className={`todo ${todo.done ? 'todo-completed' : ''}`}>
			<div className='button-wrapper'>
			<button onClick={editHandler} className='edit-btn'>
					<i className="fas fa-edit" />
				</button>
				<button onClick={completeHandler} className={`${todo.done ? 'uncomplete-btn' : 'complete-btn'} ` }>
					{todo.done
						? <i className='fas fa-times' aria-hidden='true' /> 
						: <i className='fas fa-check' aria-hidden='true' />
					}
				</button>
			</div>
			<input
				onDoubleClick={editHandler}
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
				<button onClick={deleteHandler} className='trash-btn'>
					<i className='fas fa-trash' />
				</button>
			</div>
		</div>
	)
}
export default Todo;