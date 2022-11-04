interface FriendProps {
  student_id: string;
}

const FriendTable: React.FC<FriendProps> = ({ student_id }) => {
  return (
    <>
      <div>{student_id}</div>
      {/* <button>
				Go to {student_id}'s page
			</button> */}
    </>
  );
};

export default FriendTable;
