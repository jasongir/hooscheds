import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { z } from "zod";
import HtmlInput from "../../components/HtmlInput";

export default function Comments() {
  const router = useRouter();
  const { student_id: sid, comment_id : cid} = router.query;
//   const sidRes = z.string().safeParse(sid);
//   const cidRes = z.string().safeParse(cid)
//   if (!sidRes.success) return <p>ERROR: </p>;
import React from "react";

export default function Comment() {
	return (
		<>
			<div className="p-3 text-center bg-light">
				<h1 className="mb-3">Comment</h1>
			</div>
		</>
	);
}
