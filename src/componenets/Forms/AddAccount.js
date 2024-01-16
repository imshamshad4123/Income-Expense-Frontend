import React, { useContext, useState } from 'react'
import { accountContext } from '../context/AccountContext/AccountContext';

const AddAccount = () => {
    const {createAccountAction}=useContext(accountContext)
    const [formData, setFormData] = useState({
        name: "",
        accountType: "Savings", // Set a default value
        initialBalance: 0,
        notes: "",
    });

    //handle form change
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmitHandler=((e)=>{
        e.preventDefault();
        createAccountAction(formData);
        console.log("action called")
    })
    console.log("form,data",formData)
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <form onSubmit={onSubmitHandler} style={{ width: '25rem' }}>
                <div className="mb-3">
                    <label  htmlFor="exampleInputname" className="form-label"> Account Name</label>
                    <input type="text" className="form-control input-border-color-red" id="exampleInputname" name="name"  value={formData.name} onChange={handleChange}  aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label  htmlFor="exampleInputPassword1" className="form-label" >Initial Deposit</label>
                    <input type="number" className="form-control" id="exampleInputPassword1" name="initialBalance" value={formData.initialBalance} onChange={handleChange} placeholder='0' />
                </div>
                <div className="mb-3">
                    <label  htmlFor="exampleInputPassword1" className="form-label">Account Type</label>
                    <select name="accountType" className="form-select" id="exampleInputPassword1" value={formData.accountType}
                  onChange={handleChange} aria-label="Default select example">
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
                <div className="mb-3">
                    <label  htmlFor="exampleFormControlTextarea1" className="form-label">Add Note</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="notes" value={formData.notes} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-success form-control">Create Account</button>
            </form>
        </div>
    )
}

export default AddAccount