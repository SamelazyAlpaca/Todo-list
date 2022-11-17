import React from 'react'

const Pagination = ({todosPerPage, currentPage, totalTodos, paginateHandler, nextPage, prevPage}) => {
    
    const pageNumbers = []
    for ( let i= 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
          <ul className='pagination'>
            <button className={`btn btn-primary ${(currentPage == pageNumbers[0]) ? 'disabled' : ''}`} onClick={prevPage}>Prev</button>
             {
                 pageNumbers.map(number => (
                    <li className='page-item' key={number}>
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
             <button className={`btn btn-primary ${(currentPage == pageNumbers.length) ? 'disabled' : ''}`} onClick={nextPage}>Next</button>
         </ul>
    )
}

export default Pagination;