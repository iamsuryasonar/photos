import { useState, useContext } from 'react'
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

function LogIn() {

    const { isLoading, login } = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        email: 'iamsuryasonar@gmail.com',
        password: '11111111',
    });

    function onChangeHandler(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    }

    function onSubmitHandler(e) {
        e.preventDefault();
        login(inputs);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back 👋</h2>
                <p className="text-center text-gray-500">Please sign in to your account</p>

                <div className="flex flex-col gap-5">
                    <div className='flex flex-col items-start'>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            placeholder="you@example.com"
                            value={inputs.email}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className='flex flex-col items-start'>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            placeholder="••••••••"
                            value={inputs.password}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
                    </div>

                    <button
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 cursor-pointer"
                        onClick={onSubmitHandler}
                        disabled={isLoading}
                    >
                        {!isLoading ? "Sign In" : "Loading..."}

                    </button>
                </div>

                <p className="text-sm text-center text-gray-600">
                    Don't have an account?
                    <Link to="/register" className="pl-2 text-indigo-600 font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LogIn