import React, { useContext, useState } from 'react';
import { authContext } from '../context/AuthContext/AuthContext';

import { Link, useNavigate } from 'react-router-dom';
import { faUnderline } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { accountContext } from '../context/AccountContext/AccountContext';
const Login = (props) => {
  let navigate = useNavigate();
  const { loginUserAction, userAuth, error, token } = useContext(authContext);
  const { setTokenFromLocalStorageToUserAuth } = useContext(accountContext)

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;
  // const [initialUserAuth,setInitialUserAuth]=useState(userAuth);

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUserAction(formData)
    if (res === "success") {
      console.log("res====", res)
      // setTokenFromLocalStorageToUserAuth()
      navigate("/dashboard")
    } else {
      console.log(" Login erorrr=========", res)
    }


  };
  console.log("user--->", userAuth)
  return (
    <>
      {!token &&

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
                  minLength={5}
                  required
                />
              </div>
              <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>

              <div className="input-group mb-3">
                <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                </span>
                {/* <button className="btn btn-outline-secondary" type="button" id="button-addon1"> Button</button> */}

                <input type={showPassword ? 'text' : 'password'} className="form-control" id="exampleInputPassword1" name="password" value={password} onChange={onChangeInput} minLength={5} required />
              </div>

              <button type="submit" className="form-control btn btn-success">Sign In</button>
              <pre className='my-2'>Not Registered Yet?<Link to="/Register" style={{ textDecoration: 'none' }}>Register</Link></pre>
            </form>
          </div>
        </div>
      }


    </>
  );
};

export default Login;
