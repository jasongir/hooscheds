import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../backend-utils/db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("POST");
    const reqData = {
      student_id: req.body.student_id,
    };
    const RequestStudent = z.object({
      student_id: z.string().max(100),
    });

    const result = RequestStudent.safeParse(reqData);
    if (!result.success) {
      console.log("user does not exist");
      return res.status(400).json({ success: false });
    } else {
      try {
        const data = await executeQuery(
          `SELECT student_id 
            FROM Student 
            WHERE student_id = ?;`,
          [result.data.student_id],
          "Failed to find user"
        );
        console.log(data, "found");
        if (!(data.length === 0)) {
          console.log("found friend", data[0].student_id);
          return res.status(201).json({ success: true, student: data[0] });
        } else {
          console.log("fail");
          return res.status(404).json({ success: false });
        }
      } catch (error) {
        console.log("ERROR");
        return res.status(404).json({ success: false });
      }
    }
  }
}
