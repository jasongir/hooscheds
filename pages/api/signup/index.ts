import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    if (req.method === "POST") {
		console.log("POST");
        const reqData = {
			student_id: req.body.student_id,
			password: req.body.password,
		};
		const Student = z.object({
			student_id: z.string().max(100),
			password: z.string().max(100),
		});

		const result = Student.safeParse(reqData);
		if (!result.success) {
			return res.status(400).json({ success: false });
		} else {
			try {
				const data = await executeQuery(
					`INSERT INTO 
            Student(student_id, password, first_name, last_name, year, num_friends, primary_major) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
					[result.data.student_id.substring(0, result.data.student_id.indexOf("@")), result.data.password, "", "", 1, 0, "" ],
					"Failed to insert into Student"
				);
                console.log(result.data.student_id.substring(0, result.data.student_id.indexOf("@")));
				return res.status(201).json({ success: true });
			} catch (error) {
				console.log("ERROR");
				return res.status(400).json({ success: false });
			}

		}
    }
}