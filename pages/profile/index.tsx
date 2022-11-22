import { Col, Container, Row } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { LoggedInStudent } from "../../utils/utils";
import Schedule from "pages/schedule";
import { useRouter } from "next/router";

export default function Profile() {
	const queryClient = useQueryClient();
	const data = queryClient.getQueryData(["auth"]);
	const router = useRouter();
	if (!data) router.push("/login");

	const studentYear = (user: LoggedInStudent) =>
		user.year === 1
			? "1st"
			: user.year === 2
			? "2nd"
			: user.year === 3
			? "3rd"
			: user.year === 4
			? "4th"
			: "5th";

	const typedData = data as LoggedInStudent;
	return (
		<>
			{data ? (
				<Container fluid="md" as="main">
					<Row>
						<Col as="section">
							<h2>{`${typedData.first_name} ${typedData.last_name}`}</h2>
							<h3>{typedData.student_id}@virginia.edu</h3>
							<h3>{studentYear(typedData)} year</h3>
							<h3>{typedData.primary_major} Major</h3>
						</Col>
						<Col as="section">
							<h1>{typedData.first_name}'s Schedule</h1>
							<Schedule></Schedule>
						</Col>
					</Row>
				</Container>
			) : (
				<p>no</p>
			)}
		</>
	);
}
