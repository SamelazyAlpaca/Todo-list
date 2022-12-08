import axios from 'axios'
import React, { useRef, useState } from 'react'
import {
	Box,
	Button,
	Input,
	ListItem,
	Text,
} from '@chakra-ui/react'
import {
	EditIcon,
	DeleteIcon,
	CheckIcon,
	CloseIcon
} from '@chakra-ui/icons'
import { deleteOneTask, patchCompleteTask, patchNameTask } from '../services/axios-instance'

const Todo = ({ todo, todos, getTodos, setCurrentPage }) => {

	const [readOnly, setReadOnly] = useState(true)
	const inputFocus = useRef(null)

	const deleteHandler = async () => {
		try {
			await deleteOneTask(todo)
			getTodos()
			if (todos.length === 1) {
				setCurrentPage(prev => prev - 1)
			}
		} catch (error) {
			switch (error.response.status) {
				case 404:
					console.log('Error 404:', error.response.statusText);
					alert('Задача не найдена, не получилось удалить')
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

	const completeHandler = async () => {
		console.log(todo);
		try {
			await patchCompleteTask(todo, inputFocus)
			getTodos()
		} catch (error) {
			switch (error.response.status) {
				case 404:
					console.log('Error 404:', error.response.statusText);
					alert('Не получилось редактировать задачу')
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

	const editHandler = (e) => {
		todos.find((item) => {
			if (item.uuid === todo.uuid) {
				setReadOnly(false)
				inputFocus.current.focus()
			}
		})
	}

	const keydownBlurInput = async (e) => {
		if (e.target.readOnly === false && e.key === 'Escape') {
			inputFocus.current.value = e.target.defaultValue
			setReadOnly(true)
			e.target.blur()
		} else if (e.target.readOnly === false && e.key === 'Enter') {
			try {
				await patchNameTask(todo, inputFocus)
				getTodos()
			} catch (error) {
				switch (error.response.status) {
					case 404:
						console.log('Error 404:', error.response.statusText);
						alert('Не получилось редактировать задачу')
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
			e.target.blur()
		}
	}

	const inputOnBlur = (e) => {
		inputFocus.current.value = e.target.defaultValue
		setReadOnly(true)
	}

	return (
		<ListItem
			borderRadius="0.375rem"
			className={`todo ${todo.done ? 'todo-completed' : ''}`}>
			<Box>
				<Button
					onClick={editHandler}
					className='edit-btn'
					bgColor="#ff6f47"
					w="100%"
					h="100%"
					minW="none"
					minH="none"
					maxW={{ sm: 4, md: 12 }}
					maxH={{ sm: 12, md: 14 }}
					borderLeftRadius="0.375rem"
					borderRightRadius="0"
					_hover={{ background: '' }}
				>
					<EditIcon />
				</Button>
				<Button
					onClick={completeHandler}
					className={`${todo.done ? 'uncomplete-btn' : 'complete-btn'} `}
					bgColor={`${todo.done ? '#d33f3f' : 'rgb(11, 212, 162)'}`}
					h="100%"
					w="100%"
					minW="none"
					minH="none"
					maxW={{ sm: 4, md: 12 }}
					maxH={{ sm: 12, md: 14 }}
					borderRadius="none"
					_hover={{ background: '' }}
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
				h={8}
				cursor="pointer"
				onKeyDown={keydownBlurInput}
				onBlur={inputOnBlur}
				ref={inputFocus}
				readOnly={readOnly}
				className={`todo-item ${todo.done ? "completed" : ''} ${readOnly ? '' : 'todo-item-border'}`}
				defaultValue={todo.name}
			/>
			<Text
				fontSize={{ sm: "0.9rem", md: "1rem", lg: "1.2rem" }}
				fontWeight="400"
				letterSpacing="-1px"
				marginRight="10px"
			>
				{('0' + (+new Date(todo.createdAt).getDate())).slice(-2) + '-' + ('0' + (+new Date(todo.createdAt).getMonth() + 1)).slice(-2) + '-' + +new Date(todo.createdAt).getFullYear()}
			</Text>
			<Box>
				<Button
					onClick={deleteHandler}
					className='trash-btn'
					borderRightRadius="0.375rem"
					borderLeftRadius="0"
					bgColor="#ff6f47"
					w="100%"
					h="100%"
					minW="none"
					minH="none"
					maxW={{ sm: 4, md: 12 }}
					maxH={{ sm: 12, md: 14 }}
					color="#fff"
					_hover={{ background: '' }}
				>
					<DeleteIcon />
				</Button>
			</Box>
		</ListItem>
	)
}
export default Todo;