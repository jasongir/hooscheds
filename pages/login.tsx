import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { StudentLogin, postStudentLogIn } from "../utils/utils";
import HtmlInput from "../components/HtmlInput";

export default function LogIn() {
	const router = useRouter();
	const [formState, setFormState] = useState<StudentLogin>({
		student_id: "",
		password: "",
	});
	const [errorMsg, setErrorMsg] = useState("");
	const queryClient = useQueryClient();

	const loginMutation = useMutation(postStudentLogIn, {
		cacheTime: 3.6e6,
		onSuccess: (data) => {
			console.log(data);
			localStorage.setItem("token", data.token);
			queryClient.setQueryData(["auth"], data.student);
			// console.log(queryClient.getQueryData(["auth"]));
			// queryClient.invalidateQueries(["auth"]);
			// alert("Logged in sucessfully as " + data.student["first_name"]);
		},
		onError: (err) => console.log(err),
	});

	const mode = "LOGIN";

	const onSubmitHandler = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { student_id, password } = formState;

		if (!student_id) {
			setErrorMsg("please enter your email");
			// alert("please enter your email");
		} else if (!password) {
			setErrorMsg("please enter your password");
			// alert("please enter your password");
		} else if (mode === "LOGIN" && student_id && password) {
			await loginMutation.mutateAsync({ student_id, password });
			console.log(queryClient.getQueryData(["auth"]));
			router.push("/home");
		}
	};

	return (
		<form onSubmit={onSubmitHandler}>
			{errorMsg && <div>{errorMsg}</div>}
			<HtmlInput
				name="student_id"
				label="Username:"
				type="text"
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
				type="password"
				value={formState.password}
				onChange={(e: React.FormEvent) =>
					setFormState({
						...formState,
						password: (e.target as HTMLInputElement).value,
					})
				}
			/>
			<button>LOGIN</button>
		</form>
	);
}
