import React from 'react';
import { Button } from '@blueprintjs/core';
import { useState, useEffect } from 'react';
import '../App.css'

function TodoList() {
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [todoEditing, setTodoEditing] = useState(null)
    const [editingText, setEditingText] = useState('')

    useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
            setTodos(loadedTodos);
        }
    }, []);

    useEffect(() => {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }, [todos]);

    function submitForm(e) {
        e.preventDefault()

        const newTodo = {
            id: new Date().getTime(),
            text: todo,
            completed: false,
        }

        setTodos([...todos].concat(newTodo))
        setTodo("")
    }

    function deleteTodo(id) {
        const updatedTodos = [...todos].filter((todo) => todo.id !== id)

        setTodos(updatedTodos)
    }

    function submitEdits(id) {
        const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }

    function toggleComplete(id) {
        let updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }
    return (
        <div>
            <div className="vh-100 shadow-5 dt w-100 center bp3-card mw6">
                <div className="dtc v-mid tc black mw6">
                    <p className="f2 black b tc">My todays task list</p>
                    <p className="f4 blue b tc mb4"> {new Date().toDateString()} </p>
                    {/* <p className="f4 blue b tl"> task added: {todo} </p> */}
                    {/* <p className="f4 blue b tl"> task left: {} </p> */}
                    <form onSubmit={submitForm} className="center tc ">
                        <div className="tc center">
                            <input
                                className="center bp3-input bp3-large bp3-round"
                                type="text"
                                placeholder="Text input"
                                dir="auto"
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                            />

                            <Button
                                className="_btn_"
                                type="submit"
                                rightIcon="add"
                                intent="success"
                                text="add task"
                                minimal
                                large
                                disabled={todo === "" ? true : false}
                                onClick={submitForm}
                            />
                        </div>
                        {todos.map((todo, idx) =>
                            <div key={idx} className="w-100 center tc pa3 flex items-center">
                                {todoEditing === todo.id ? (
                                    <input
                                        className="center bp3-input bp3-large bp3-round"
                                        type="text"
                                        placeholder="Text input"
                                        dir="auto"
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                    />
                                )
                                    :
                                    <div className="w-70 f4">
                                        {todo.completed === true ?
                                            <span className="strike">{todo.text}</span>
                                            :
                                            <span className="b">{todo.text}</span>
                                        }
                                    </div>
                                }

                                <div className="w-10">
                                    <Button
                                        className="_btn_"
                                        icon={todo.completed === true ? "tick-circle" : "time"}
                                        minimal
                                        large
                                        disabled={((todo.completed !== false) && (editingText === '')) ? true : false}
                                        intent={todo.completed !== false ? "success" : "primary"}
                                        onClick={() => toggleComplete(todo.id)}
                                    />
                                </div>
                                <div className="w-10">
                                    {todo.id === todoEditing ?
                                        <Button
                                            className="_btn_"
                                            icon="new-object"
                                            minimal
                                            large
                                            disabled={(todoEditing !== '') && (editingText !== '') ? false : true}
                                            intent="success"
                                            onClick={() => submitEdits(todo.id)}
                                        />
                                        :
                                        <Button
                                            className="_btn_"
                                            icon="edit"
                                            minimal
                                            large
                                            disabled={(todo.completed === true) ? true : false}
                                            intent="warning"
                                            onClick={() => setTodoEditing(todo.id)}
                                        />

                                    }

                                </div>
                                <div className="w-10">
                                    <Button
                                        className="_btn_"
                                        icon="delete"
                                        minimal
                                        large
                                        // disabled
                                        intent="danger"
                                        onClick={() => deleteTodo(todo.id)}
                                    />
                                </div>
                            </div>
                        )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TodoList