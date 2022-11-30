import Link from "next/link";
import { Container, Nav, Navbar, Row, Spinner } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { use } from "react";
import { LoggedInStudent } from "utils/utils";

const NavItem = ({ href, text }: { href: string; text: string }) => (
	<Nav.Link as="div">
		<Link href={href}>{text}</Link>
	</Nav.Link>
);

const LogoutButton = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const logUserOut = () => {
		queryClient.setQueryData(["auth"], null);
		router.push("/login");
	};
	return (
		<Nav.Link as="div">
			<button onClick={logUserOut}>Logout</button>
		</Nav.Link>
	);
};

export default function Header() {
	const queryClient = useQueryClient();
	const data = queryClient.getQueryData(["auth"]) as LoggedInStudent;

	const loading = <Spinner animation="border" role="status" />;
	const navbar = (
		<Navbar expand="md">
			<Container>
				<Navbar.Brand>
					<Link href="/">HOME</Link>
				</Navbar.Brand>
				<Nav className="me-auto">
					<NavItem href="/profile" text="My Profile" />
					<NavItem href="/schedule" text="My Schedule" />
					<NavItem href="/courses" text="Courses" />
					<NavItem
						href={`/friends/${data.student_id}`}
						text="My Friends"
					/>
					<LogoutButton />
				</Nav>
			</Container>
		</Navbar>
	);
	return data ? navbar : loading;
}

// old code, did not use correct router
//  <Navbar bg="light" variant="light">
//    <Container>
//      <Navbar.Brand href="/">Hooscheds</Navbar.Brand>
//      <Nav className="me-auto">
//        <Nav.Link href="/profile">My Profile</Nav.Link>
//        <Nav.Link href="/schedule">My Schedule</Nav.Link>
//        <Nav.Link href="/friends/jag8thv">My Friends</Nav.Link>
//        <Nav.Link href="/courses">Courses</Nav.Link>
//        <Nav.Link href="/logout">Logout</Nav.Link>
//      </Nav>
//    </Container>
//  </Navbar>
