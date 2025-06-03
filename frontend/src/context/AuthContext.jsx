import { createContext, useEffect, useState } from 'react'
import { BASE_URL } from '../constants';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function register(credentials) {
        setIsLoading(true);
        axios.post(`${BASE_URL}/api/auth/register`, credentials, {
            "Content-Type": "application/json",
        }).then((result) => {
            navigate('/login');
        }).catch((e) => {
            let message = e?.response?.data?.message || "Error occured!";
            setError(message)

            setTimeout(() => {
                setError('');
            }, 2000)
        }).finally(() => {
            setIsLoading(false);
        });
    }

    async function login(credentials) {
        setIsLoading(true);
        axios.post(`${BASE_URL}/api/auth/login`, credentials, {
            "Content-Type": "application/json",
        }).then((result) => {
            localStorage.setItem('photos_auth', JSON.stringify(result.data.data));
            setToken(result.data.data.token);
            setUser(result.data.data.user);
        }).catch((e) => {
            let message = e?.response?.data?.message || "Error occured!";
            setError(message)

            setTimeout(() => {
                setError('');
            }, 2000)
        }).finally(() => {
            setIsLoading(false);
        });
    }

    async function logout() {
        localStorage.removeItem('photos_auth');
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('photos_auth'));

        if (data) {
            setToken(data.token);
            setUser(data.user);
        }

    }, [])

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ error, isLoading, user, token, isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider