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
  const queryClient = useQueryClient();
  const loginMutation = useMutation(postStudentLogIn, {
    cacheTime: 3.6e+6,
    onSuccess: (data) => {console.log(data), 
    localStorage.setItem('token', data.token)},
    onError: (err) => (console.log(err))
  } )

  const mode = "LOGIN";

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { 
        student_id, 
        password 
    } = formState;

        if (!student_id) {
          alert("please enter your email");
        } else if (!password) {
          alert("please enter your password");ß
        } else if (
          mode === "LOGIN" &&
          student_id &&
          password
        ) {
          loginMutation.mutate(
            {student_id, password}
            )
          
          router.push("/home");
        }
  };

  return (
    <form onSubmit={onSubmitHandler}>
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
        type="text"
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
