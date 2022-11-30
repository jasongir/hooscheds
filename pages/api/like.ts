import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../backend-utils/db";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		console.log("POST");
		const Request = z.object({
			student_id: z.string().max(100),
			schedule_id: z.string().max(100),
			isLiking: z.boolean(),
		});

		const result = Request.safeParse(req.body);
		if (!result.success) return res.status(400).json({ success: false });

		try {
			if (result.data.isLiking) {
				const data = await executeQuery(
					`INSERT INTO 
                        likes(student_id, schedule_id) 
                        VALUES (?, ?)`,
					[result.data.student_id, result.data.schedule_id],
					"Failed to insert into likes"
				);
				return res.status(201).json({ success: true, data });
			} else {
				const data = await executeQuery(
					`DELETE FROM likes 
                        WHERE student_id = ? AND schedule_id = ?`,
					[result.data.student_id, result.data.schedule_id],
					"Failed to delete from likes"
				);
				return res.status(202).json({ success: true, data });
			}
		} catch (error) {
			console.error(error);
			return res.status(400).json({ success: false });
		}
	} else if (req.method === "GET") {
		const Request = z.object({
			student_id: z.string().max(100),
		});

		const result = Request.safeParse(req.query);
		if (!result.success) {
			console.log("sid:", req.query);
			return res.status(400).json({ success: false });
		} else {
			try {
				const data = await executeQuery(
					`SELECT * FROM likes
          WHERE student_id = ?`,
					[result.data.student_id],
					"Failed to fetch from likes"
				);
				console.log("who liked this schedule", req.query, data);
				return res.status(201).json({ success: true, body: data });
			} catch (error) {
				console.log("ERROR");
				return res.status(400).json({ success: false });
			}
		}
	}
}
