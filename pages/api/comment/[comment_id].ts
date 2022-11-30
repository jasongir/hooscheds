// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "DELETE") {
		const commentSchema = z.object({
			comment_id: z.string(),
		});
		const commentResult = commentSchema.safeParse(req.query);
		if (!commentResult.success)
			return res.status(400).send({ success: false });

		try {
			const comments = await executeQuery(
				`DELETE 
               FROM Comment
               WHERE comment_id = ?`,
				[commentResult.data.comment_id],
				"Could not fetch comments"
			);
			return res.status(200).send({ success: true, body: comments });
		} catch (err) {
			console.error(err);
		}
	}
	return res.status(400).send({ success: false });
}
