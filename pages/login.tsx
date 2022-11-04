import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // let navigate = useNavigate();

  // useEffect(()=>{
  //     navigate("/");
  // });

  // const handleSubmit = (event) => {
  //     event.preventDefault();
  // }

  return (
    <form>
      <a href="http://localhost:3000/signup" target="_blank">
        <Button> Go Back </Button>
      </a>

      <label>
        {" "}
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Password:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <div className="form-group">
        <a href="http://localhost:3000/signup" target="_blank">
          <Button> Haven't Registered? Go to Signup Page </Button>
        </a>
      </div>
    </form>
  );
}
