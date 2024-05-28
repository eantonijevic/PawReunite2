import * as React from 'react'
import {useState} from 'react'
import {Link, useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router";
import {useMySystem} from "../service/mySystem";

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

export const KennelLogin = () => {
    const [Kennel,Set_Kennel] = useState('')
    const [Kn_name,Set_Knname] = useState('')
    const [Password,Set_password] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const [searchParams, setSearchParams] = useSearchParams();
    const isOk = searchParams.get("ok")

    function Kennel_Log(credentials) {
        mySystem.Kennel_login(
            credentials,
            (token) => {
                setToken(token);
                navigate(`/home?username=${credentials.email}`, { replace: true });
            },
            (msg) => {
                setErrorMsg(msg);
                Set_Knname('');
                Set_password('');
                setSearchParams('');
            }
        );
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await Kennel_Log({
            email: Kn_name,
            password: Password
        })
    }

    const KenameChange = (event) => {
        Set_Knname(event.target.value)
    }

    const PasswordChange = (event) => {
        Set_password(event.target.value)
    }

    return (
        <div>
            {isOk && <div className="alert alert-success" role="alert">User created</div>}
            {errorMsg && <div className="alert alert-warning" role="alert">{errorMsg}</div>}

            <h1>Association </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email"
                           value={Kn_name}
                           onChange={KenameChange}
                           placeholder="name@example.com"
                           name="email"/>
                </div>

                <div>
                    <input type="Password"
                           value={Password}
                           onChange={PasswordChange}
                           placeholder="Password"/>
                </div>

                <button type="submit">Sign in</button>
            </form>
            <Link to="/register">Sign up</Link>
        </div>
    )}