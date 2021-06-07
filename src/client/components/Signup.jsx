import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from 'axios';


const Signup = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (data, e) => {
    e.preventDefault();
    // console.log(data);

    axios.post('http://localhost:4000/signup', data)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          history.push('/login');
        }
      })
    e.target.reset();
  };

  return (
    <div className="App">
      <h1>Sign Up!</h1>
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

        <input type="submit" value="signup" />
      </form>
    </div>
  )
};

export default Signup;