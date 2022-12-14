import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Student, postStudent } from "../utils/utils";
import HtmlInput from "../components/HtmlInput";
import Link from "next/link";

export default function SignUp() {
	const router = useRouter();

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
	const [errorMsg, setErrorMsg] = useState<string>("");
	const queryClient = useQueryClient();
	const postMutation = useMutation(postStudent, {
		onSettled: () => queryClient.invalidateQueries(["student"]),
		onSuccess: (data) => {
			router.push("/login");
			alert("Signed up sucessfully as " + formState["first_name"]);
		},
	});

	const onSubmitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const {
			student_id,
			password,
			first_name,
			last_name,
			year,
			num_friends,
			primary_major,
		} = formState;

		if (!student_id) {
			setErrorMsg("please enter your email");
		} else if (!password) {
			setErrorMsg("please enter your password");
		} else if (!confirmPassword) {
			setErrorMsg("please re-enter your password");
		} else if (password !== confirmPassword) {
			setErrorMsg("your passwords do not match");
		} else if (student_id.indexOf("@") === -1) {
			setErrorMsg("please enter a valid email address with '@'");
		} else if (
			password === confirmPassword &&
			student_id &&
			password &&
			confirmPassword &&
			first_name &&
			last_name &&
			year &&
			primary_major
		) {
			postMutation.mutate({
				student_id,
				password,
				first_name,
				last_name,
				year,
				num_friends,
				primary_major,
			});
			router.push("/");
		}
	};

	return (
		<>
			{errorMsg && <p>{errorMsg}</p>}
			<form onSubmit={onSubmitHandler}>
				<div className="app-container">
					<div className="col-md-6 offset-md-3 mt-5">
						<div className="card">
							<h4 className="card-header">Sign Up </h4>
							<div className="card-body">
								<div className="text-center mt-4">
									{/* <form>
                  <div className="form-group">
                    <label>Email :</label>
                    <input name="student_id" type="text" className="form-control"></input>
                  </div>
                </form> */}
									<HtmlInput
										name="student_id"
										label="Email:"
										type="email"
										value={formState.student_id}
										onChange={(e: React.FormEvent) =>
											setFormState({
												...formState,
												student_id: (e.target as HTMLInputElement)
													.value,
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
												password: (e.target as HTMLInputElement)
													.value,
											})
										}
									/>
									<div className="form-group">
										<label>
											Confirm Password:
											<input
												type="password"
												value={confirmPassword}
												onChange={(e) =>
													setConfirmPassword(e.target.value)
												}
												className="form-control"
											/>
										</label>
									</div>
									<HtmlInput
										name="first_name"
										label="First Name:"
										type="text"
										value={formState.first_name}
										onChange={(e: React.FormEvent) =>
											setFormState({
												...formState,
												first_name: (e.target as HTMLInputElement)
													.value,
											})
										}
									/>
									<HtmlInput
										name="last_name"
										label="Last Name:"
										type="text"
										value={formState.last_name}
										onChange={(e: React.FormEvent) =>
											setFormState({
												...formState,
												last_name: (e.target as HTMLInputElement)
													.value,
											})
										}
									/>
									<HtmlInput
										name="year"
										label="Year:"
										type="number"
										// min={1}
										// max={5}
										value={formState.year}
										onChange={(e: React.FormEvent) =>
											setFormState({
												...formState,
												year: Number(
													(e.target as HTMLInputElement).value
												),
											})
										}
									/>
									<HtmlInput
										name="primary_major"
										label="Primary Major:"
										type="text"
										value={formState.primary_major}
										onChange={(e: React.FormEvent) =>
											setFormState({
												...formState,
												primary_major: (
													e.target as HTMLInputElement
												).value,
											})
										}
									/>
									<button className="btn btn-primary" type="submit">
										SIGN UP
									</button>
									<p>Already have an account?</p>
									<Link className="btn btn-primary" href="/login">
										LOGIN
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
