/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })


    const onChangeFunc = (e) => {
        // console.log(e.target.name)
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/api/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    // "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwOWZjMDA5YjZlMjBhNzlkMWRmZWQ3In0sImlhdCI6MTY5NTE1Mzk5MH0.TmFBHNzw4d31bu-enQiUnDdcOrIHnZKOIwd15NMPeCg',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json()
            console.log(json)
            // console.log(json.error)
            // console.log(json[0].status)
            if (json.error === "Please try to login with correct credentials") {
                alert("Please try to login with correct credentials")
            } else if (json[0].status === "Founded") {
                alert("Welcome")
                console.log(json[0].authToken)
                localStorage.setItem('token', json[0].authToken)
                navigate("/");

            }
        } catch (error) {

        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChangeFunc} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChangeFunc} />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login