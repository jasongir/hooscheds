import Table from "react-bootstrap/Table";
import Link from "next/link";

interface FriendProps {
  student_id: string;
}

const FriendTable: React.FC<FriendProps> = ({ student_id }) => {
  return (
    <>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>
              <Link href={`/schedule/${encodeURIComponent(student_id)}`}>
                {student_id}
              </Link>
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

export default FriendTable;
