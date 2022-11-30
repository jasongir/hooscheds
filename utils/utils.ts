import axios from "axios";
import { AbortedDeferredError } from "react-router-dom";
import { CourseSection } from "./types";

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

export interface SearchFriendResponse{
	success: boolean;
	student: string;
}

export interface likeResponse {
	success: boolean;
	student_id: string;
}

export interface likeSchedule {
	student_id: string;
	schedule_id: string;
	isLiking: boolean;
}

export interface userLike {
	student_id: string;
}

export interface getLikeResponse {
	success: boolean;
	body: { student_id: string; schedule_id: string }[];
}

export async function getLikes(student_id: string): Promise<getLikeResponse> {
	const { data } = await axios.get("/api/like", {
		params: { student_id },
	});
	return data as getLikeResponse;
}

export async function like(likeData: likeSchedule): Promise<likeResponse> {
	try {
		const { data } = await axios.post("/api/like", likeData);
		return data as likeResponse;
	} catch (error) {
		console.error(error);
		return {
			success: false,
			student_id: "",
		};
	}
}

export interface followResponse {
	success: boolean;
	student_id: string;
}

export interface FollowFriend {
	student_id_1: string;
	student_id_2: string;
}

export async function follow({
	student_id_1,
	student_id_2,
}: FollowFriend): Promise<followResponse> {
	const { data } = await axios.post("/api/follow", {
		student_id_1,
		student_id_2,
	});
	return data as followResponse;
}

export interface UnfollowFriend {
	student_id_1: string;
	student_id_2: string;
}

export interface unfollowResponse {
	success: boolean;
	student_id: string;
}

export async function unfollow({
	student_id_1,
	student_id_2,
}: UnfollowFriend): Promise<unfollowResponse> {
	const { data } = await axios.post("/api/unfollow", {
		student_id_1,
		student_id_2,
	});
	return data as unfollowResponse;
}

export async function searchFriend({
	student_id,
}: FindFriend): Promise<SearchFriendResponse> {
	try {
		const { data } = await axios.post("/api/searchFriend", {
			student_id,
		});
		console.log("searchFriend working", data);
		return data as SearchFriendResponse;
	} catch (err) {
		console.log(err);
		return { success: false, student: "" };
	}
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
	added: String[];
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
	const { data: schedule } = await axios.get("/api/schedules/" + student_id);
	const { data } = await axios.get("/api/timings/" + schedule[0].schedule_id);
	data.added = [];
	return data as Timings[];
}

export async function addToSchedule(
	student_id: String,
	course_id: String,
	section_id: String
): Promise<PostResponse> {
	const { data: schedule } = await axios.get("/api/schedules/" + student_id);
	const first_schedule_id = schedule[0].schedule_id;
	console.log(first_schedule_id, course_id, section_id);
	const { data } = await axios.post("/api/section-schedule", {
		first_schedule_id,
		course_id,
		section_id,
	});
	return data as PostResponse;
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

export interface CourseSearchReq {
	course_id: string;
	course_name: string;
	term: string;
}

export async function searchCourses(
	searchRequestData: CourseSearchReq
): Promise<CourseSection[]> {
	try {
		const { data } = await axios.get("/api/courses/search", {
			params: searchRequestData,
		});
		data.added = [];
		return data;
	} catch (error) {
		console.error(error);
	}
	return [];
}

export interface DeleteRequest {
	schedule_id: string;
	course_id: string;
	section_id: string;
}

export async function deleteFromSchedule(deleteRequestData: DeleteRequest) {
	try {
		// "/api/section-schedule"
		const { data } = await axios.delete("/api/section-schedule", {
			data: deleteRequestData,
		});
		return data;
	} catch (error) {
		console.error(error);
	}
	return [];
}
