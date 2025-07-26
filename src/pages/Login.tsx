import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useUserTodos } from "../firebase/useUserTodo";

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, } = useUserTodos()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess('Успешный вход!');
        } catch (err: any) {
            setError(true);
            setSuccess('Ошибка входа');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="m-auto max-w-200 ">
                <div className="pt-3 pb-3 mt-10 bg-[#e1e1e1] border-1 border-[#81818189] rounded-xl">
                    <h1 className="flex justify-center ">{user ? "Войти в другой аккаунт" : "Войти"}</h1>
                    <form onSubmit={handleSubmit} className="mt-5 px-5">
                        <input
                            type="text"
                            id="todo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            placeholder="Почта" required />
                        <input
                            type="password"
                            id="todo"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                                    px-4 py-3 mt-3
                                    border-2 border-[#81818189]
                                    rounded-lg
                                    text-base
                                    transition-all duration-200
                                    focus:outline-none
                                    focus:border-blue-500
                                    placeholder-[#818181f9]
                                    w-full
                                    "
                            placeholder="Пароль" required />
                        <button type="submit" className="flex w-auto h-[40px] bg-[#19ff0d89] items-center justify-center cursor-pointer text-[16px] mt-3 px-3">
                            {loading ? 'Вход...' : 'Войти'}
                        </button>
                    </form>
                </div>
            </section>
            <div className="flex justify-center">
                <div className={error ? "text-red-500" : "text-green-500"}>
                    <p className="text-2xl"> {success}</p>
                </div>
            </div>
        </>
    )
}