import { useState } from "react";
import NotOkey from "../img/cross.svg";
import Okey from "../img/tick.svg";
import { useUserTodos } from "../firebase/useUserTodo";

export const TodoList = () => {
    const [inputValue, setInputValue] = useState('');
    const { todos, loading, addTodo, toggleTodo, removeTodo, user } = useUserTodos();

    if (!user) {
        return (
            <section className="container">
                <div className="text-center py-10">
                    <h2 className="text-2xl mb-4">Войдите в аккаунт</h2>
                    <p>Чтобы использовать список задач</p>
                </div>
            </section>
        );
    }

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            addTodo(inputValue);
            setInputValue('');
        }
    };

    if (loading) {
        return (
            <section className="container">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </section>
        );
    }

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
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
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
                            <button
                                onClick={handleAddTodo}
                                className="py-3 px-9 text-1xl rounded-md bg-[#1B7DFF] ml-5 mb-5 text-white cursor-pointer"
                            >
                                Добавить
                            </button>
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
                                        className="flex mb-3 border-[#81818189] border-1 items-center"
                                    >
                                        <span
                                            className={`flex-1 pl-1  pt-0.5 ${todo.completed ? 'text-gray-500 line-through' : 'text-black'} break-words`}
                                        >
                                            {todo.title}
                                        </span>
                                        <button
                                            onClick={() => toggleTodo(todo.id, !todo.completed)}
                                            className="flex text-white w-[30px] h-[30px] bg-[#c9c9c989] items-center justify-center cursor-pointer text-[16px] "
                                        >
                                            <img src={Okey} alt="Accept" className="w-[20px] h-[20px]" />
                                        </button>
                                        <button
                                            onClick={() => removeTodo(todo.id)}
                                            className="flex w-[30px] h-[30px] bg-[#c9c9c989] items-center justify-center cursor-pointer text-[16px] ml-1"
                                        >
                                            <img src={NotOkey} alt="Delete" className="w-[20px] h-[20px]" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {todos.length > 0 && (
                    <div className="mt-4 text-sm text-gray-600">
                        Всего задач: {todos.length} |
                        Выполнено: {todos.filter(t => t.completed).length}
                    </div>
                )}
            </section>
        </>
    )
}