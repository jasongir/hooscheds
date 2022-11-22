import { Col, Container, Row } from "react-bootstrap";
<<<<<<< HEAD
import React from "react";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  // const { student_id: user} = router.query;
  const user = {
    student_id: "jag8thv",
    first_name: "jason",
    last_name: "giroux",
    year: 3,
    num_friends: 2,
    primary_major: "CS",
  };
=======
import { useQueryClient } from "@tanstack/react-query";
import { LoggedInStudent } from "../../utils/utils";
import { useRouter } from "next/router";

export default function Profile() {
	const queryClient = useQueryClient();
	const data = queryClient.getQueryData(["auth"]);
	const router = useRouter();
	if (!data) router.push("/login");
>>>>>>> main

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
						</Col>
					</Row>
				</Container>
			) : (
				<p>no</p>
			)}
		</>
	);
}
