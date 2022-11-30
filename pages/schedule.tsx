import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

/* TODO: 
   2. Find all sections included in that schedule from section_schedule
   3. Find the start time, end time, and meeting dates of all sections from Section
   4. Convert the section information into a form displayable in a calendar
   5. Display the schedule on a calendar */

export default function DisplaySchedule() {
	const queryClient = useQueryClient();
	const student = queryClient.getQueryData(["auth"]) as LoggedInStudent;
	const { data: schedules, error: schedulesError } = useQuery(
		["Schedules"],
		() => getSchedules(student.student_id)
	);
	const scheduleMutation = useMutation({
		mutationKey: ["Schedules"],
		mutationFn: (data: DeleteRequest) => deleteFromSchedule(data),
		onSuccess: () => queryClient.invalidateQueries(["Schedules"]),
	});
	const { data: courses, error: coursesError } = useQuery(["Courses"], () =>
		getTimings(student.student_id)
	);
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
								extendedProps: { section_id: course.section_id },
							};
						})}
						eventDidMount={async (eventInfo) => {
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
			</>
		)
	);
}
