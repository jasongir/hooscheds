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
  if (!resultId.success) return res.status(400).json({ success : false });

  try {
    const data = await executeQuery(
      `SELECT * FROM Comment
      WHERE schedule_id =?;`,
      [resultId.data],
      "Failed to fetch schedules"
    );
    return res.status(200).send(data ?? []);
  } catch (err) {}
  return res.status(400).json({ success: false });
}
