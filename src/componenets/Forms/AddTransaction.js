import React, { useContext, useState } from 'react'
import { transactionContext } from '../context/TransactionContext/TransactionContext';
import { useParams } from 'react-router-dom';

const AddTransaction = () => {
  const { createTransactionAction ,token} = useContext(transactionContext)
  
  console.log("token",token)
  const {accountID}=useParams();
  console.log("account",accountID)
  const [formData, setFormData] = useState({
    name: "",
    transactionType: "", // Set a default value
    amount: "",
    notes: "",
    category:"",
    date: "",
  });

  //handle form change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = ((e) => {
    e.preventDefault();
    // console.log("formdata",formData)

    // createTransactionAction({ account: accountID, ...formData });
    formData.account=accountID
    console.log("newformdata",formData)
    createTransactionAction(formData);


    console.log("action called")
  })
  // console.log("form,data", formData)
  return (
    <>
      {token && 
       <div className="container-fluid   d-flex justify-content-center align-items-center my-5" style={{ height: '60vh' }}>
       <form onSubmit={onSubmitHandler} style={{ width: '25rem' }}>
         <h1>Create A Transaction</h1>
 
         <div className="mb-3">
           <label htmlFor="exampleInputname" className="form-label"> Transaction Name</label>
           <input type="text" className="form-control input-border-color-red" id="exampleInputname" name="name" value={formData.name} onChange={handleChange} aria-describedby="emailHelp" />
         </div>
         <div className="mb-3">
           <label htmlFor="exampleInputPassword1" className="form-label" >Amount(&#8377;)</label>
           <input type="number" className="form-control" id="exampleInputPassword1" name="amount" value={formData.amount} onChange={handleChange} placeholder='0' />
         </div>
         <div className="mb-3">
           <label htmlFor="transactionType" className="form-label">Transaction Type </label>
           <select name="transactionType" className="form-select" id="transactionType" value={formData.transactionType}
             onChange={handleChange} aria-label="Default select example">
             <option value="" disabled>Select Transaction Type</option>
 
             <option value="Income">Income(+)</option>
             <option value="Expenses">Expenses(-)</option>
 
           </select>
         </div>
         <div className="mb-3">
           <label htmlFor="exampleInputtransation" className="form-label">Transaction category</label>
           <select name="category" className="form-select" id="exampleInputtransation" style={{ "backgroundColor": "rgba(155, 0, 0, 0.2)" }} value={formData.category}
             onChange={handleChange} aria-label="Default select example">
             <option value="" disabled>Select Category Type</option>
             <option value="Food">Food</option>
             <option value="Transportation">Transportation</option>
             <option value="Entertainment">Entertainment</option>
             <option value="Shopping">Shopping</option>
             <option value="Utilities">Utilities</option>
             <option value="Health">Health</option>
             <option value="Travel">Travel</option>
             <option value="Education">Education</option>
             <option value="Personal">Personal</option>
             <option value="Groceries">Groceries</option>
             <option value="Bills">Bills</option>
             <option value="Uncategorized">Uncategorized</option>
           </select>
         </div>
         <div className="mb-3">
           <label htmlFor="exampleInputdate" className="form-label" >Date</label>
           <input type="date" className="form-control" id="exampleInputdate" name="date" value={formData.date} onChange={handleChange} />
         </div>
         <div className="mb-3">
           <label htmlFor="exampleFormControlTextarea1" className="form-label">Add Note</label>
           <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="notes" value={formData.notes} onChange={handleChange}></textarea>
         </div>
         <button type="submit" className="btn btn-success form-control">Add A Transaction</button>
       </form>
     </div>
      }
   
    </>

  )
}

export default AddTransaction