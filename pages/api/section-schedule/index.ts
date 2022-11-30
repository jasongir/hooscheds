// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const reqData = {
        schedule_id: req.body.first_schedule_id,
        course_id: req.body.course_id,
        section_id: req.body.section_id,
      };
      const Section = z.object({
        schedule_id: z.string().max(100),
        course_id: z.string().max(100),
        section_id: z.string().max(100),
      });
  
      const result = Section.safeParse(reqData);
      if (!result.success) {
        return res.status(400).json({ success: false });
      } 

    try {
      const data = await executeQuery(
        `INSERT INTO section_schedule
        VALUES (?, ?, ?);`,
        [result.data.schedule_id, result.data.course_id, result.data.section_id],
        "Failed to add course to schedule"
      );
      return res.status(201).json({ success: true });
    } catch (err) {}
    return res.status(400).json({ success: false });
  }
