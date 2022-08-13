import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type filterType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id:v1(), title:'html', isDone: true},
        {id:v1(), title:'css', isDone: true},
        {id:v1(), title:'js', isDone: false}
    ])

    function removeTask (id:string) {
        tasks = tasks.filter(t=> t.id !== id)
        setTasks(tasks)
    }

    let [filter, setFilter] = useState<filterType>('all')
    let filteredTask = tasks
    if (filter === "active") {
        filteredTask = tasks.filter(t=> !t.isDone)
    }
    if (filter === "completed") {
        filteredTask = tasks.filter(t=> t.isDone)
    }
    function filterTask(value:filterType) {
        setFilter(value)
    }

    function addNewTask (title:string) {
        let task = {id:v1(), title:title, isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    function changeTaskStatus(id:string, isDone:boolean) {
        let taskChange = tasks.find(t=> t.id === id)
        if(taskChange) {
            taskChange.isDone = isDone
        }
        setTasks([...tasks])
    }

    return (
        <div className="App">
            <ToDoList title={'what to do ?'}
                      tasks={filteredTask}
                      removeTask={removeTask}
                      filterTask={filterTask}
                      addNewTask={addNewTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}

            />
        </div>
    );
}

export default App;
