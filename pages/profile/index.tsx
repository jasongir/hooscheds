import { Col, Container, Row } from "react-bootstrap";

export default function Profile() {
	const user = {
		student_id: "jag8thv",
		first_name: "jason",
		last_name: "giroux",
		year: 3,
		num_friends: 2,
		primary_major: "CS",
	};

	const studentYear =
		user.year === 1
			? "1st"
			: user.year === 2
			? "2nd"
			: user.year === 3
			? "3rd"
			: user.year === 4
			? "4th"
			: "5th";

	return (
		<>
			<Container fluid="md" as="main">
				<Row>
					<Col as="section">
						<h2>{`${user.first_name} ${user.last_name}`}</h2>
						<h3>{user.student_id}@virginia.edu</h3>
						<h3>{studentYear} year</h3>
						<h3>{user.primary_major} Major</h3>
					</Col>
					<Col as="section">
						<h1>{user.first_name}'s Schedule</h1>
					</Col>
				</Row>
			</Container>
		</>
	);
}
