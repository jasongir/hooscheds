import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../backend-utils/db";
import jwt from "jsonwebtoken";
import { number, z } from "zod";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const reqData = {
      student_id: req.body.student_id,
      password: req.body.password,
    };
    const RequestStudent = z.object({
      student_id: z.string().max(100),
      password: z.string().max(100),
    });
    interface ResponseStudent {
      student_id: String;
      first_name: String;
      last_name: String;
      year: number;
      num_friends: number;
      primary_major: number;
    };

    const result = RequestStudent.safeParse(reqData);
    if (!result.success) {
      return res.status(400).json({ success: false });
    } else {
      try {
        const data:ResponseStudent[] = await executeQuery(
          `SELECT student_id, first_name, last_name, year, num_friends, primary_major FROM 
            Student WHERE student_id=? AND password=?`,
          [
            result.data.student_id.substring(
              0,
              result.data.student_id.indexOf("@") ?? -1
            ),
            result.data.password,
          ],
          "Failed to find user"
        ) as ResponseStudent[];
  
        
        // create a JWT token valid for 1 hour here
        const token = jwt.sign(
          {
            data: data[0].student_id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          result.data.password
        );
        return res.status(200).json({ token: token, student: data[0] });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false });
      }
    }
  }
}
