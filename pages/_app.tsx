import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthCheck from "../components/AuthCheck";
const queryClient = new QueryClient();

export default function App(props: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthCheck {...props} />
		</QueryClientProvider>
	);
}
