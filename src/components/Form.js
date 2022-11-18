import {useRef} from 'react'

const Form = ({ todos, setTodos, setStatus, setSelectedSort}) => {
    const ref =useRef(null)

    const submitTodoHandler = (e) => {
        e.preventDefault()
        setTodos([
            ...todos, 
            {
                title: ref.current.value, 
                completed: false, 
                id: todos.length + 1 , 
                date: Date.now(),
                createdDate: new Date().getDate() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getFullYear(),
            }
        ])
        ref.current.value=''
    }
    const statusHandler = (e) => {
        setStatus(e.target.value)
    }

    return(
        <form>
            <div className='form-wrapper'>
            <input 
                ref={ref}
                type="text" 
                className="todo-input" 
            />
            <button 
                onClick={submitTodoHandler} 
                className="todo-button" 
                type="submit" 
            >
                <i className='fas fa-plus-square'></i>
            </button>
            </div>
            <div className='select'>
                <select onChange={statusHandler} name="todo" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
            <div className="sort-wrapper">
                <p>Sort by date</p>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setSelectedSort('up')
                        }}>
                        <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setSelectedSort('down')
                        }}>
                        <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    </button>
                </div>
        </form>
    )
}
export default Form;