import React, { useContext, useState } from 'react';
import { authContext } from '../context/AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';

const Login = (props) => {
  let navigate = useNavigate();
  const { loginUserAction, userAuth } = useContext(authContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUserAction(formData);

    
    // navigate("/dashboard");
  };
console.log("userAuth",userAuth)
  return (
    <>
    
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
      
        
      
        <div className="card p-4 " style={{ width: '30rem', backgroundColor: 'rgba(36, 37, 42,1)' }}
        >
        <p className='text-center'>
          {userAuth?.error && (
            <span className="text-danger">{userAuth?.error}</span>
          )}
        </p>
          <form onSubmit={handleSubmit} style={{ color: 'white' }}>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={email}
                onChange={onChangeInput}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={password}
                onChange={onChangeInput}
                required
              />
            </div>

            <button type="submit" className="form-control btn btn-success">Sign In</button>
            <pre className='my-2'>Not Registered Yet?<Link to="/Register" style={{ textDecoration: 'none' }}>Register</Link></pre>
          </form>
        </div>
      </div>

    </>
  );
};

export default Login;
