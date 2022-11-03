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
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const router = useRouter()

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
		if (mode === "SIGNUP" && password === confirmPassword && student_id && password && confirmPassword && first_name && last_name && year && primary_major) {
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
        <HtmlInput
            name="first_name"
            label="First Name:"
            type ="text"
            value={formState.first_name}
            onChange={(e: React.FormEvent) =>
                setFormState({
                    ...formState,
                    first_name: (e.target as HTMLInputElement).value,
                })
            }
        />
        <HtmlInput
            name="last_name"
            label="Last Name:"
            type ="text"
            value={formState.last_name}
            onChange={(e: React.FormEvent) =>
                setFormState({
                    ...formState,
                    last_name:(e.target as HTMLInputElement).value,
                })
            }
        />
        <HtmlInput
            name="year"
            label="Year:"
            type ="number"
            // min={1}
			// max={5}
            value={formState.year}
            onChange={(e: React.FormEvent) =>
                setFormState({
                    ...formState,
                    year: Number((e.target as HTMLInputElement).value),
                })
            }
        />
        <HtmlInput
            name="primary_major"
            label="Primary Major:"
            type ="text"
            value={formState.primary_major}
            onChange={(e: React.FormEvent) =>
                setFormState({
                    ...formState,
                    primary_major: (e.target as HTMLInputElement).value,
                })
            }
        />                

        <button>{mode}</button>
        {/* <div className="form-group">
            <a href="http://localhost:3000/login" target="_blank">
                <button>{mode}</button>
            </a>
        </div> */}

    </form>
)

}


