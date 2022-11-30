import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import FullCalendar, { DaySeriesModel } from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { LoggedInStudent, getSchedules, getTimings, daysToNums } from "utils/utils";
import { useQuery } from "@tanstack/react-query";
import { Html } from "next/document";
import JSXStyle from "styled-jsx/style";

/* TODO: 
          2. Find all sections included in that schedule from section_schedule
          3. Find the start time, end time, and meeting dates of all sections from Section
          4. Convert the section information into a form displayable in a calendar
          5. Display the schedule on a calendar */

export default function DisplaySchedule() {
  const router = useRouter();
  let id = router.query.id;
  const queryClient = useQueryClient();
  const student = queryClient.getQueryData(["auth"]) as LoggedInStudent
  if (!id){
    id = student.student_id;
    console.log(id)
  }
    const { data:schedules, error:schedulesError} = useQuery(["Schedules"], () => getSchedules(id));
    const { data:courses, error:coursesError} = useQuery(["Courses"], () => getTimings(id));
    return courses && schedules && (
    <>
      <div className="p-3 text-center bg-light">
        {!id && (<h1 className="mb-3">{student.first_name}'s Schedule</h1>)}
        <h3>{schedules[0].name}</h3>
        
                <FullCalendar
          plugins={[interactionPlugin, timeGridPlugin]}
          initialView='timeGridWeek'
          nowIndicator={true}
          editable={true}
          eventDidMount={(eventInfo)=>{

            const jsxEl = `<button onclick="alert('hey')">X</button>`
            const s = document.createRange().createContextualFragment(jsxEl)
            eventInfo.el.querySelector('.fc-event-title-container')?.append(s);
            
        }}
          events = { courses.map(
            (course) => 
            {
              var start_time = course.start_time
              if (parseInt(start_time.slice(0, 2)) < 9) {
                start_time = (parseInt(start_time.slice(0, 2)) + 12).toString() + 
                start_time.slice(1)
              }
              var end_time = course.end_time
              if (parseInt(end_time.slice(0, 2)) < 9) {
                end_time = (parseInt(end_time.slice(0, 2)) + 12).toString() + 
                end_time.slice(1)
              }
              console.log(start_time, end_time)
              return {
                title: course.course_id, 
                start: new Date(), 
                groupId: course.course_id, 
                daysOfWeek: daysToNums(course.meeting_dates),
                startTime: start_time,
                endTime: end_time,
            }
          }
          )
          }
        />
      </div>
    </>);
}

