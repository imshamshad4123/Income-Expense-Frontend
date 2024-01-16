if (account.transactions.length > 0) {
    getAccountDetails(account?._id)
    console.log("acctransaction",account?.transaction)
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
    accumulator+=totalIncome-totalExpense
}