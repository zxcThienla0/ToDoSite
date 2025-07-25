import { useState } from "react"


export const Register = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <section className="m-auto w-200 ">
                <div className="pt-3 pb-3 mt-10 bg-[#e1e1e1] border-1 border-[#81818189] rounded-xl">
                    <h1 className="flex justify-center ">Регистрация</h1>
                    <form action="" className="mt-5 px-5">
                        <input
                            type="text"
                            id="todo"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
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
                            placeholder="Логин" />
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
                            placeholder="Пароль" />
                        <button type="submit" className="flex w-auto h-[40px] bg-[#19ff0d89] items-center justify-center cursor-pointer text-[16px] mt-3 px-3">
                            Зарегистрироваться
                        </button>
                    </form>

                </div>

            </section>
        </>
    )
}