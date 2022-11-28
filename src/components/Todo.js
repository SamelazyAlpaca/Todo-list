import axios from 'axios'
import React, { useRef, useState } from 'react'
import {
	Box,
	Button,
	Input,
	ListItem,
	Text,
	Editable,
	EditableInput,
	EditablePreview,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'

const Todo = ({ todo, todos, getTodos, setCurrentPage }) => {
	const [readOnly, setReadOnly] = useState(true)
	const inputFocus = useRef(null)

	const deleteHandler = () => {
		console.log(todo.uuid);
		axios.delete(`${process.env.REACT_APP_BASE_URL}task/${process.env.REACT_APP_userId}/${todo.uuid}`)
			.then(() => {
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
		<ListItem borderRadius="0.375rem" className={`todo ${todo.done ? 'todo-completed' : ''}`}>
			<Box className='button-wrapper'>
				<Button
					onClick={editHandler}
					className='edit-btn'
					bgColor="#ff6f47"
					w={100}
					h={100}
					maxW={12}
					maxH={14}
					borderLeftRadius="0.375rem"
					borderRightRadius="0"
				>
					<EditIcon />
				</Button>
				<Button
					onClick={completeHandler}
					className={`${todo.done ? 'uncomplete-btn' : 'complete-btn'} `}
					bgColor={`${todo.done ? '#d33f3f' : 'rgb(11, 212, 162)'}`}
					h={100}
					w={100}
					maxW={12}
					maxH={14}
					borderRadius="none"
				>
					{todo.done
						? <CloseIcon />
						: <CheckIcon />
					}
				</Button>
			</Box>
			<Input
				size="lg"
				variant="custom"
				borderRadius="none"
				onDoubleClick={editHandler}
				marginLeft="10px"
				marginRight="10px"
				px="0.5rem"
				cursor="pointer"
				onKeyDown={keydownBlurInput}
				onBlur={inputOnBlur}
				ref={inputFocus}
				readOnly={readOnly}
				className={`todo-item ${todo.done ? "completed" : ''} ${readOnly ? '' : 'todo-item-border'}`}
				value={todo.name}
			/>
			<Text className='todo-item-date'>
				{('0' + (+new Date(todo.createdAt).getDate())).slice(-2) + '-' + ('0' + (+new Date(todo.createdAt).getMonth() + 1)).slice(-2) + '-' + +new Date(todo.createdAt).getFullYear()}
			</Text>
			<Box className='button-wrapper'>
				<Button
					onClick={deleteHandler}
					// className='trash-btn'
					borderRightRadius="0.375rem"
					borderLeftRadius="0"
					bgColor="#ff6f47"
					w={100}
					h={100}
					maxW={12}
					maxH={14}
					color="#fff"
				>
					<DeleteIcon />
				</Button>
			</Box>
		</ListItem>
	)
}
export default Todo;