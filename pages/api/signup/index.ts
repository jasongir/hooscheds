import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const reqData = {
      student_id: req.body.student_id,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      year: req.body.year,
      primary_major: req.body.primary_major,
    };
    const Student = z.object({
      student_id: z.string().max(100),
      password: z.string().max(100),
      first_name: z.string().max(100),
      last_name: z.string().max(100),
      year: z.number().int().gte(1).lte(5),
      primary_major: z.string().max(100),
    });

    const result = Student.safeParse(reqData);
    if (!result.success) {
      return res.status(400).json({ success: false });
    } else {
      try {
        const data = await executeQuery(
          `INSERT INTO 
            Student(student_id, password, first_name, last_name, year, num_friends, primary_major) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            result.data.student_id.substring(
              0,
              result.data.student_id.indexOf("@")
            ),
            result.data.password,
            result.data.first_name,
            result.data.last_name,
            result.data.year,
            0,
            result.data.primary_major,
          ],
          "Failed to insert into Student"
        );
        console.log(
          result.data.student_id.substring(
            0,
            result.data.student_id.indexOf("@")
          )
        );
        return res.status(201).json({ success: true });
      } catch (error) {
        console.log("ERROR");
        return res.status(400).json({ success: false });
      }
    }
  }
}
