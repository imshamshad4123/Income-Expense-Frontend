import axios from 'axios'
import React, { createContext, useReducer } from 'react'
import { TRANSACTION_CREATION_FAIL, TRANSACTION_CREATION_SUCCESS, TRANSACTION_DELETE_FAIL, TRANSACTION_DELETE_SUCCESS, TRANSACTION_FETCH_FAIL, TRANSACTION_FETCH_SUCCESS, TRANSACTION_UPDATE_FAIL, TRANSACTION_UPDATE_SUCCESS } from './TransactionContextAction'

export const transactionContext = createContext()


//reducer function
const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case TRANSACTION_CREATION_SUCCESS:
            return {
                ...state,
                transaction: payload.myres,
                transactions:payload.newTransactions,
                loading: false,
            }
        case TRANSACTION_CREATION_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case "ACCOUNT_DETAILS_SUCCESS":
        return {
            ...state,
            transactions: payload?.transactions,
            account:payload,
            loading: false,
            error: null,
        }

        case "ACCOUNT_DETAILS_FAIL":
            return {
                ...state,
                transactions: null,
                loading: false,
                error: payload,
            };
        //getsingletransaction dispatch
        case TRANSACTION_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                transaction: payload,
            }
        case TRANSACTION_FETCH_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case TRANSACTION_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                transaction: payload.myres,
                transactions:payload.newTransactions,
            }
        case TRANSACTION_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case TRANSACTION_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                transaction: payload.myres,
                transactions:payload.newTransactions
            }
        case TRANSACTION_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case "SET_TOKEN_SUCCESS":
            return {
                ...state,
                userAuth: payload,
                loading: false,
                error: null,
            }

        case "SET_TOKEN_FAIL":
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state

    }

}
const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    transaction: null,
    transactions: [],
    account:null,
    loading: false,
    error: null,
    

}
const TransactionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

   // since initiastate is not working tried this
    const setTokenFromLocalStorageToUserAuth=async()=>{
        console.log("setting token")
        try {
            const newuser = JSON.parse(localStorage.getItem("userAuth"));
            console.log("set_token user",newuser)

            if (newuser) {  // <-- Check if it's not null
                console.log("newuser", newuser);
                dispatch({
                    type: "SET_TOKEN_SUCCESS",
                    payload: newuser,
                });
                return "success";
            } else {
                console.error("userAuth is null in localStorage");
            }
        } catch (error) {
            dispatch({
                type: "SET_TOKEN_FAIL",
                payload: "set_token_failed",
            });
        }
       
    }

    const createTransactionAction = async (formData) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            console.log("transaction state = ",state)
            const response = await axios.post("https://income-expense-backend.onrender.com/api/v1/transactions/", formData, config)
            // const response = await axios.post("http://localhost:5001/api/v1/transactions/", formData, config)
            console.log("transaction response", response)
            if (response?.data?.status === "success") {
                
                
                    const myres=response?.data?.data
                    const newTransactions=state?.transactions.concat(myres)
                    dispatch({
                        type: TRANSACTION_CREATION_SUCCESS,
                        payload: {
                            myres,
                            newTransactions,
                        },
                    })
    
                return response?.data?.status
            }
        } catch (error) {
            dispatch({
                type: TRANSACTION_CREATION_FAIL,
                payload: error?.response?.data?.message,
            })
        }
    }

    //get single account all transaction
    const getAccountDetails = async (id) => {
        console.log("token iside singleaccounwithid===taction", state?.userAuth?.token)

        const config = {
            header: {
                "content-type": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response = await axios.get(`https://income-expense-backend.onrender.com/api/v1/account/${id}`, config)
            console.log("acc det", response)
            console.log("res", response?.data?.data,)
            if (response?.data?.status === "success") {
                dispatch({
                    type: "ACCOUNT_DETAILS_SUCCESS",
                    payload: response?.data?.data,
                })

            }

        } catch (error) {
            dispatch({
                type: "ACCOUNT_DETAILS_FAIL",
                payload: error?.data?.response?.message,
            })
        }
    }
    //get a single transaction by id getTransactionById
    const getTransactionById = async (transactionID) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response = await axios.get(`https://income-expense-backend.onrender.com/api/v1/transactions/${transactionID}`, config)
            console.log("transaction response", response)
            if (response?.data?.status === "success") {
                dispatch({
                    type: TRANSACTION_FETCH_SUCCESS,
                    payload: response?.data
                })
            }
            // window.location.href="/dashboard"
        } catch (error) {
            dispatch({
                type: TRANSACTION_FETCH_FAIL,
                payload: error?.response?.data?.message,
            })
        }
    }

    //Update Transaction
    const updateTransactionAction = async (formData) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response = await axios.put(`https://income-expense-backend.onrender.com/api/v1/transactions/${formData?._id}`, formData, config)
            console.log("transaction response", response)
            if (response?.data?.status === "success") {
                let newTransactions = state?.transactions
                for (let index = 0; index < newTransactions.length; index++) {
                    const element = newTransactions[index];
                    if (element._id === formData._id) {
                        newTransactions[index].name = formData.name;
                        newTransactions[index].amount = formData.amount;
                        newTransactions[index].transactionType = formData.transactionType;
                        newTransactions[index].transactionCategroy = formData.transactionCategroy;
                        newTransactions[index].notes = formData.notes;

                        break;
                    }

                }
                console.log("newTransactions",newTransactions)
                const myres=response?.data?.data
                dispatch({
                    type: TRANSACTION_UPDATE_SUCCESS,
                    payload: {
                        myres,
                        newTransactions,
                    },
                })
               
            }
            // Redirect to the previous URL
            // window.location.href = "/dashboard"

        } catch (error) {
            dispatch({
                type: TRANSACTION_UPDATE_FAIL,
                payload: error?.response?.data?.message,
            })
        }
    }
    //
    //Delete Transaction action
    const deleteTransactionAction = async (transactionID) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response = await axios.delete(`https://income-expense-backend.onrender.com/api/v1/transactions/${transactionID}`, config)
            // const response = await axios.delete(`http://localhost:5001/api/v1/transactions/${transactionID}`, config)
            console.log("transaction response", response)
            if (response?.data?.status === "success") {
                const myres=response?.data?.data

                const newTransactions = state?.transactions.filter((tran) => { return tran._id !== transactionID })

                
                dispatch({
                    type: TRANSACTION_DELETE_SUCCESS,
                    payload: {
                        myres,
                        newTransactions,
                    },
                })
            }
                

            
        } catch (error) {
            dispatch({
                type: TRANSACTION_DELETE_FAIL,
                payload: error?.response?.data?.message,
            })
        }
    }
    return (
        <transactionContext.Provider value={{
            setTokenFromLocalStorageToUserAuth,
            createTransactionAction,
            updateTransactionAction,
            deleteTransactionAction,
            transaction: state.transaction,
            transactions: state.transactions,
            token: state?.userAuth?.token,
            getTransactionById,
            getAccountDetails,
            account:state?.account,
        }}>
            {children}
        </transactionContext.Provider>
    )
}

export default TransactionContextProvider