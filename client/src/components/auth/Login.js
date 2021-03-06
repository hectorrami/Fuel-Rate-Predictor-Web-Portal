import React, { useState, useContext } from "react";
import AuthService from "../../Services/AuthService";
import Message from "../../components/Message";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../img/logo.svg";
import "../../App.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/profile");
      } else setMsg(message);
    });
  };

  return (
    <div>
      <Form onSubmit={onSubmit} className="login-form">
        <img src={logo} className="logo" alt="logo" />
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            className="mb-3"
            onChange={onChange}
            required
            minLength="5"
          />
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-3"
            onChange={onChange}
          />
          <Button className="btn-lg btn-dark btn-block mb-3" onClick={onSubmit}>
            Login
          </Button>
        </FormGroup>
      </Form>
      {msg ? <Message message={msg} /> : null}
    </div>
  );
};

export default Login;
