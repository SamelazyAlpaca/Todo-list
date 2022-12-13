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

const Todo = ({ setError, todo, getTodos }) => {

	const [readOnly, setReadOnly] = useState(true)
	const inputFocus = useRef(null)

	const deleteHandler = async (e) => {
		try {
			e.target.disabled = true
			await deleteOneTask(todo)
			await getTodos()
		} catch (error) {
			setError(error.response.data.message)
		}
	}

	const completeHandler = async (e) => {
		try {
			e.target.disabled = true
			await patchCompleteTask(todo, inputFocus)
			await getTodos()
			e.target.disabled = false
		} catch (error) {
			e.target.disabled = false
			setError(error.response.data.message)
		}
	}

	const editHandler = () => {
		setReadOnly(false)
		inputFocus.current.focus()
	}

	const keydownBlurInput = async (e) => {
		if (e.target.readOnly === false && e.key === 'Escape') {
			inputFocus.current.value = e.target.defaultValue
			setReadOnly(true)
			e.target.blur()
		}
		if (e.target.readOnly === false && e.key === 'Enter') {
			try {
				setReadOnly(true)
				e.target.blur()
				await patchNameTask(todo, inputFocus)
				await getTodos()
			} catch (error) {
				inputFocus.current.value = e.target.defaultValue
				setError(error.response.data.message)
			}
		}
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