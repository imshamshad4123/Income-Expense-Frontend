import React, { useContext, useState } from 'react'
import { authContext } from '../context/AuthContext/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Register = (props) => {
    const navigate = useNavigate();
    const { registerUserAction, userAuth, error } = useContext(authContext)
    const [formData, setFormData] = useState({ fullname: "", email: "", password: "" })
    // const {fullname,email,password}=formData
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(!fullname || !email || !password){
        //     return alert("please fill the form details")
        // }
        registerUserAction(formData);



    }
    console.log("userauth===register",userAuth)
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
                            <input type="text" className="form-control" id="exampleInputname" name="fullname" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange} />
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