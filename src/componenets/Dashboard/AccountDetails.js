import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { accountContext } from '../context/AccountContext/AccountContext'
import AllTransaction from './AllTransaction'

const AccountDetails = () => {
    const { getAccountDetails, account } = useContext(accountContext)
    const { accountID } = useParams();
    console.log(accountID)
    useEffect(() => {
        getAccountDetails(accountID);
    }, [accountID])
    console.log("Account-transaction", account?.transactions)

    //calculate Total Income

    //reduce mesthod takes accumulator and initializer in this case it is 0
    const totalIncome = account?.transactions?.reduce((acc, transaction) => {
        console.log("bool", transaction?.transactionType === "Income")
        if (transaction?.transactionType === "Income") {
            return acc + transaction?.amount
        } else {
            return acc;
        }
    }, 0)
    console.log("totalIncome", totalIncome)
    //calculate total expenses
    const totalExpense = account?.transactions?.reduce((acc, transaction) => {
        if (transaction?.transactionType === "Expenses") {
            return acc + transaction?.amount
        } else {
            return acc;
        }
    }, 0)
    console.log("Total Expenses", totalExpense)
    return (
        <div>
            <>
                
                {account?.transactions?.length <= 0 ?<>
                 <div className="container text-center   my-5">
                            <h2 className='text-success '> No Transaction To Dispaly!!!</h2> 
                            <Link to={`/create-transaction/${account?._id}`} type='button' className='btn' style={{ "backgroundColor": "#475", "color": "white" }}>
                                Create New Transaction
                            </Link>
                        </div>
                 </>
                    :
                    <>

                        <div className="container card shadow-lg p-3 mb-5 bg-body-tertiary rounded my-2">
                            <div className="card-header text-center">
                                <h1> Balance  Details For {account?.name} Account</h1>
                            </div>
                            <div className="card-body">
                                <div className="container text-center">
                                    <div className="row">

                                        <div className="col">
                                            <h3>Total Available Balance</h3>
                                            <div className="badge bg-primary text-wrap fs-4" >
                                                &#8377; {totalIncome + account?.initialBalance - totalExpense}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h3>Total  Income</h3>
                                            <div className="badge bg-success text-wrap fs-4" >
                                                &#8377;{totalIncome + account?.initialBalance}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h3>Total Expenses</h3>
                                            <div className="badge bg-danger text-wrap fs-4" >
                                                &#8377;{totalExpense}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between my-5">
                            <h2 className='text-success '> All Transactions For This Account!</h2>
                            <Link to={`/create-transaction/${account?._id}`} type='button' className='btn' style={{ "background-color": "#475", "color": "white" }}>
                                Add New Transaction
                            </Link>
                        </div>
                        {/* <h2 className='text-success my-5'> All Transactions For This Account!</h2> */}
                        <AllTransaction alltransactions={account?.transactions} account={account} />
                    </>}
            </>
        </div>
    )
}

export default AccountDetails