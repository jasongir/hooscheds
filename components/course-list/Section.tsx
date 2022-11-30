import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { addToSchedule } from "utils/utils";
import { Button } from "react-bootstrap";
import { Section } from "utils/types";
import { LoggedInStudent } from "utils/utils";

const Section = ({ section }: { section: Section }) => {

	const queryClient = useQueryClient();
	const student = queryClient.getQueryData(["auth"]) as LoggedInStudent;
	const [added, setAdded] = useState(false);

	return (
		<tr>
			<td>{section.section_id}</td>
			<td>{section.professor}</td>
			<td>{section.meeting_dates}</td>
			<td>
				{section.start_time} - {section.end_time}
			</td>
			<td>{section.availability}</td>
			<td>
				<Button variant={
					!added ? "primary" : "danger"
				} onClick={(e)=>{ 
					e.preventDefault()
					addToSchedule(student.student_id, section.course_id, section.section_id)
					setAdded(!added)
					}}
					>
					{!added && (<p>Add to Schedule</p>)}
					{added && (<p>Remove from Schedule</p>)}

				</Button>
			</td>
		</tr>
	);
};

export default Section;
