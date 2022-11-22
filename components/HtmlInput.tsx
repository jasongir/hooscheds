import Head from "next/head";

{
  /* <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        LOGIN
      </Button>
    </Form> */
}

interface HtmlInputProps {
  value: string | number;
  onChange: React.FormEventHandler;
  name: string;
  label: string;
  type: string;
  min?: number;
  max?: number;
}

const HtmlInput: React.FC<HtmlInputProps> = ({
  name,
  label,
  type,
  min,
  max,
  value,
  onChange,
}: HtmlInputProps) => (
  <>
    <div className = "form-group">
      <label htmlFor={name}>
        {label}
        {min && max ? (
          <input
            type={type}
            name={name}
            min={min}
            max={max}
            value={value}
            onChange={onChange}
          />
        ) : (
          <input type={type} name={name} value={value} onChange={onChange} className = "form-control" />
        )}
      </label>
    </div>
  </>
);

export default HtmlInput;
