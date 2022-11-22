import React from "react";
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

export default function Schedule() {
  return (
    <>
      <div className="p-3 text-center bg-light">
        <h1 className="mb-3">My Schedule</h1>
        {/* TODO: 
          1. Find the first schedule of the logged-in student from Student 
          2. Find all sections included in that schedule from section_schedule
          3. Find the start time, end time, and meeting dates of all sections from Section
          4. Convert the section information into a form displayable in a calendar
          5. Display the schedule on a calendar */}
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
    </>
  );
}
