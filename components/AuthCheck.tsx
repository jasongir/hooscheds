import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";

export default function AuthCheck({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { data, isLoading, error } = useQuery({
		queryKey: ["auth"],
		queryFn: () => ({
			loggedIn: false,
		}),
	});
	if (isLoading || error) return <Spinner animation="border" role="status" />;

	if (router.pathname === "/login" || router.pathname === "/signup")
		return <Component {...pageProps} />;

	if (data && data.loggedIn)
		return (
			<>
				<Header />
				<Component {...pageProps} />;
			</>
		);

	router.push("/login");
	return <Spinner animation="border" role="status" />;
}
