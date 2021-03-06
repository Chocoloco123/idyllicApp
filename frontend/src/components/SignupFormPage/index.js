import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
          // console.log('backendSignupErrors: ', errors);
          // console.log('dataErrors: ', data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='formContainer'>
        <div className='loginTitleDiv'>
          <h1 className='introLabel'>Signup</h1>
        </div>
        <ul className='loginErrorsList'>
          {errors.map((error, idx) => <li key={idx} className='loginErrors'>{error}</li>)}
        </ul>
        <label className='introLabel'>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
            className='authInputs'
          />
        </label>
        <label className='introLabel'>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
            className='authInputs'
          />
        </label>
        <label className='introLabel'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
            className='authInputs'
          />
        </label>
        <label className='introLabel'>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // required
            className='authInputs'
          />
        </label>
        <div className='signupLoginBtn'>
          <button type="submit" className='signupLoginSubmit'>Sign Up</button>
        </div>
      </div>
    </form>
  );
}

export default SignupFormPage;