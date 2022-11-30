// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { student_id, comment_id } = req.query;
  const resultId = z.string().safeParse(student_id);
  const resultId2 = z.string().safeParse(comment_id);
  if (!resultId.success) return res.status(400).json({ success: false });
  if (!resultId2.success) return res.status(400).json({ success: false });

  try {
    const data = await executeQuery(
      `SELECT comment_text, student_id            
                 FROM Comment              
                 WHERE student_id == ? AND comment_id == ?;`,
      [resultId.data, resultId2.data],
      "Failed to fetch following"
    );
    return res.status(200).send(data ?? []);
  } catch (err) {}
  return res.status(400).json({ success: false });
}
