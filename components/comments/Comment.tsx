import { Button, Card } from "react-bootstrap";

export interface CommentProps {
	student_id: string;
	comment_text: string;
	update: () => void;
	delete: () => void;
}

const Comment = (props: CommentProps) => {
	return (
		<Card>
			<Card.Body>
				<Card.Title>{props.student_id}</Card.Title>
				<Card.Subtitle>{props.comment_text}</Card.Subtitle>
				<Button onClick={props.update} variant="primary">
					EDIT
				</Button>
				<Button onClick={props.delete} variant="danger">
					DELETE
				</Button>
			</Card.Body>
		</Card>
	);
};

export default Comment;
