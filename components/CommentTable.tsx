import Table from "react-bootstrap/Table";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import router from "next/router";
import { LoggedInStudent, unfollow } from "utils/utils";

interface FriendProps {
  student_id: string;
}

const CommentTable: React.FC<FriendProps> = ({ student_id }) => {
  
  const queryClient = useQueryClient();
	const student = queryClient.getQueryData(["auth"]) as LoggedInStudent
  
  const mode = "UNFOLLOW";

  const unfollowMutation = useMutation(unfollow, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({queryKey: ['Friends']})
      },
      onError: (err) => console.log(err),
    });

  const student_id_1 = student.student_id as string

  const student_id_2 = student_id as string

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
      e.preventDefault();    
      // const { student_id_1, student_id_2 } = formState;
      if (mode === "UNFOLLOW") {
          await unfollowMutation.mutateAsync({student_id_1, student_id_2});
          router.push(`/friends/${encodeURIComponent(student.student_id)}`);
      }
    };
  return (
    <>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>
              <Link href={`/schedule/${encodeURIComponent(student_id)}`}>
                {student_id}
              </Link>
              <form onSubmit={onSubmitHandler}>
                <button>UNFOLLOW</button>
              </form>
            </th>
          </tr>
        </tbody>
      </Table>
      {/* <div>{student_id}</div> */}
      {/* <button>
				Go to {student_id}'s page
			</button> */}
    </>
  );
};

export default CommentTable;
