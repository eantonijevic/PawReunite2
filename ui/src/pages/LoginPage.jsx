import * as React from 'react'
import {useState, useEffect} from 'react'
import {Link, useSearchParams, useNavigate} from "react-router-dom";
import {useMySystem} from "../service/mySystem";

function getToken() {
    return JSON.parse(sessionStorage.getItem('token'));
}

function getEmail() {
    return sessionStorage.getItem('email');
}

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const navigate = useNavigate()
    const mySystem = useMySystem()
    const [searchParams, setSearchParams] = useSearchParams();
    const isOk = searchParams.get("ok")

    useEffect(() => {
        const token = getToken();
        const email = getEmail();
        if (token && email) {
            // User is already logged in, redirect to home page
            navigate(`/home?username=${email}`, { replace: true });
        }
    }, [navigate]);

    function loginUser(credentials) {
        mySystem.login(
            credentials,
            (token) => {
                setToken(token, credentials.email);
                navigate(`/home?username=${credentials.email}`, { replace: true });
            },
            (msg) => {
                setErrorMsg(msg);
                setUsername('');
                setPassword('');
                setSearchParams('');
            }
        );
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({
            email: username,
            password: password
        })
    }

    const usernameChange = (event) => {
        setUsername(event.target.value)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div>
            {isOk && <div className="alert alert-success" role="alert">User created</div>}
            {errorMsg && <div className="alert alert-warning" role="alert">{errorMsg}</div>}

            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email"
                           value={username}
                           onChange={usernameChange}
                           placeholder="name@example.com"
                           name="email"/>
                </div>

                <div>
                    <input type="password"
                           value={password}
                           onChange={passwordChange}
                           placeholder="Password"/>
                </div>

                <button type="submit">Sign in</button>
            </form>
            <Link to="/register">Sign up</Link>
        </div>
    )}

function setToken(userToken, email) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    sessionStorage.setItem('email', email);
}