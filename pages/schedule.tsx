import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import FullCalendar, { DaySeriesModel } from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
	LoggedInStudent,
	getSchedules,
	getTimings,
	daysToNums,
	like,
	getLikes,
} from "utils/utils";
import { useQuery } from "@tanstack/react-query";
// import Heart = require("react-heart");
import dynamic from "next/dynamic";
// import { Suspense } from "react";
import { useRouter } from "next/router";

const Heart = dynamic(() => import("react-heart"), {
	ssr: false,
});

/* TODO: 
          2. Find all sections included in that schedule from section_schedule
          3. Find the start time, end time, and meeting dates of all sections from Section
          4. Convert the section information into a form displayable in a calendar
          5. Display the schedule on a calendar */

const DisplaySchedule = () => {
	const queryClient = useQueryClient();
	const student = queryClient.getQueryData(["auth"]) as LoggedInStudent;
	const {
		data: schedules,
		isLoading: schedulesAreLoading,
		error: schedulesError,
	} = useQuery(["Schedules"], () => getSchedules(student.student_id));
	const { data: courses, error: coursesError } = useQuery(["Courses"], () =>
		getTimings(student.student_id)
	);
	const { data: userLike, error: errorLike } = useQuery(["Likes"], () =>
		getLikes(student.student_id)
	);
	// console.log("userLike:", userLike);

	const [active, setActive] = useState(false);
	useEffect(() => {
		if (schedules) {
			// we check if the current user's likes include the current post
			userLike?.body.forEach((like) => {
				if (like.schedule_id === schedules[0].schedule_id)
					setActive(true);
				else setActive(false);
			});
		}
	}, [schedules, userLike, like, setActive]);

	const likeMutation = useMutation(like, {
		onSuccess: (data) => {
			console.log("like works:", data);
			queryClient.invalidateQueries(["Likes", "Schedules"]);
		},
		onError: (err) => console.log(err),
	});

	const onClickHandler = async () => {
		// const { student_id_1, student_id_2 } = formState;
		if (schedulesAreLoading || !schedules || schedules.length === 0) return;
		const data = likeMutation.mutate({
			student_id: student.student_id,
			schedule_id: schedules[0].schedule_id,
			isLiking: !active,
		});
		setActive(!active);
		// console.log("like is now", active, data);
		// router.push(`/schedule/${encodeURIComponent(student.student_id)}`);
	};

	return (
		courses &&
		schedules && (
			<>
				<div className="p-3 text-center bg-light">
					<h1 className="mb-3">{student.first_name}'s Schedule</h1>
					<h3>{schedules[0].name}</h3>
					<FullCalendar
						plugins={[interactionPlugin, timeGridPlugin]}
						initialView="timeGridWeek"
						nowIndicator={true}
						editable={true}
						events={courses.map((course) => {
							return {
								title: course.course_id,
								start: new Date(),
								groupId: course.course_id,
								daysOfWeek: daysToNums(course.meeting_dates),
								startTime: course.start_time,
								endTime: course.end_time,
							};
						})}
					/>
				</div>

				{/* <Suspense fallback={`Loading...`}>
          <DynamicHeader />
        </Suspense> */}

				<div style={{ width: "2rem" }}>
					<Heart isActive={active} onClick={onClickHandler} />
					<p>{schedules[0].num_likes}</p>
				</div>
			</>
		)
	);
};

export default DisplaySchedule;
