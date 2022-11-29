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

export interface StudentFollow {
  student_id_1: string;
  student_id_2: string;
}

export interface FindFriend {
  student_id: string;
}

// export interface SearchFriendResponse {
//   student: string;
// }

export type SearchFriendResponse = {
  student: string;
} | {success: boolean}

export interface followResponse {
  success: boolean;
  student_id: string;
}

export interface FollowFriend {
  student_id_1: string;
  student_id_2: string;
}

export async function follow({student_id_1, student_id_2}: FollowFriend): Promise<followResponse> {
  const { data } = await axios.post("/api/follow", {
    student_id_1,
    student_id_2,
  });
  return data as followResponse
}

export interface UnfollowFriend {
  student_id_1: string;
  student_id_2: string;
}

export interface unfollowResponse {
  success: boolean;
  student_id: string;
}

export async function unfollow({student_id_1, student_id_2}: UnfollowFriend): Promise<unfollowResponse> {
  const { data } = await axios.post("/api/unfollow", {
    student_id_1,
    student_id_2,
  });
  return data as unfollowResponse
}

export async function searchFriend({
  student_id,
}: FindFriend): Promise<SearchFriendResponse> {
  try{
    const { data } = await axios.post("/api/searchFriend", {
      student_id,
    });
    console.log("searchFriend working" , data);
    return data as SearchFriendResponse;
  } catch(err){
    console.log(err)
    return {success: false}
  }

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

export async function getFriends(student_id: string): Promise<Student[]> {
  console.log("Hi");
  let sid = student_id;
  console.log(sid);
  const { data } = await axios.get("/api/friends/" + sid);
  return data as Student[];
}

export interface LoginResponse {
  token: string;
  student: LoggedInStudent;
}

export async function postStudentLogIn({
  student_id,
  password,
}: StudentLogin): Promise<LoginResponse> {
  const { data } = await axios.post("/api/login", {
    student_id,
    password,
  });
  console.log(data);
  return data as LoginResponse;
}
