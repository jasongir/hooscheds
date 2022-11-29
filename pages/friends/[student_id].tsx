import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getFriends, FindFriend, searchFriend } from "../../utils/utils";
import FriendTable from "../../components/Table";
import { useRouter } from "next/router";
import { z } from "zod";
import HtmlInput from "../../components/HtmlInput";

export default function Friends() {
  const router = useRouter();
  const { student_id: sid } = router.query;
  const sidRes = z.string().safeParse(sid);
  if (!sidRes.success) return <p>ERROR: incorrectly formatted ComputingID</p>;

  const { data, error } = useQuery(["Friends"], () => getFriends(sidRes.data));

  console.log("data", data, error);

  const [formState, setFormState] = useState<FindFriend>({
    student_id: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const searchMutation = useMutation(searchFriend, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => console.log(err),
  });

  const mode = "SEARCH";

  
  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { student_id } = formState;

    if (!student_id) {
      setErrorMsg("please enter the student id");
      // alert("please enter your email");
    } else if (mode === "SEARCH" && student_id) {
			await searchMutation.mutateAsync({ student_id });

      // work on error handling --> when user does not exist
      const student_id_Res = z.string().safeParse(student_id);
      if (!student_id_Res.success) {
        return <p>ERROR: User does not exist</p>;
      }

			router.push(`/search/${encodeURIComponent(student_id)}`);
		}
  };

  return (
    <>
      <div className="p-3 text-center bg-light">
        <h1 className="mb-3">{sid}'s Friends</h1>
      </div>

      <form onSubmit={onSubmitHandler}>
        {errorMsg && <div>{errorMsg}</div>}
        <div className="card">
        <h4 className="card-header">Enter computingID to search for a friend: </h4>
        <HtmlInput
          name="student_id"
          label =""
          type="text"
          value={formState.student_id}
          onChange={(e: React.FormEvent) =>
            setFormState({
              ...formState,
              student_id: (e.target as HTMLInputElement).value,
            })
          }
        />
        <button className="btn btn-primary">Search</button>
        </div>
      </form>

      <main>
        <div className="main-container">
          {/* <div>First Name</div>
					<div>Last Name</div> */}
          <div></div>
          <div></div>
          {(data as undefined | { student_id_2: string }[])?.map(
            ({ student_id_2 }) => (
              <FriendTable
                key={student_id_2}
                student_id={student_id_2}
                // first_name={first_name}
                // last_name={last_name}
              />
            )
          )}
        </div>
      </main>
    </>
  );
}
