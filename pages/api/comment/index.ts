// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const commentSchema = z.object({
			schedule_id: z.string(),
		});
		const commentResult = commentSchema.safeParse(req.query);
		if (!commentResult.success)
			return res.status(400).send({ success: false });
		console.log(commentResult.data);
		try {
			const comments = await executeQuery(
				`SELECT * 
               FROM Comment
               WHERE schedule_id = ?`,
				[commentResult.data.schedule_id],
				"Could not fetch comments"
			);
			return res.status(200).send({ success: true, body: comments });
		} catch (err) {
			console.error(err);
		}
	} else if (req.method === "POST") {
		const commentSchema = z.object({
			student_id: z.string(),
			schedule_id: z.string(),
			comment_text: z.string(),
		});
		const postResult = commentSchema.safeParse(req.body);
		if (!postResult.success) return res.status(400).json({ success: false });

		try {
			const result = await executeQuery(
				`INSERT INTO Comment (student_id, schedule_id, comment_text)
               VALUES (?, ?, ?)`,
				[
					postResult.data.student_id,
					postResult.data.schedule_id,
					postResult.data.comment_text,
				],
				"Failed to insert into comments"
			);
			return res.status(201).json({ success: true, body: result });
		} catch (error) {
			console.error(error);
		}
	} else if (req.method === "PUT") {
		const commentSchema = z.object({
			comment_id: z.number().int(),
			student_id: z.string(),
			schedule_id: z.string(),
			comment_text: z.string(),
		});
		const commentResult = commentSchema.safeParse(req.body);
		if (!commentResult.success)
			return res.status(400).json({ success: false });
		try {
			const result = await executeQuery(
				`UPDATE Comment
         SET comment_text = ?
         WHERE comment_id = ? AND schedule_id = ? AND student_id = ?`,
				[
					commentResult.data.comment_text,
					commentResult.data.comment_id,
					commentResult.data.schedule_id,
					commentResult.data.student_id,
				],
				"Failed to update comment"
			);
			return res.status(200).json({ success: true, body: result });
		} catch (error) {}
	}
	return res.status(400).send({ success: false });
}
