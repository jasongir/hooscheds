// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { schedule_id } = req.query;
  const resultId = z.string().safeParse(schedule_id);
  if (!resultId.success) return res.status(400).json({ success: false });

  try {
    const data = await executeQuery(
      `SELECT course_id, section_id, start_time, end_time, meeting_dates, location, availability 
      FROM (SELECT * FROM section_schedule WHERE schedule_id = ?) AS T1 NATURAL JOIN Section;`,
      [resultId.data],
      "Failed to fetch schedules"
    );
    return res.status(200).send(data ?? []);
  } catch (err) {}
  return res.status(400).json({ success: false });
}




