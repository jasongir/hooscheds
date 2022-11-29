// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { student_id } = req.query;
  const resultId = z.string().safeParse(student_id);
  if (!resultId.success) return res.status(400).json({ success: false });

  try {
    const data = await executeQuery(
      `SELECT student_id_1             
                 FROM follows;`,
      [resultId.data],
      "Failed to fetch following"
    );
    return res.status(200).send(data ?? []);
  } catch (err) {}
  return res.status(400).json({ success: false });
}
