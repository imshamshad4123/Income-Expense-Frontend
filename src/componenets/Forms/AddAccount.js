import React, { useContext, useState } from 'react'
import { accountContext } from '../context/AccountContext/AccountContext';
import { useNavigate } from 'react-router-dom';

const AddAccount = () => {
    let navigate = useNavigate();

    const {createAccountAction}=useContext(accountContext)
    const [formData, setFormData] = useState({
        name: "",
        accountType: "Savings", // Set a default value
        initialBalance: 0,
        notes: "",
    });

    //handle form change
    const handleChange = e => {
        const newValue = e.target.name === "initialBalance" ? parseInt(e.target.value, 10) : e.target.value;

        setFormData({ ...formData, [e.target.name]: newValue });
    };
    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        const res = await createAccountAction(formData);
        if (res==="success"){
            console.log("res====",res)
            // setTokenFromLocalStorageToUserAuth()
            navigate(-1)
          }else{
            console.log(" create account erorrr=========",res)
          }
        console.log("action called")
        setFormData({  name: "",
        accountType: "Savings", // Set a default value
        initialBalance: 0,
        notes: "",});
    }
    console.log("form,data",formData)
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <form onSubmit={onSubmitHandler} style={{ width: '25rem' }}>
                <div className="mb-3">
                    <label  htmlFor="exampleInputname" className="form-label"> Account Name</label>
                    <input type="text" className="form-control input-border-color-red" id="exampleInputname" name="name"  value={formData.name} onChange={handleChange}  aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label  htmlFor="exampleInputPassword1" className="form-label" >Initial Deposit</label>
                    <input type="number" className="form-control" id="exampleInputPassword1" name="initialBalance" value={formData.initialBalance} onChange={handleChange} placeholder='0' required />
                </div>
                <div className="mb-3">
                    <label  htmlFor="exampleInputPassword1" className="form-label">Account Type</label>
                    <select name="accountType" className="form-select" id="exampleInputPassword1" value={formData.accountType}
                  onChange={handleChange} aria-label="Default select example" required>
                        <option value="Savings">Savings</option>
                        <option value="Investment">Investment</option>
                        <option value="Checking">Checking</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Builing">Builing</option>
                        <option value="Travel">Travel</option>
                        <option value="Education">Education</option>
                        <option value="Personal">Personal</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Project">Project</option>
                        <option value="Uncategorized">Uncategorized</option>
                    </select>
                </div>
                <div className="mb-3" required>
                    <label  htmlFor="exampleFormControlTextarea1" className="form-label">Add Note</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="notes" value={formData.notes} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-success form-control">Create Account</button>
            </form>
        </div>
    )
}

export default AddAccount