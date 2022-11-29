import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Courses() {
  return (
    <>
      <div className="p-3 text-center bg-light">
        <h1 className="mb-3">Courses</h1>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Search for Classes</Form.Label>
          <Form.Control placeholder="Enter course name" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
