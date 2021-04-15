import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/auth/signin'),
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const res = await doRequest();
    } else {
      // errors = [{ message: 'Password must be matched' }];
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>

      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default signup;
