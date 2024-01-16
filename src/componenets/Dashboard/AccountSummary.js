import React from 'react'
// import { Link } from 'react-router-dom'
// import { accountContext } from '../context/AccountContext/AccountContext';

const AccountSummary = ({ Accounts }) => {
    // const { account,userAuth } = useContext(accountContext)
    // const [totalBalance, setTotalBalance] = useState(0);
    
    var totalIncomeForAllAccount = 0
    var totalExpenseForAllAccount = 0
    var TotalavialableBalanceForAllAccount = 0
    console.log("accountsforaccountsummary", Accounts)
    Accounts?.map((account) => {
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
        totalIncomeForAllAccount += account?.initialBalance + totalIncome
        //calculate total expenses
        const totalExpense = account?.transactions?.reduce((acc, transaction) => {
            if (transaction?.transactionType === "Expenses") {
                return acc + transaction?.amount
            } else {
                return acc;
            }
        }, 0)
        totalExpenseForAllAccount += totalExpense

        TotalavialableBalanceForAllAccount += account?.initialBalance + totalIncome - totalExpense

        return true
    })
   
    console.log("total expenses",totalExpenseForAllAccount)
    return (
        <div >
            <div className="container card  shadow-lg p-3 mb-2 bg-body-tertiary rounded text-center my-3">
                <h1>Your Total Income And Expenses</h1>
            </div>
            <div className=" row    mx-2">
                <div className="col-sm-12 col-md-4 mb-3">
                    <div className="card shadow-lg p-3 mb-2 bg-body-tertiary rounded">
                        <div className="card-body d-flex justify-content-between">
                            <h3>Total Income <span className='mx-5'>-</span></h3>
                            <button type='button' className='btn btn-success'>
                                &#8377;{totalIncomeForAllAccount}
                            </button>

                        </div>
                        <p className="card-text">Your Total Income for all your Accounts.</p>
                        {/* <Link to="#" className="btn btn-success">Go somewhere</Link> */}
                    </div>

                </div>
                <div className="col-sm-12 col-md-4 mb-3">
                    <div className="card shadow-lg p-3 mb-2 bg-body-tertiary rounded">
                        <div className="card-body d-flex justify-content-between">
                            <h3>Total Expenses <span className='mx-5'>-</span></h3>
                            <button type='button' className='btn btn-danger'>
                                &#8377;{totalExpenseForAllAccount}
                            </button>

                        </div>
                        <p className="card-text">Your total Expenses for All your Accounts.</p>
                        {/* <Link to="#" className="btn btn-success">Go somewhere</Link> */}
                    </div>

                </div>
                <div className="col-sm-12 col-md-4 mb-3">
                    <div className="card shadow-lg p-3 mb-2 bg-body-tertiary rounded">
                        <div className="card-body d-flex justify-content-between">
                            <h3>Total Available Balance       <span className='mx-5'>-</span>  </h3>
                            <button type='button' className='btn btn-primary'>
                                &#8377;{TotalavialableBalanceForAllAccount}
                            </button>

                        </div>
                        <p className="card-text">Your Total Available Balances for all Accounts!.</p>
                        {/* <Link to="#" className="btn btn-success">Go somewhere</Link> */}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AccountSummary