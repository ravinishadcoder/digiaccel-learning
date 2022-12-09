import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "../App.css";
function Signup() {
  const [cred, setCred] = useState({ role: "", email: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("https://degiaccel-backend.onrender.com/signup", cred);
      navigate("/login");
    } catch (e) {
      setError(true);
    }
  };
  return (
    <div className="signupBox">
      <h3 style={{ textAlign: "center" }}>Signup</h3>
      <Form onSubmit={handleSubmit} required>
        <Form.Group className="mb-">
          <Form.Label>Select role</Form.Label>
          <Form.Select
            aria-label="Select role"
            value={cred.role}
            name="role"
            onChange={handleChange}
          >
            <option>select role</option>
            <option value="admin">admin</option>
            <option value="user">user</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={cred.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={cred.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group>
          {error && <span className="warning">user already exists</span>}
        </Form.Group>
        <Button style={{ marginTop: "5px" }} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
