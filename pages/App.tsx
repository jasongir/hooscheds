import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import router from "./router"

import LogIn from "./login";
import SignUp from "./signup";
import { Container } from "react-bootstrap";
import CourseSearch from "./courseSearch";
import User from "./user";
import Home from "./home";

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