// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "DELETE") {
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

	const { student_id } = req.query;
	const resultId = z.string().safeParse(student_id);
	if (!resultId.success) return res.status(400).json({ success: false });

	try {
		const data = await executeQuery(
			`SELECT * FROM Schedule
      WHERE student_id = ?;`,
			[resultId.data],
			"Failed to fetch schedules"
		);
		return res.status(200).send(data ?? []);
	} catch (err) {}
	return res.status(400).json({ success: false });
}
