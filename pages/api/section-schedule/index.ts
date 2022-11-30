// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const reqData = {
			schedule_id: req.body.first_schedule_id,
			course_id: req.body.course_id,
			section_id: req.body.section_id,
		};
		const Section = z.object({
			schedule_id: z.string().max(100),
			course_id: z.string().max(100),
			section_id: z.string().max(100),
		});

		const result = Section.safeParse(reqData);
		if (!result.success) {
			return res.status(400).json({ success: false });
		}

		try {
			const data = await executeQuery(
				`INSERT INTO section_schedule
          VALUES (?, ?, ?);`,
				[
					result.data.schedule_id,
					result.data.course_id,
					result.data.section_id,
				],
				"Failed to add course to schedule"
			);
			return res.status(201).json({ success: true });
		} catch (err) {}
		return res.status(400).json({ success: false });
	} else if (req.method === "DELETE") {
		const deleteCourseSchema = z.object({
			section_id: z.string(),
			course_id: z.string(),
			schedule_id: z.string(),
		});
		const resultBody = deleteCourseSchema.safeParse(req.body);
		if (!resultBody.success)
			return res.status(400).json({
				success: false,
				message: "Incorrectly formatted request body",
			});

		try {
			const data = await executeQuery(
				`DELETE FROM section_schedule
               WHERE schedule_id = ? AND course_id = ? AND section_id = ?`,
				[
					resultBody.data.schedule_id,
					resultBody.data.course_id,
					resultBody.data.section_id,
				],
				"Failed to delete from schedule"
			);
			res.status(202).json(data);
		} catch (error) {}

		return res.status(400).json({
			success: false,
			message: "Incorrectly formatted request body",
		});
	}
	return res.status(400).json({ success: false });
}
