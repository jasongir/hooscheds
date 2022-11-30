import { useQuery, useQueryClient } from "@tanstack/react-query";
import CoursesList from "components/course-list/CourseList";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { searchCourses } from "utils/utils";

interface FormState {
	course_id: string;
	course_name: string;
	term: string;
}

export default function Courses() {
	const [{ course_id, course_name, term }, setFormState] = useState<FormState>(
		{
			course_id: "",
			course_name: "",
			term: "",
		}
	);
	const { data } = useQuery({
		queryKey: ["searched_courses"],
		queryFn: () => [],
		enabled: false,
	});

	const queryClient = useQueryClient();
	const onFormChange =
		(changed_value: keyof FormState) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormState((prevState) => ({
				...prevState,
				[changed_value]: e.target.value,
			}));
		};

	const searchForCourses = () => {
		if (!course_id && !course_name && !term) return;
		queryClient.fetchQuery({
			queryKey: ["searched_courses"],
			queryFn: () => searchCourses({ course_id, course_name, term }),
		});
	};

	const courseMarkup =
		data && data.length > 0 ? <CoursesList courseSections={data} /> : null;

	return (
		<>
			<Form>
				<Form.Group>
					<Form.Label>
						Course ID: (i.e., CS 1110)
						<input
							type="text"
							value={course_id}
							onChange={onFormChange("course_id")}
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Course Name: (i.e., Introduction to Programming)
						<input
							type="text"
							value={course_name}
							onChange={onFormChange("course_name")}
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Term: (i.e., Fall 2022)
						<input
							type="text"
							value={term}
							onChange={onFormChange("term")}
						/>
					</Form.Label>
				</Form.Group>
				<Button variant="primary" onClick={searchForCourses}>
					Search For Courses
				</Button>
			</Form>
			{courseMarkup}
		</>
	);
	//   return (
	//     <>
	//       <div className="p-3 text-center bg-light">
	//         <h1 className="mb-3">Courses</h1>
	//       </div>
	//       <Form>
	//       <Form.Group className="mb-3" controlId="formBasicEmail">
	//         <Form.Label>Search for Classes</Form.Label>
	//         <Form.Control  placeholder="Enter course name" />
	//       </Form.Group>
	//       <Button variant="primary" type="submit">
	//         Submit
	//       </Button>
	//     </Form>
	//     </>
	//   );
}

/* FROM HOME:
			<div className="input-group">
				<div className="form-outline">
					<label className="form-label" htmlFor="form1">
						Search
						<input type="search" id="form1" className="form-control" />
					</label>
				</div>
				<button type="button" className="btn btn-primary">
					<i className="fas fa-search"></i>
				</button>
			</div>
*/
/* FROM courseSearch:
      <>
			<section className="heading">
				<h1>Welcome to Hooscheds</h1>
				<p>Course Search</p>
			</section>
			<div className="input-group">
				<div className="form-outline">
					<input type="search" id="form1" className="form-control" />
					<label className="form-label" htmlFor="form1">
						Search
					</label>
				</div>
				<button type="button" className="btn btn-primary">
					<i className="fas fa-search"></i>
				</button>
			</div>
		</>
*/
