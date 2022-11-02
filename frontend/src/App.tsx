import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import router from "./router"

import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import { Container } from "react-bootstrap";
import CourseSearch from "./pages/courseSearch";
import User from "./pages/user";
import Home from "./pages/home";

type SignUpProps ={
	email : string;
	password: string;
}
function App(props: SignUpProps) {
	return (
		<Router>
			<div>
				<h1>{props.email}</h1>
				<h1>{props.password}</h1>
			</div>
			<Route>
				<Container>
					<Route path="/signup" element= {<SignUp />} />
					<Route path="/login" element= {<LogIn />} />
					<Route path="/courseSearch" element={<CourseSearch />} />
					<Route path="/user" element={<User />} />
					<Route path="/home" element={<Home />} />
				</Container>
			</Route>
		</Router>
	);
}

export default App;