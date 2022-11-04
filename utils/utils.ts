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
    primary_major,
  });
  return data as PostResponse;
}

//login
export interface StudentLogIn {
  student_id: string;
  password: string;
}

export interface PostResponse {
  success: boolean;
}
export async function postStudentLogIn({
  student_id,
  password
}: Student): Promise<PostResponse> {
  const { data } = await axios.post("/api/login", {
    student_id,
    password,
  });
  return data as PostResponse;
}
