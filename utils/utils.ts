import axios from "axios";
import internal from "stream";

//signup
export interface Student {
  student_id: string;
  password: string;
  first_name: string;
  last_name: string;
  year: number;
  num_friends: number;
  primary_major: string;
}

export interface LoggedInStudent {
  student_id: string;
  first_name: string;
  last_name: string;
  year: number;
  num_friends: number;
  primary_major: string;
}

export interface StudentLogin {
  student_id: string;
  password: string;
}

export interface PostResponse {
  success: boolean;
}

export async function postStudent({
  student_id,
  password,
  first_name,
  last_name,
  year,
  primary_major,
}: Student): Promise<PostResponse> {
  const { data } = await axios.post("/api/signup", {
    student_id,
    password,
    first_name,
    last_name,
    year,
    primary_major
}: Student): Promise<PostResponse> {
	const { data } = await axios.post("/api/signup", {
		student_id,
		password,
		first_name,
    	last_name,
    	year,
    	primary_major
	});
	return data as PostResponse;
}

export async function getFriends(student_id: string): Promise<Student[]> {
	console.log("Hi")
	let sid = student_id
	console.log(sid)
	const { data } = await axios.get("/api/friends/" + sid);
	return data as Student[];
}

export interface LoginResponse {
  token: string;
  student: LoggedInStudent;
}

export async function postStudentLogIn({
  student_id,
  password
}: StudentLogin): Promise<LoginResponse> {
  const { data } = await axios.post("/api/login", {
    student_id,
    password,
  });
  console.log(data)
  return data as LoginResponse;
}
