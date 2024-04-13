import React, { useContext, useState } from 'react'
import { authContext } from '../context/AuthContext/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Register = (props) => {
    const navigate = useNavigate();
    const { registerUserAction, userAuth, error } = useContext(authContext)
    const [formData, setFormData] = useState({ fullname: "", email: "", password: "" })
    const {fullname,email,password}=formData
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(!fullname || !email || !password){
        //     return alert("please fill the form details")
        // }
        await registerUserAction(formData);

        if (!userAuth?.error) {
            // If no error, navigate to the dashboard
            navigate("/login");
        }

    }
    console.log("userauth===register", userAuth)
    // }
    return (
        <div>
            <div className="container   d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <div className="card p-4 " style={{ width: '30rem', backgroundColor: 'rgba(4, 59, 92, 1)' }}
                >
                    <form style={{ color: 'white' }} onSubmit={handleSubmit}>
                        <p className='text-center'>
                            {userAuth?.error && (
                                <span className="text-light">{userAuth?.error}</span>
                            )}
                        </p>
                        <div className="mb-3">
                            <label htmlFor="exampleInputname" className="form-label" >Full Name</label>
                            <input type="text" className="form-control" id="exampleInputname" name="fullname"  value={fullname}onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={email} onChange={onChange} minLength={5} required />
                        </div>

                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="addon-wrapping"><FontAwesomeIcon icon={showPassword?faEye:faEyeSlash} style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility} />
                            </span>
                            {/* <button className="btn btn-outline-secondary" type="button" id="button-addon1"> Button</button> */}

                            <input  type={showPassword ? 'text' : 'password'} className="form-control" id="exampleInputPassword1" name="password" value={password} onChange={onChange} minLength={5} required />
                        </div>



                        <button type="submit" className="form-control btn btn-success">SignUp</button>
                        <pre className='my-2'>Already A User?? <Link to="/Login" style={{ textDecoration: 'none' }}>Login</Link></pre>

                    </form>

                </div>
            </div>
        </div>
    );
}




export default Register