import React, { KeyboardEventHandler, MouseEventHandler, useRef, useState } from 'react'
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
import { TodoType } from '../types/types'

const Todo = ({ setError, todo, getTodos }: TodoType) => {

	const [readOnly, setReadOnly] = useState<boolean>(true)
	const inputFocus = useRef<HTMLInputElement>(null)

	const deleteHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
		const completeButton = e.currentTarget
		try {
			completeButton.disabled = true
			await deleteOneTask(todo)
			await getTodos()
		} catch (error: any) {
			if (completeButton.disabled === true) {
				completeButton.disabled = false
			}
			setError(error.response.data.message)
		}
	}

	const completeHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
		const completeButton = e.currentTarget
		try {
			completeButton.disabled = true
			await patchCompleteTask(todo, inputFocus)
			await getTodos()
			completeButton.disabled = false
		} catch (error: any) {
			console.log(error);
			completeButton.disabled = false
			setError(error.response.data.message)
		}
	}

	const editHandler = () => {
		setReadOnly(false)
		inputFocus.current!.focus()
	}

	const keydownBlurInput: KeyboardEventHandler<HTMLInputElement> = async (e) => {
		const currentInput = inputFocus.current!
		if (currentInput.readOnly === false && e.key === 'Escape') {
			inputFocus.current!.value = inputFocus.current!.defaultValue
			setReadOnly(true)
			currentInput.blur()
		}
		if (currentInput.readOnly === false && e.key === 'Enter') {
			try {
				setReadOnly(true)
				if (currentInput.value !== currentInput.defaultValue) {
					await patchNameTask(todo, inputFocus)
					await getTodos()
				}
				currentInput.blur()
			} catch (error: any) {
				currentInput.value = currentInput.defaultValue
				setError(error.response.data.message)
			}
		}
	}

	return (
		<ListItem
			borderRadius="0.375rem"
			className={`todo ${todo.done ? 'todo-completed' : ''}`}>
			<Box
				display="flex"
			>
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