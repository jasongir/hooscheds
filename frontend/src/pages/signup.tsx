import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import {useNavigate, Routes, Route} from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // let navigate = useNavigate();

    // useEffect(()=>{
    //     navigate("/");
    // });

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    // }

return (
    <form>
        <label> Email:
            <input
                type ="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </label>
    
    <label>Password:
        <input 
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
    </label>
    <label>Confirm Password:
        <input
            type = "text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
        />
    </label>
    <div className="form-group">
    <a href="http://localhost:3000/login" target="_blank">
        <Button> Go to Login Page </Button>
    </a>
	</div>

    </form>
)

}


