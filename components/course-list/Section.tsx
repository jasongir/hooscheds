import React from "react";
import { Section } from "utils/types";

const Section = ({ section }: { section: Section }) => {
	return (
		<tr>
			<td>{section.section_id}</td>
			<td>{section.professor}</td>
			<td>{section.meeting_dates}</td>
			<td>
				{section.start_time} - {section.end_time}
			</td>
			<td>{section.availability}</td>
		</tr>
	);
};

export default Section;
