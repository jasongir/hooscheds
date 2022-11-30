import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import FullCalendar, { DaySeriesModel } from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
	LoggedInStudent,
	getSchedules,
	getTimings,
	deleteFromSchedule,
	DeleteRequest,
} from "utils/utils";
import { daysToNums } from "utils/misc";
import { useQuery } from "@tanstack/react-query";
import { Html } from "next/document";
import JSXStyle from "styled-jsx/style";
import { z } from "zod";
import Comments from "components/comments/Comments";

/* TODO: 
   2. Find all sections included in that schedule from section_schedule
   3. Find the start time, end time, and meeting dates of all sections from Section
   4. Convert the section information into a form displayable in a calendar
   5. Display the schedule on a calendar */

export default function DisplaySchedule() {
	const queryClient = useQueryClient();
	const student = queryClient.getQueryData(["auth"]) as LoggedInStudent;
	const router = useRouter();
	const validatedId = z.string().safeParse(router.query.id);
	const id = validatedId.success ? validatedId.data : student.student_id;
	const { data: schedules, error: schedulesError } = useQuery(
		["Schedules"],
		() => getSchedules(id)
	);
	const scheduleMutation = useMutation({
		mutationKey: ["Schedules"],
		mutationFn: (data: DeleteRequest) => deleteFromSchedule(data),
		onSuccess: () => queryClient.invalidateQueries(["Schedules"]),
	});
	const { data: courses, error: coursesError } = useQuery(["Courses"], () =>
		getTimings(id)
	);

	const scheduleOwner = id === student.student_id ? student.first_name : id;
	return (
		courses &&
		schedules && (
			<>
				<div className="p-3 text-center bg-light">
					<h1 className="mb-3">{scheduleOwner}'s Schedule</h1>
					<h3>{schedules[0].name}</h3>
					<FullCalendar
						plugins={[interactionPlugin, timeGridPlugin]}
						initialView="timeGridWeek"
						nowIndicator={true}
						editable={true}
						events={courses.map((course) => {
							var start_time = course.start_time;
							if (parseInt(start_time.slice(0, 2)) < 9) {
								start_time =
									(parseInt(start_time.slice(0, 2)) + 12).toString() +
									start_time.slice(1);
							}
							var end_time = course.end_time;
							if (parseInt(end_time.slice(0, 2)) < 9) {
								end_time =
									(parseInt(end_time.slice(0, 2)) + 12).toString() +
									end_time.slice(1);
							}
							console.log(start_time, end_time);
							return {
								title: course.course_id,
								start: new Date(),
								groupId: course.course_id,
								daysOfWeek: daysToNums(course.meeting_dates),
								startTime: start_time,
								endTime: end_time,
								extendedProps: { section_id: course.section_id },
							};
						})}
						eventDidMount={async (eventInfo) => {
							if (id !== student.student_id) return;
							console.log(eventInfo.event.extendedProps);
							const course_id =
								eventInfo.el.querySelector(
									".fc-event-title"
								)?.textContent;
							console.log(course_id);

							const button = document.createElement("button");
							button.innerText = "X";
							button.addEventListener("click", async () => {
								const result = confirm(
									`Are you sure you want to delete ${course_id}?`
								);
								if (result && course_id) {
									console.log(
										"schedule delete requirements",
										schedules[0].schedule_id,
										course_id,
										eventInfo.event.extendedProps.section_id
									);
									const result = await scheduleMutation.mutateAsync({
										schedule_id: schedules[0].schedule_id,
										course_id,
										section_id:
											eventInfo.event.extendedProps.section_id,
									});
								}
							});

							eventInfo.el.appendChild(button);
						}}
					/>
				</div>
				<Comments
					schedule_id={schedules[0].schedule_id}
					student_id={student.student_id}
				/>
			</>
		)
	);
}
