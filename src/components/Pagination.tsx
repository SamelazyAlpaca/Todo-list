import React, { useMemo } from 'react'
import { Button, Flex, Link, Text } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { PaginationType } from '../types/types'

const Pagination = ({ todos, error, todosCount, todosPerPage, currentPage, status, setCurrentPage }: PaginationType) => {

	const paginateHandler = (pageNumber: number) => setCurrentPage(pageNumber)
	const nextPage = () => setCurrentPage((prev: number) => prev + 1)
	const prevPage = () => setCurrentPage((prev: number) => prev - 1)

	const pageNumbers: number[] = []
	const paginationMemo = useMemo(() => {
		for (let i = 1; i <= Math.ceil(todosCount / todosPerPage); i++) {
			pageNumbers.push(i)
		}
	}, [todos, status, currentPage, error, todosCount])

	return (
		<Flex justify="center" pb={5}>
			<Button
				disabled={currentPage === pageNumbers[0]}
				onClick={prevPage}
				h="100%"
				bg="#0d6efdbf"
				px="0.5rem"
				py="0"
				fontSize="xs"
				minW={7}
				color="#fff"
				borderRadius="0.3rem 0 0 0.3rem"
				_hover={{ bg: "#0d6efd" }}
			>
				<ArrowLeftIcon
					h="auto"
					py={2}
				/>
			</Button>
			{
				pageNumbers.map(number => (
					<Text className={`${currentPage === number ? 'page-item-current' : ''}`} key={number}>
						<Link
							href="#"
							px={2}
							bg="#fff"
							display="flex"
							alignItems="center"
							h="100%"
							color="#0d6efdbf"
							borderRight="1px solid #00000024"
							_hover={{
								textDecoration: "none", bg: "#dee2e6cf"
							}}
							onClick={(e) => {
								e.preventDefault()
								paginateHandler(number)
							}}
						>
							{number}
						</Link>
					</Text>
				))
			}
			<Button
				disabled={currentPage === pageNumbers.length}
				onClick={nextPage}
				h="100%"
				bg="#0d6efdbf"
				px="0.5rem"
				py="0"
				fontSize="xs"
				minW={7}
				color="#fff"
				borderRadius="0 0.3rem 0.3rem 0"
				_hover={{ bg: "#0d6efd" }}
			>
				<ArrowRightIcon
					h="auto"
					py={2}
				/>
			</Button>
		</Flex>
	)
}

export default Pagination;