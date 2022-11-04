import Link from "next/link";
import { Container, Nav, Navbar, Row } from "react-bootstrap";

// const NavItem = ({ href, text }: { href: string; text: string }) => (
//   <Nav.Item>
//     <Navbar.Text>
//       <Link href={href}>{text}</Link>
//     </Navbar.Text>
//   </Nav.Item>
// );

export default function Header() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Hooscheds</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/profile">My Profile</Nav.Link>
          <Nav.Link href="/schedule">My Schedule</Nav.Link>
          <Nav.Link href="/friends/jag8thv">My Friends</Nav.Link>
          <Nav.Link href="/courses">Courses</Nav.Link>
          <Nav.Link href="/login">Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

    // <Navbar expand="md">
    //   <Container>
    //     <Navbar.Brand>
    //       <Link href="/">HOME</Link>
    //     </Navbar.Brand>
    //     <NavItem href="/profile" text="My Profile" />
    //     <NavItem href="/schedule" text="My Schedule" />
    //     <NavItem href="/courses" text="Courses" />
    //     <NavItem href="/friends/jag8thv" text="My Friends" />
    //     <NavItem href="/login" text="Logout" />
    //   </Container>
    // </Navbar>
  );
}
