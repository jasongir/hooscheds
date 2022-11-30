import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import FullCalendar, { DaySeriesModel } from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { LoggedInStudent, getSchedules, getTimings, Schedule, Timings } from "utils/utils";
import { useQuery } from "@tanstack/react-query";

/* TODO: 
          2. Find all sections included in that schedule from section_schedule
          3. Find the start time, end time, and meeting dates of all sections from Section
          4. Convert the section information into a form displayable in a calendar
          5. Display the schedule on a calendar */

export default function DisplaySchedule() {
  const queryClient = useQueryClient();
  const student = queryClient.getQueryData(["auth"]) as LoggedInStudent
  
  const { data:schedules, dataError } = useQuery(["Schedules"], () => getSchedules(student.student_id));
  const { data:courses, coursesError} = useQuery(["Courses"], () => getTimings("ac7ncw-1"));
  let first_schedule: Schedule;

  if (courses) {
    // first_schedule = data[0] as Schedule
    // console.log(first_schedule)
  }
  
  
  return (
    courses && (
    <>
      <div className="p-3 text-center bg-light">
        <h1 className="mb-3">{student.first_name}'s Schedule</h1>
        <h3>{courses[0].course_id}</h3>
        
                <FullCalendar
          plugins={[interactionPlugin, timeGridPlugin]}
          initialView='timeGridWeek'
          nowIndicator={true}
          editable={true}
          events = { courses.map(
            (course) => 
            {
              
              return {
                title: course.course_id, 
                start: new Date(), 
                groupId: course.course_id, 
                daysOfWeek: daysToNums(course.meeting_dates),
                startTime: course.start_time,
                endTime: course.end_time}
            }
          )
          }
        />
      </div>
      {/* <div className="input-group">
        <div className="form-outline">
          <input type="search" id="form1" className="form-control" />
          <label className="form-label" htmlFor="form1">
            Search
          </label>
        </div>
        <button type="button" className="btn btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </div> */}
    </>)
  );
}

function daysToNums(days: String):String[]{
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
