import Table from "react-bootstrap/Table";

interface FriendProps {
  student_id: string;
}

const FriendTable: React.FC<FriendProps> = ({ student_id }) => {
  return (
    <>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>{student_id}</th>
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
