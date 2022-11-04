import Link from "next/link";
import { Container, Nav, Navbar, Row } from "react-bootstrap";

const NavItem = ({ href, text }: { href: string; text: string }) => (
  <Nav.Item>
    <Navbar.Text>
      <Link href={href}>{text}</Link>
    </Navbar.Text>
  </Nav.Item>
);

export default function Header() {
  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand>
          <Link href="/">HOME</Link>
        </Navbar.Brand>
        <NavItem href="/profile" text="My Profile" />
        <NavItem href="/schedule" text="My Schedule" />
        <NavItem href="/courses" text="Courses" />
        <NavItem href="/friends/jag8thv" text="My Friends" />
        <NavItem href="/logout" text="Logout" />
      </Container>
    </Navbar>
  );
}
