import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../utils/utils";
import FriendTable from "../../components/Table";
import { useRouter } from "next/router";
import { z } from "zod";

export default function Friends() {
  const router = useRouter();
  const { student_id: sid } = router.query;
  const sidRes = z.string().safeParse(sid);
  if (!sidRes.success) return <p>ERROR: incorrectly formatted ComputingID</p>;

  const { data, error } = useQuery(["Friends"], () =>
    getFriends(sidRes.data)
  );

  console.log("data", data, error);
  return (
    <>
      <section className="heading">
        <h1>Hooscheds</h1>
        <p>Your Friends</p>
      </section>
      <main>
        <div className="main-container">
          <div>Student Id</div>
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