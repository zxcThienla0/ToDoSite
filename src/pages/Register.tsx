import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";


export const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        setSuccess('');

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess('Регистрация прошла успешно! Добро пожаловать!');
            setError(false);
        } catch (err: any) {
            setError(true);
            setSuccess('Ошибка регистрации');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <section className="m-auto w-200 ">
                <div className="pt-3 pb-3 mt-10 bg-[#e1e1e1] border-1 border-[#81818189] rounded-xl">
                    <h1 className="flex justify-center ">Регистрация</h1>
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
                            placeholder="Почта"
                            required />
                        <input
                            type="text"
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
                            placeholder="Пароль"
                            required
                            minLength={6} />
                        <button type="submit" className="flex w-auto h-[40px] bg-[#19ff0d89] items-center justify-center cursor-pointer text-[16px] mt-3 px-3">
                            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
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