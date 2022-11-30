// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const data = await executeQuery(
			`SELECT * FROM Course;`,
			[],
			"Failed to fetch courses"
		);
		return res.status(200).send(data ?? []);
	} catch (err) {
		return res.status(400).json({ success: false });
	}
}
