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

export interface SearchFriendResponse {
  student: string;
}

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

export async function searchFriend({
  student_id,
}: FindFriend): Promise<SearchFriendResponse> {
  const { data } = await axios.post("/api/searchFriend", {
    student_id,
  });
  console.log("searchFriend working" , data);
  return data as SearchFriendResponse;
}

export interface PostResponse {
  success: boolean;
}

export interface Schedule {
  schedule_id: string;
  student_id: string;
  name: string;
  sched_term: string;
  privacy: string;
  num_likes: number;
}

export interface Timings {
  course_id: string;
  section_id: string;
  start_time: string;
  end_time: string;
  meeting_dates: string;
  location: string;
  availability: string;
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

export async function getSchedules(student_id: string): Promise<Schedule[]> {
  const { data } = await axios.get("/api/schedules/" + student_id);
  return data as Schedule[];
}

export async function getTimings(student_id: string): Promise<Timings[]> {
  const { data:schedule } = await axios.get("/api/schedules/" + student_id);
  const { data } = await axios.get("/api/timings/" + schedule[0].schedule_id);
  return data as Timings[];
}

export async function getFriends(student_id: string): Promise<Student[]> {
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

export function daysToNums(days: String):String[]{
  let numArray:String[] = []
  for (let i = 0; i <= days.length-2; i+= 2){
    const day = days.slice(i, i+2);
    if(day === 'Mo'){
      numArray.push('1')
    }
    else if (day === 'Tu'){
      numArray.push('2')
    }
    else if (day === 'We'){
      numArray.push('3')
    }
    else if (day === 'Th'){
      numArray.push('4')
    }
    else if (day === 'Fr'){
      numArray.push('5')
    }

  }
  
  return numArray
  
}