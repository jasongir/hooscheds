import { Col, Container, Row } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { LoggedInStudent, follow, getFriends } from "../../../utils/utils";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function FollowAFriend() {
  const router = useRouter();
  const { student_id: sid } = router.query;
  const sidRes = z.string().safeParse(sid);

  // const { data: searchResult, error:errorSearch } = useQuery(["User"], () => searchFriend({student_id:sid}));

  const queryClient = useQueryClient();
  const student = queryClient.getQueryData(["auth"]) as LoggedInStudent;

  const student_id_1 = student.student_id;
  const student_id_2 = sid as string;

  const [mode, setMode] = useState<"FOLLOW" | "FOLLOWING">("FOLLOW");

  const followMutation = useMutation(follow, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => console.log(err),
  });

  const { data, error } = useQuery(["Friends"], () => getFriends(student_id_1));

  console.log("user's friend data:", data);

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (student_id_2 === data[i].student_id_2) {
        setMode("FOLLOWING");
      }
    }
  }, []);

  //   if (student_id_2 in data.stu) {
  //     setMode("FOLLOWING");
  //   }

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const { student_id_1, student_id_2 } = formState;
    if (mode === "FOLLOW") {
      console.log("type", typeof student.student_id);
      await followMutation.mutateAsync({ student_id_1, student_id_2 });
      router.push(`/friends/${encodeURIComponent(student.student_id)}`);
    }
  };

  return (
    <>
      <h1> Search Result</h1>
      <p>{sid}</p>
      <form onSubmit={onSubmitHandler}>
        <button>{mode}</button>
      </form>
    </>
  );
}
