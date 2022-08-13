import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {filterType} from "./App";

type toDoListType = {
    title: string
    tasks: tasksType[]
    removeTask:(id:string)=> void
    filterTask:(value:filterType)=> void
    addNewTask:(title:string)=> void
    changeTaskStatus:(id:string, isDone:boolean)=> void
    filter: filterType
}
type tasksType = {
    id:string
    title:string
    isDone:boolean
}

const ToDoList = (props:toDoListType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addNewTaskHandler = ()=>{
        props.addNewTask(title)
    }
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>)=>{if (e.key === 'Enter') {
        if (title.trim() !== '') {
            props.addNewTask(title.trim())
            setTitle('')
        } else  {
            setError('Title is required !')
        }
    }}
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onClickAllHandler = ()=>{props.filterTask('all')}
    const onClickActiveHandler = ()=>{props.filterTask('active')}
    const onClickCompletedHandler = ()=>{props.filterTask('completed')}
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error': ''}
                />
                <button onClick={addNewTaskHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t)=>{
                    const onClickHandler = ()=>{props.removeTask(t.id)}
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
                        let newTaskChange = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newTaskChange)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <button onClick={onClickHandler}>x</button>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active' : ''} onClick={onClickAllHandler}>All</button>
                <button className={props.filter === 'active' ? 'active' : ''} onClick={onClickActiveHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active' : ''} onClick={onClickCompletedHandler}>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;