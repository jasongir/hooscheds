import { Course, CourseSection, Section } from "./types";

interface FormattedSections {
	[key: string]: {
		course: Course;
		sections: Section[];
	};
}

export const organizeSections = (
	courseSections: CourseSection[]
): FormattedSections => {
	const sectionObj: FormattedSections = {};
	courseSections.forEach(
		({
			course_name,
			term,
			section_id,
			course_id,
			professor,
			location,
			start_time,
			end_time,
			meeting_dates,
			availability,
		}) => {
			const section = {
				availability,
				course_id,
				end_time,
				location,
				meeting_dates,
				professor,
				section_id,
				start_time,
			};
			if (!(course_id in sectionObj)) {
				sectionObj[course_id] = {
					course: {
						course_id,
						course_name,
						term,
					},
					sections: [section],
				};
			} else {
				sectionObj[course_id].sections.push(section);
			}
		}
	);

	return sectionObj;
};
