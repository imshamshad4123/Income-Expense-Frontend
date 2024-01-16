import React, { useContext, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { transactionContext } from '../context/TransactionContext/TransactionContext';

const AllTransaction = ({ alltransactions, account }) => {
    const { deleteTransactionAction, updateTransactionAction } = useContext(transactionContext)
    const [currentTransaction, setcurrentTransaction] = useState({ name: "", amount: 0, transactionType: "", category: "", date: Date.now(), notes: "" })

    console.log("all", alltransactions)
    //reduce mesthod takes accumulator and initialiser
    const refClose = useRef(null)
    // const [currentAccount, setCurrentAccount] = useState({ _id: "", name: "", initialBalance: "", accountType: "", notes: "" })
    // const [currentAccount, setCurrentAccount] = useState({ name: "", initialBalance: "", accountType: "", notes: "" })


    const updateTransaction = (currentTra) => {
        // ref.current.click();
        console.log("currrrr=====================", currentTra)
        setcurrentTransaction({ _id: currentTra._id, name: currentTra.name, amount: currentTra.amount, transactionType: currentTra.transactionType, category: currentTra.category, notes: currentTra.notes });
        // setCurrentAccount({name: currentacc.name, initialBalance: currentacc.initialBalance, accountType: currentacc.accountType, notes: currentacc.notes });

    }

    const onChange = (e) => {
        //... jo pehle se hai use rehne do aur content add kro ya override kro
        setcurrentTransaction({ ...currentTransaction, [e.target.name]: e.target.value })
    }
    console.log("curr==================", currentTransaction)
    const handleClick = (e) => {
        e.preventDefault();
        console.log("before click")
        updateTransactionAction(currentTransaction)
        console.log("after click")
        // refClose.current.click();
        // e.preventDefault();
        // addNote(note.title,note.description,note.tag);
    }

    //delete transaction 
    const handleDelete = (transactionID) => {

        //checks
        console.log("delete with id ", transactionID)
        const wantToDeleteAccount = window.confirm("Are you sure you want to delete this Transaction??")
        if (wantToDeleteAccount) {
            console.log("deleteing")
            deleteTransactionAction(transactionID);
            console.log("transaction deleted")

        }
        else {
            console.log("not deletiing")
        }
    }

    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Transaction!</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form style={{ width: '25rem' }}>
                                <h1>Update Transaction!!!</h1>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputname" className="form-label"> Transaction Name</label>
                                    <input type="text" className="form-control input-border-color-red" id="exampleInputname" name="name" value={currentTransaction.name} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label" >Amount(&#8377;)</label>
                                    <input type="number" className="form-control" id="exampleInputPassword1" name="amount" value={currentTransaction.amount} onChange={onChange} placeholder='0' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="transactionType" className="form-label">Transaction Type </label>
                                    <select name="transactionType" className="form-select" id="transactionType" value={currentTransaction.transactionType}
                                        onChange={onChange} aria-label="Default select example">
                                        <option value="" disabled>Select Transaction Type</option>

                                        <option value="Income">Income(+)</option>
                                        <option value="Expenses">Expenses(-)</option>

                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputtransation" className="form-label">Transaction category</label>
                                    <select name="category" className="form-select" id="exampleInputtransation" style={{ "backgroundColor": "rgba(155, 0, 0, 0.2)" }} value={currentTransaction.category}
                                        onChange={onChange} aria-label="Default select example">
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
                                    <input type="date" className="form-control" id="exampleInputdate" name="date" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Add Note</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="notes" value={currentTransaction.notes} onChange={onChange}></textarea>
                                </div>
                                {/* <button type="submit" className="btn btn-success form-control">Update Transaction</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Transaction</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className=" table table-responsive">
                <div className=' text-success my-5'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Amount(&#8377;)</th>
                                <th scope='col'> Note</th>
                                <th scope='col'>Update</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {alltransactions?.map((transaction, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{transaction?.name}</td>
                                        <td>{transaction?.transactionType}</td>
                                        <td>&#8377;{transaction?.amount}</td>
                                        <td>{transaction?.notes}</td>
                                        <td>
                                            <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat" onClick={() => { console.log("Button clicked"); updateTransaction(transaction) }}><FontAwesomeIcon icon={faEdit} size="lg" color="black" /></button>

                                        </td>
                                        <td>
                                            <Link onClick={() => handleDelete(transaction?._id)} className="icon-button">
                                                <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
                                            </Link>
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default AllTransaction
