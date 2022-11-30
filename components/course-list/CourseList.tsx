import React from "react";
import { Table } from "react-bootstrap";
import { organizeSections } from "utils/misc";
import { CourseSection } from "utils/types";
import Section from "./Section";

interface CourseProps {
	courseSections: CourseSection[];
}

const Course = ({ courseSections }: CourseProps) => {
	return (
		<Table>
			<tbody>
				{Object.values(organizeSections(courseSections)).map(
					({ course, sections }) => {
						return (
							<>
								<tr
									key={course.course_id}
									className="section-table-heading"
								>
									<th>{course.course_id}</th>
									<th>{course.course_name}</th>
									<th>{course.term}</th>
									<td className="section-table-heading-data"></td>
								</tr>
								{sections.map((section) => {
									return <Section key={section.section_id} section={section} />;
								})}
							</>
						);
					}
				)}
			</tbody>
		</Table>
	);
};

export default Course;
