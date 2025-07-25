import { useState, useEffect } from "react"
import NotOkey from "../img/cross.svg"
import Okey from "../img/tick.svg"

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        sessionStorage.setItem('todos', JSON.stringify(todos));

    }, [todos]);

    const addTodo = () => {
        if (inputValue.trim()) {
            const newTodo: Todo = {
                id: Date.now(),
                title: inputValue,
                completed: false
            };
            setTodos(prev => [...prev, newTodo]);
            setInputValue('');
        }
    };

    const deleteTodo = (id: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id: number) => {
        setTodos(prev =>
            prev.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        );
    };
    return (
        <>
            <section className="container">
                <h1 className="text-5xl">ToDo приложение</h1>
                <div className="mt-5">
                    <div className="bg-[#d6d6d6] border-t-1 border-r-1 border-l-1 border-[#81818189] rounded-t-xl">
                        <p className="p-5">Добавить новую задачу</p>
                    </div>
                    <div className="bg-[#e1e1e1] border-1 border-[#81818189] rounded-b-xl">
                        <div className="w-full">
                            <div className="p-5">
                                <input
                                    type="text"
                                    id="todo"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                                    className="
                                    px-4 py-3
                                    border-2 border-[#81818189]
                                    rounded-lg
                                    text-base
                                    transition-all duration-200
                                    focus:outline-none
                                    focus:border-blue-500
                                    placeholder-[#818181f9]
                                    w-full
                                    "
                                    placeholder="Введите текст задачи..."
                                />
                            </div>
                            <button onClick={addTodo} className="py-3 px-9 text-1xl rounded-md bg-[#1B7DFF] ml-5 mb-5 text-white">Добавить</button>
                        </div>
                    </div>
                </div>
                <h2 className="mt-5 text-3xl">Список задач</h2>
                <div className="mt-5">
                    <div className="bg-[#e1e1e1] border-1 border-[#81818189] rounded-xl">
                        <div className="p-5">
                            {todos.length === 0 ? (
                                <p style={{ textAlign: 'center', color: '#666' }}>
                                    Нет задач. Добавьте первую!
                                </p>
                            ) : (
                                todos.map(todo => (
                                    <div
                                        key={todo.id}
                                        className="flex mb-3 border-[#81818189] border-1"
                                    >
                                        <span
                                            style={{
                                                flex: 1,
                                                textDecoration: todo.completed ? 'line-through' : 'none',
                                                color: todo.completed ? '#666' : 'black',
                                                paddingLeft: '5px',
                                                paddingTop: '2px'
                                            }}
                                        >
                                            {todo.title}
                                        </span>
                                        <button
                                            onClick={() => toggleTodo(todo.id)}
                                            className="flex text-white w-[30px] h-[30px] bg-[#c9c9c989] items-center justify-center cursor-pointer text-[16px] "
                                        >
                                            <img src={Okey} alt="Accept" className="w-[20px] h-[20px]" />
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="flex w-[30px] h-[30px] bg-[#c9c9c989] items-center justify-center cursor-pointer text-[16px] ml-1"
                                        >
                                            <img src={NotOkey} alt="Delite" className="w-[20px] h-[20px]" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}