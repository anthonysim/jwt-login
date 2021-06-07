import React from "react";
import { useForm } from "react-hook-form";
import { isAuthenticated } from '../actions/index.jsx';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import axios from 'axios';


const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  // submitting login info handler
  const onSubmit = (data, e) => {
    e.preventDefault();

    axios.post('/login', data)
      .then(res => {
        if (res.status === 200) {
          document.cookie = `token=${res.data.token};` //  max-age=30 3600 equals 60 min // Secure; HttpOnly in production`
          dispatch(isAuthenticated(true))
          return history.push('/protected');
        }
      })
      .catch(err => console.error(err))

    e.target.reset();
  };

  return (
    <div className="App">
      <h1>Log In!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder="JamesHowlett@gmail.com"
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && "Email is required"}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: true
            })}
          />
          {errors.password && "Password is required"}
        </div>
        <input type="submit" value="login" />
      </form>
    </div>
  )
};

export default Login;