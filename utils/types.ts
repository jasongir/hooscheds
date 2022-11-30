export interface Course {
	course_id: string;
	course_name: string;
	term: string;
}

export interface Section {
	section_id: string;
	course_id: string;
	professor: string;
	location: string;
	start_time: string;
	end_time: string;
	meeting_dates: string;
	availability: string;
	added: String[];
}

export interface CourseSection {
	course_id: string;
	course_name: string;
	term: string;
	section_id: string;
	professor: string;
	location: string;
	start_time: string;
	end_time: string;
	meeting_dates: string;
	availability: string;
	added: String[];
}
