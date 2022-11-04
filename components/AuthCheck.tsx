import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { Spinner } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export default function AuthCheck({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const queryClient = useQueryClient();
	let data = queryClient.getQueryData(["auth"]);
	// console.log("before useeffect:", data);
	const isLoginSignup =
		router.pathname === "/login" || router.pathname === "/signup";

	useEffect(() => {
		console.log(`in useeffect: ${data}`);
		if (!data && !isLoginSignup) {
			router.push("/login");
		}
	}, [isLoginSignup, data]);

	if (isLoginSignup) return <Component {...pageProps} />;

	const dataRes = z
		.object({
			student_id: z.string().max(100),
			first_name: z.string().max(100),
			last_name: z.string().max(100),
			year: z.number().int().gte(1).lte(5),
			primary_major: z.string().max(100),
			num_friends: z.number().int(),
		})
		.safeParse(data);

	if (dataRes.success && dataRes.data)
		return (
			<>
				<Header />
				<Component {...pageProps} />;
			</>
		);
	return <Spinner animation="border" role="status" />;
}
