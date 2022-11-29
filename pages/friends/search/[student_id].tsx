import { Col, Container, Row } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { LoggedInStudent, follow } from "../../../utils/utils";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function FollowAFriend() {
    const router = useRouter();
    const { student_id: sid } = router.query;
    const sidRes = z.string().safeParse(sid);
    
    const queryClient = useQueryClient();
	const student = queryClient.getQueryData(["auth"]) as LoggedInStudent
    
    // const [formState, setFormState] = useState<FollowFriend>({
	// 	student_id_1: "",
	// 	student_id_2: "",
	// });

    const student_id_1= student.student_id;
    const student_id_2 = sid as string;

    // setFormState({
    //     ...formState,
    //     student_id_1: student.student_id,
    // })

    // setFormState({
    //     ...formState,
    //     student_id_2: sid as string,
    // })

    const mode = "FOLLOW";

    const followMutation = useMutation(follow, {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (err) => console.log(err),
      });

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();    
        // const { student_id_1, student_id_2 } = formState;
        if (mode === "FOLLOW") {
            console.log("type", typeof student.student_id)
            await followMutation.mutateAsync({student_id_1, student_id_2});
            router.push(`/friends/${encodeURIComponent(student.student_id)}`);
        }
      };
	return (
		<>
        <h1> Search Result</h1>
        <p>{sid}</p>
        <form onSubmit={onSubmitHandler}>
            <button>FOLLOW</button>
        </form>
		</>
	);
}
