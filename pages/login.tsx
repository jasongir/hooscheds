import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Student, postStudentLogIn } from "../utils/utils";
import HtmlInput from "../components/HtmlInput";

export default function LogIn() {
  const router = useRouter();
//   const [confirmPassword, setConfirmPassword] = useState("");
  const [formState, setFormState] = useState<Student>({
    student_id: "",
    password: "",
  });
  const queryClient = useQueryClient();
  const postMutation = useMutation(postStudentLogIn, {
    onSettled: () => queryClient.invalidateQueries(["student"]),
  });

  const mode = "LOGIN";

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const {
      student_id,
      password,
    } = formState;

    if (!student_id) {
      alert("please enter your email");
    } else if (!password) {
      alert("please enter your password");
    } else if (student_id.indexOf("@") === -1) {
      alert("please enter a valid email address with '@'");
    } else if (
      mode === "LOGIN" &&
      student_id &&
      password
    ) {
      //console.log(student_id.substring(0,student_id.indexOf("@")))
      postMutation.mutate({
        student_id,
        password
      });
      router.push("/home");
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <HtmlInput
        name="student_id"
        label="Email:"
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
      <button>{mode}</button>
    </form>
  );
}
