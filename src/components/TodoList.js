import React from 'react'
import Todo from './Todo';

const ToDoList = ({todos, setTodos, filteredTodos}) => {
    return(
        <div className='todo-container'>
            <ul className='todo-list'>
                {filteredTodos.map(todo => (
                    <Todo 
                        setTodos={setTodos} 
                        todos={todos}
                        todo={todo}
                        text={todo.text} 
                        key={todo.id}
                        // date={Date.now()}
                    />
                ))}
            </ul>
        </div>
    )
}
export default ToDoList;