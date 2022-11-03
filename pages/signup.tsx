import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import {useNavigate, Routes, Route} from "react-router-dom";
import { Button } from 'react-bootstrap';
import {useRouter} from 'next/router'


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Student,
	postStudent,
} from "../utils/utils";
import HtmlInput from "../components/HtmlInput";




export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formState, setFormState] = useState<Student>({
		student_id: "",
		password: "",
        first_name: "",
        last_name: "",
        year: 1,
        num_friends: 0,
        primary_major: "",
	});
    const queryClient = useQueryClient();
    const postMutation = useMutation(postStudent, {
		onSettled: () => queryClient.invalidateQueries(["student"]),
	});

    const mode = "SIGNUP";

    const onSubmitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { student_id, password, first_name, last_name, year, num_friends, primary_major } = formState;
		if (mode === "SIGNUP" && password === confirmPassword && student_id && password && confirmPassword) {
            //console.log(student_id.substring(0,student_id.indexOf("@")))
			postMutation.mutate({ student_id, password, first_name, last_name, year, num_friends, primary_major });
            router.push("/home")
		} 
        else if (!student_id){
            alert("please enter your email")
        }
        else if (!password){
            alert("please enter your password")
        }
        else if (!confirmPassword){
            alert("please re-enter your password")
        }
        else if (password !== confirmPassword) {
            alert("your passwords do not match")
        }
	};

return (
    <form onSubmit={onSubmitHandler}>
        <HtmlInput
            name="student_id"
            label="Email:"
            type ="text"
            value={formState.student_id}
            onChange={(e: React.FormEvent) =>
                setFormState({
                    ...formState,
                    student_id: (e.target as HTMLInputElement).value,
                })
            }
        />    
        <HtmlInput
                name="password"
                label="Password:"
                type ="text"
                value={formState.password}
                onChange={(e: React.FormEvent) =>
                    setFormState({
                        ...formState,
                        password: (e.target as HTMLInputElement).value,
                    })
                }
            />   
        <label>Confirm Password:
            <input
                type = "text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </label>
        <button>{mode}</button>
        {/* <div className="form-group">
            <a href="http://localhost:3000/login" target="_blank">
                <button>{mode}</button>
            </a>
        </div> */}

    </form>
)

}





