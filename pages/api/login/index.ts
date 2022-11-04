// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";

// TODO: Send JWT token with username from DB

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const data = await executeQuery(
			`SELECT student_id FROM Student WHERE student_id = ? AND password = ?;`,
			[req.body["username"], req.body["password"]],
			"Failed to fetch user"
		);
		return res.status(200).send(data ?? []);
	} catch (err) {
		return res.status(400).json({ success: false, message: err });
	}
}