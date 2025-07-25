import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./index.css"

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TodoList } from './pages/TodoList';

function App() {

  return (
    <>
      <Router>
        <div >
          <div className="bg-gray-500 text-white p-4">
            <nav className='container  flex justify-between'>
              <ul className="flex space-x-4">
                <li><Link to="/" className="hover:underline">Главная</Link></li>
              </ul>
              <ul className="flex w-auto">
                <li><Link to="/Register" className="hover:underline">Регистрация</Link></li>
                <li><Link to="/signUp" className="hover:underline ml-2.5">Войти</Link></li>
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
