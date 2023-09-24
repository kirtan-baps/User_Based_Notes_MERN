import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
    })


    const onChangeFunc = (e) => {
        // console.log(e.target.name)
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const { name, email, password } = credentials;
            const response = await fetch(`http://localhost:3001/api/auth/createuser`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json()
            console.log(json)
            // console.log(json.error)
            // console.log(json[0].status)
            if (json[0].status === "Inserted") {
                alert("Registration Successful")
                console.log(json[0].authToken)
                localStorage.setItem('token', json[0].authToken)
                navigate("/");

            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChangeFunc} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChangeFunc} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChangeFunc} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" value={credentials.cpassword} onChange={onChangeFunc} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>)
}

export default Register