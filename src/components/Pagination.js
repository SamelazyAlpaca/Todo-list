import React from 'react'

const Pagination = ({ currentPage, paginateHandler, nextPage, prevPage, pageNumbers}) => {
    
    return (
          <ul className='pagination'>
            <button className={`btn btn-primary ${(currentPage == pageNumbers[0]) ? 'disabled' : ''}`} onClick={prevPage}>Prev</button>
             {
                 pageNumbers.map(number => (
                    <li className={`page-item ${currentPage == number ? 'page-item-current' : ''}`} key={number}>
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