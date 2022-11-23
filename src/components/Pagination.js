import React from 'react'

const Pagination = ({ currentPage, pageNumbers, setCurrentPage }) => {
	const paginateHandler = pageNumber => setCurrentPage(pageNumber)
	const nextPage = () => setCurrentPage(prev => prev + 1)
	const prevPage = () => setCurrentPage(prev => prev - 1)

	return (
		<ul className='pagination'>
			<button
				className='btn btn-primary'
				disabled={currentPage === pageNumbers[0]}
				onClick={prevPage}>
				<i className="fa fa-angle-double-left" aria-hidden="true" />
			</button>
			{
				pageNumbers.map(number => (
					<li className={`page-item ${currentPage === number ? 'page-item-current' : ''}`} key={number}>
						<a
							href="#"
							className='page-link'
							onClick={(e) => {
								e.preventDefault()
								paginateHandler(number)
							}}
						>
							{number}
						</a>
					</li>
				))
			}
			<button
				className='btn btn-primary'
				disabled={currentPage === pageNumbers.length}
				onClick={nextPage}>
				<i className="fa fa-angle-double-right" aria-hidden="true" />
			</button>
		</ul>
	)
}

export default Pagination;