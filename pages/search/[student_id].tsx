import { Col, Container, Row } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { LoggedInStudent, FindFriend } from "../../utils/utils";
import { useRouter } from "next/router";
import { z } from "zod";


export default function FollowFriend() {
    const router = useRouter();
    const { student_id: sid } = router.query;
    const sidRes = z.string().safeParse(sid);
    
	return (
		<>
        <p>{sid}</p>
		</>
	);
}
