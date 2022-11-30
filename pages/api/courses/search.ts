// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";
import { CourseSection } from "utils/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	if (req.method === "GET") {
		const searchDataSchema = z.object({
			course_id: z.string().optional(),
			course_name: z.string().optional(),
			term: z.string().optional(),
		});
		const searchData = searchDataSchema.safeParse(req.query);
		if (!searchData.success)
			return res.status(400).json({
				success: false,
				message: "Incorrectly formatted data",
			});
		const finalSearchValues = Object.entries(searchData.data).reduce(
			(currData, [key, value]) => {
				currData[key] = `%${value}%`;
				return currData;
			},
			{} as { [key: string]: string }
		);
		try {
			const data = await executeQuery(
				`WITH courses AS 
               (SELECT * 
               FROM Course 
               WHERE course_id LIKE ? AND
                  course_name LIKE ? AND
                  term LIKE ?)
               SELECT * 
               FROM courses NATURAL JOIN Section 
               LIMIT 100`,
				[
					finalSearchValues.course_id,
					finalSearchValues.course_name,
					finalSearchValues.term,
				],
				"Failed to fetch matching courses"
			);
			console.log(data);
			return res.status(200).json(data ?? ([] as CourseSection[]));
		} catch (err) {
			console.log(err);
		}
	}
	return res.status(400).json({ success: false });
}
