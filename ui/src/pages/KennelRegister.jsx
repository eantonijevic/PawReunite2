import * as React from 'react'
import {Link,useNavigate} from "react-router-dom";
import {useMySystem} from "../service/mySystem";
import {useState} from "react";

export const KennelRegister = () =>{
    const [Kennel,Set_Kennel] = useState('')
    const [Kn_name,Set_Knname] = useState('')
    const [Password,Set_password] = useState('')
    const [errorMsg, setErrorMsg] = useState(undefined)
    const navigate = useNavigate();
    const mySystem = useMySystem();

    const handleSubmit = async e =>{
        e.preventDefault();
        registerKennel({
            name: Kennel,
            email: Kn_name,
            password: Password
        })
    }

    const resetForm = () => {
        Set_Kennel('')
        Set_Knname('')
        Set_password('')
    }

    const registerKennel = (user) =>{
        mySystem.Kennel_create(
            user,
            () => navigate("/existing-association?ok=true"),
            () => {
                setErrorMsg('User already exists!')
                resetForm();
            }
        )
    }

    const KennelChange = (event) => {
        Set_Kennel(event.target.value)
    }
    const usernameChange = (event) => {
        Set_Knname(event.target.value)
    }

    const passwordChange = (event) => {
        Set_password(event.target.value)
    }

    return (
        <div>
            {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
            <form onSubmit={handleSubmit}>
                <h1>New Association</h1>
                <div>
                    <input type="name"
                           placeholder="¿Association name?"
                           value={Kennel}
                           name="Kennel"
                           onChange={KennelChange}/>
                </div>
                <div>
                    <input type="email"
                           placeholder="name@example.com"
                           value={Kn_name}
                           name="email"
                           onChange={usernameChange}/>
                </div>

                <div>
                    <input type="password"
                           id="floatingPassword"
                           placeholder="Password"
                           name="password"
                           value={Password}
                           onChange={passwordChange}/>
                </div>

                <div>
                    <button type="submit">Create</button>
                </div>

                <div>
                    <button type="/existing_association">Unite</button>
                </div>
            </form>
        </div>
    )
}