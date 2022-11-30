import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
	CreateCommentData,
	createScheduleComment,
	deleteComment,
	DeleteComment,
	getScheduleComments,
	updateComment,
	UpdateCommentData,
} from "utils/utils";
import Comment from "./Comment";

interface CommentsProps {
	schedule_id: string;
	student_id: string;
}

const Comments = ({ schedule_id, student_id }: CommentsProps) => {
	const queryClient = useQueryClient();
	const { data: commentData, isLoading } = useQuery({
		queryKey: ["comments"],
		queryFn: () => getScheduleComments({ schedule_id }),
	});
	const commentMutation = useMutation({
		mutationFn: (data: CreateCommentData | UpdateCommentData) => {
			if (mode === "UPDATE" && "comment_id" in data) {
				return updateComment(data);
			} else {
				return createScheduleComment(data);
			}
		},
		onSuccess: () => queryClient.invalidateQueries(["comments"]),
	});
	const deleteCommentMutation = useMutation({
		mutationFn: (data: DeleteComment) => deleteComment(data),
		onSuccess: () => queryClient.invalidateQueries(["comments"]),
	});

	const [mode, setMode] = useState<"CREATE" | "UPDATE">("CREATE");
	const [commentText, setCommentText] = useState("");
	const [metaDataState, setMetaDataState] = useState<{
		comment_id: number;
		student_id: string;
		schedule_id: string;
	}>({ comment_id: -1, student_id, schedule_id });
	const onCommentSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await commentMutation.mutateAsync({
			...(mode === "UPDATE" && { comment_id: metaDataState.comment_id }),
			comment_text: commentText,
			student_id: metaDataState.student_id,
			schedule_id: metaDataState.schedule_id,
		});
	};

	const updateCommentHandler =
		({
			comment_id,
			student_id,
			schedule_id,
			comment_text,
		}: UpdateCommentData) =>
		() => {
			setMode("UPDATE");
			setMetaDataState({ comment_id, student_id, schedule_id });
			setCommentText(comment_text);
		};
	const deleteCommentHandler =
		({ comment_id, student_id, schedule_id }: DeleteComment) =>
		() => {
			deleteCommentMutation.mutateAsync({
				comment_id,
				student_id,
				schedule_id,
			});
		};

	return (
		<section>
			<h2>Comments</h2>
			<Form onSubmit={onCommentSubmit}>
				<input
					type="text"
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}
				/>
				<Button type="submit">{mode} COMMENT</Button>
				{mode === "UPDATE" && (
					<Button
						onClick={() => {
							setMode("CREATE");
							setMetaDataState({
								comment_id: -1,
								student_id,
								schedule_id,
							});
							setCommentText("");
						}}
					>
						EXIT UPDATE
					</Button>
				)}
			</Form>
			{commentData?.body?.map(
				({
					comment_text,
					student_id,
					comment_id,
				}: {
					comment_text: string;
					student_id: string;
					comment_id: number;
				}) => (
					<Comment
						key={comment_id}
						comment_text={comment_text}
						student_id={student_id}
						update={updateCommentHandler({
							comment_id,
							student_id,
							schedule_id,
							comment_text,
						})}
						delete={deleteCommentHandler({
							comment_id,
							student_id,
							schedule_id,
						})}
					/>
				)
			)}
			{/*JSON.stringify(commentData)*/}
		</section>
	);
};

export default Comments;
