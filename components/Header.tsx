import Link from "next/link";

function HeaderLink({ href, title }: { href: string; title: string }) {
	return (
		<li>
			<Link href="/">HOME</Link>
		</li>
	);
}

export default function Header() {
	<ul>
		<HeaderLink href="/" title="HOME" />
		<HeaderLink href="/" title="My Profile" />
		<HeaderLink href="/" title="My Schedule" />
		<HeaderLink href="/" title="Courses" />
		<HeaderLink href="/" title="Courses" />
		<HeaderLink href="/" title="My Friends" />

		<HeaderLink href="/" title="Logout" />
	</ul>;
}
