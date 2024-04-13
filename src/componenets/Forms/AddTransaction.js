import React, { useContext, useState,useEffect } from 'react'
import { transactionContext } from '../context/TransactionContext/TransactionContext';
import { useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../context/AuthContext/AuthContext';

const AddTransaction = () => {
  const navigate = useNavigate()
  // let history = useHistory();

  const { createTransactionAction ,setTokenFromLocalStorageToUserAuth} = useContext(transactionContext)
  const { token } = useContext(authContext)

  useEffect( ()=>{
   setTokenFromLocalStorageToUserAuth()
  },[])
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
  const onSubmitHandler = (async (e) => {
    e.preventDefault();
    // console.log("formdata",formData)

    // createTransactionAction({ account: accountID, ...formData });
    formData.account=accountID
    console.log("newformdata",formData)
    const res = await createTransactionAction(formData);

    //again setting fields to empty
    if (res==="success"){
      console.log("res====",res)
      // navigate(`/account-details/${accountID}`)
      navigate(-1)
    }else{
      console.log(" create account erorrr=========",res)
    }
    setFormData({ name: "",
    transactionType: "", // Set a default value
    amount: "",
    notes: "",
    category:"",
    date: "", });

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
           <input type="text" className="form-control input-border-color-red" id="exampleInputname" name="name" value={formData.name} onChange={handleChange} aria-describedby="emailHelp" required/>
         </div>
         <div className="mb-3">
           <label htmlFor="exampleInputPassword1" className="form-label" >Amount(&#8377;)</label>
           <input type="number" className="form-control" id="exampleInputPassword1" name="amount" value={formData.amount} onChange={handleChange} placeholder='0'required />
         </div>
         <div className="mb-3">
           <label htmlFor="transactionType" className="form-label">Transaction Type </label>
           <select name="transactionType" className="form-select" id="transactionType" value={formData.transactionType}
             onChange={handleChange} aria-label="Default select example" required>
             <option value="" disabled>Select Transaction Type</option>
 
             <option value="Income">Income(+)</option>
             <option value="Expenses">Expenses(-)</option>
 
           </select>
         </div>
         <div className="mb-3">
           <label htmlFor="exampleInputtransation" className="form-label">Transaction category</label>
           <select name="category" className="form-select" id="exampleInputtransation" style={{ "backgroundColor": "rgba(155, 0, 0, 0.2)" }} value={formData.category}
             onChange={handleChange} aria-label="Default select example" required>
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
           <input type="date" className="form-control" id="exampleInputdate" name="date" value={formData.date} onChange={handleChange} required/>
         </div>
         <div className="mb-3">
           <label htmlFor="exampleFormControlTextarea1" className="form-label">Add Note</label>
           <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="notes" value={formData.notes} onChange={handleChange} required></textarea>
         </div>
         <button type="submit" className="btn btn-success form-control">Add A Transaction</button>
       </form>
     </div>
      }
   
    </>

  )
}

export default AddTransaction