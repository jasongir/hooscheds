import "../styles/globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import '@fullcalendar/common/main.css' // @fullcalendar/react imports @fullcalendar/common
// import '@fullcalendar/daygrid/main.css' // @fullcalendar/timegrid imports @fullcalendar/daygrid
// import '@fullcalendar/timegrid/main.css' // @fullcalendar/timegrid is a direct import
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthCheck from "../components/AuthCheck";
const queryClient = new QueryClient();
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App(props: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthCheck {...props} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
