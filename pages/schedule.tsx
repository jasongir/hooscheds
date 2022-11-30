import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import FullCalendar, { DaySeriesModel } from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  LoggedInStudent,
  getSchedules,
  getTimings,
  daysToNums,
  Comment,
  getComment,
  postComment,
} from "utils/utils";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import HtmlInput from "../components/HtmlInput";

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
  const { data: courses, error: coursesError } = useQuery(["Courses"], () =>
    getTimings(student.student_id)
  );

  // comment
  const router = useRouter();
  

  const { data, error } = useQuery(["DisplaySchedule"], () => getComment(cidRes.data));
  const comment = queryClient.getQueryData(["auth"]) as LoggedInStudent;



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

        {/* div for comment     */}
        <div className="main-container">
          <div className="app-container">
            <div className="col-md-6 offset-md-3 mt-5">
              <div className="card">
                <h4 className="card-header">Comment</h4>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
