import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { accountContext } from '../context/AccountContext/AccountContext';
const AccountList = ({ accounts }) => {

    const { updateAccountAction, deleteAccountAction } = useContext(accountContext)
    console.log("acc", accounts);
    // const ref = useRef(null)
    // refclose is used to close the modal window using useref hook 
    // const refClose = useRef(null)
    const [currentAccount, setCurrentAccount] = useState({ _id: "", name: "", initialBalance: "", accountType: "", notes: "" })
    // const [currentAccount, setCurrentAccount] = useState({ name: "", initialBalance: "", accountType: "", notes: "" })


    const updateAccount = (currentacc) => {
        // ref.current.click();
        console.log("currrrr=====================", currentacc)
        setCurrentAccount({ _id: currentacc._id, name: currentacc.name, initialBalance: currentacc.initialBalance, accountType: currentacc.accountType, notes: currentacc.notes });
        // setCurrentAccount({name: currentacc.name, initialBalance: currentacc.initialBalance, accountType: currentacc.accountType, notes: currentacc.notes });

    }

    const onChange = (e) => {
        //... jo pehle se hai use rehne do aur content add kro ya override kro
        setCurrentAccount({ ...currentAccount, [e.target.name]: e.target.value })
    }
    console.log("curr==================", currentAccount)
    const handleClick = (e) => {
        e.preventDefault();
        console.log("before click")
        updateAccountAction(currentAccount)
        console.log("after click")
        // refClose.current.click();
        // e.preventDefault();
        // addNote(note.title,note.description,note.tag);
    }

    //delete an account
    const handleDelete = (id) => {
        console.log("delete with id ", id)
        const wantToDeleteAccount = window.confirm("Are you sure you want to delete this Account??")
        if (wantToDeleteAccount) {
            console.log("deleteing")
            deleteAccountAction(id)

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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Account</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputname" className="form-label"> Account Name</label>
                                    <input type="text" className="form-control input-border-color-red" id="exampleInputname" name="name" value={currentAccount.name} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="balance" className="form-label" >Initial Deposit</label>
                                    <input type="number" className="form-control" id="balance" name="initialBalance" value={currentAccount.initialBalance} placeholder='0' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Account Type</label>
                                    <select name="accountType" className="form-select" id="exampleInputPassword1" value={currentAccount.accountType} onChange={onChange}
                                        aria-label="Default select example">
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
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Add Note</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="notes" value={currentAccount.notes} onChange={onChange}></textarea>
                                </div>
                                {/* <button type="submit" className="btn btn-success form-control">Submit</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Account</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="">

                <div className="d-flex justify-content-between my-5">
                    <h2 className=' container text-center text-success '> Your All Accounts!</h2>
                    <Link to={`/dashboard/create-account`} type='button' className='btn' style={{ "backgroundColor": "#475", "color": "white" }}>
                        Add New Account
                    </Link>
                </div>
            </div>

            {(!accounts || accounts.length === 0) ? (
                <div className="container">
                    <div>No Accounts to display</div>
                    <Link to="/dashboard/create-account" type='button' className='btn btn-success'>Create Account</Link>
                </div>
            ) : (
                <div className="container">
                    {accounts?.map(acc => (
                        <div className="row justify-content-center" key={acc?._id}>
                            <div className="col-md-6">
                                <div className="card mb-3 shadow-lg p-3 mb-2 bg-body-tertiary rounded">
                                    <div className="card-body">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <h5 className="card-title">{acc?.name}</h5>
                                            <span style={{ marginLeft: 'auto' }}>
                                                <button
                                                    type="button"
                                                    className="btn"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                    data-bs-whatever="@fat"
                                                    onClick={() => { console.log("Button clicked"); updateAccount(acc) }}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} size="lg" color="black" />
                                                </button>
                                                <Link
                                                    className="icon-button"
                                                    onClick={() => { console.log("delete link clicked"); handleDelete(acc?._id) }}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} size="lg" color="red" />
                                                </Link>
                                            </span>
                                        </div>

                                        <p className="card-text">{acc?.notes}</p>
                                        <div className="d-flex flex-column flex-md-row justify-content-between">
                                            <h3 className="mb-3 mb-md-0">Total Available Balance-&#8377;{acc?.initialBalance}</h3>
                                            <Link to={`/account-details/${acc._id}`} type='button' className='btn btn-success mt-3 mt-md-0'>
                                                View Transactions
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
};

export default AccountList;
