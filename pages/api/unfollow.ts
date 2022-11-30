import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../backend-utils/db";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { LoggedInStudent } from "utils/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("check");
  if (req.method === "POST") {
    const reqData = {
      student_id_1: req.body.student_id_1,
      student_id_2: req.body.student_id_2,
    };

    console.log("s1:", req.body.student_id_1, "s2:", req.body.student_id_2);

    const RequestStudent = z.object({
      student_id_1: z.string().max(100),
      student_id_2: z.string().max(100),
    });

    const result = RequestStudent.safeParse(reqData);

    if (!result.success) {
      return res.status(400).json({ success: false });
    } else {
      try {
        const data = await executeQuery(
          `DELETE FROM follows 
                    WHERE student_id_1 = ?
                    AND student_id_2 = ?`,
          [result.data.student_id_1, result.data.student_id_2],
          "Failed to unfollow"
        );
        console.log(data, "unfollowed");

        return res.status(201).json({ success: true, student: data[0] });
      } catch (error) {
        console.log("ERROR");
        return res.status(400).json({ success: false });
      }
    }
  }
}
