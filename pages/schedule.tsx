import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { LoggedInStudent, getSchedules } from "utils/utils";
import { useQuery } from "@tanstack/react-query";

/* TODO: 
          2. Find all sections included in that schedule from section_schedule
          3. Find the start time, end time, and meeting dates of all sections from Section
          4. Convert the section information into a form displayable in a calendar
          5. Display the schedule on a calendar */

export default function Schedule() {
  const queryClient = useQueryClient();
  const student = queryClient.getQueryData(["auth"]) as LoggedInStudent
  const { data, error } = useQuery(["Schedules"], () => getSchedules(student.student_id));
  let first_schedule = undefined;
  if (data) {
    first_schedule = data[0]

  }
  
  return (
    data && (
    <>
      <div className="p-3 text-center bg-light">
        <h1 className="mb-3">{student.first_name}'s Schedule</h1>
        <h3>{data[0].name}</h3>
        
                <FullCalendar
          plugins={[interactionPlugin, timeGridPlugin]}
          initialView='timeGridWeek'
          nowIndicator={true}
          editable={true}
          initialEvents={[
            { title: 'nice event', start: new Date() }
          ]}
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
