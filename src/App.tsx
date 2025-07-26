import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./index.css"

import { useUserTodos } from "./firebase/useUserTodo";

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TodoList } from './pages/TodoList';

function App() {
  const { user, exitUser } = useUserTodos()
  const basename = process.env.NODE_ENV === 'production'
    ? '/ToDoSite' 
    : '';
  return (
    <>
      <Router basename={basename}>
        <div>
          <div className="bg-gray-500 text-white p-4">
            <nav className='container  flex justify-between'>
              <ul className="flex space-x-4">
                <li><Link to="/" className="hover:underline">Главная</Link></li>
              </ul>
              <ul className="flex w-auto">
                {!user ? (
                  <>
                    <li><Link to="/Register" className="hover:underline pr-5">Регистрация</Link></li>
                    <li><Link to="/signUp" className="hover:underline">Войти</Link></li>
                  </>
                ) : (
                  <>
                    <li className="pr-5">{user.email}</li>
                    <li>
                      <button
                        onClick={exitUser}
                        className="hover:underline text-sm cursor-pointer"
                      >
                        Выйти
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
          <main className="p-4">
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/signUp" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  )
}

export default App
