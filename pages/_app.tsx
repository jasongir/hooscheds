import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthCheck from "../components/AuthCheck";


export default function App(props: AppProps) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AuthCheck {...props} />
		</QueryClientProvider>
	);
}
