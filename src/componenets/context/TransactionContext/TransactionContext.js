import axios from 'axios'
import React, { createContext, useReducer } from 'react'
import { TRANSACTION_CREATION_FAIL, TRANSACTION_CREATION_SUCCESS, TRANSACTION_DELETE_FAIL, TRANSACTION_DELETE_SUCCESS, TRANSACTION_FETCH_FAIL, TRANSACTION_FETCH_SUCCESS, TRANSACTION_UPDATE_FAIL, TRANSACTION_UPDATE_SUCCESS } from './TransactionContextAction'

export const transactionContext = createContext()
const INITIAL_STATE = {
    transaction: null,
    transactions: [],
    loading: false,
    error: null,
    userAuth: JSON.parse(localStorage.getItem("userAuth")),

}

//reducer function
const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case TRANSACTION_CREATION_SUCCESS:
            return {
                ...state,
                transaction: payload,
                loading: false,
            }
        case TRANSACTION_CREATION_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
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
                transaction: payload,
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
                transaction: null,
            }
        case TRANSACTION_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        default:
            return state

    }

}

const TransactionContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const createTransactionAction = async (formData) => {
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response = await axios.post("https://income-expense-backend.onrender.com/api/v1/transactions/", formData, config)
            console.log("transaction response", response)
            if (response?.data?.status === "success") {
                dispatch({
                    type: TRANSACTION_CREATION_SUCCESS,
                    payload: response?.data
                })
            }
            window.location.href = "/dashboard"
        } catch (error) {
            dispatch({
                type: TRANSACTION_CREATION_FAIL,
                payload: error?.response?.data?.message,
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
                dispatch({
                    type: TRANSACTION_UPDATE_SUCCESS,
                    payload: response?.data
                })
            }
            // Redirect to the previous URL
            window.location.href = "/dashboard"

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
            console.log("transaction response", response)
            if (response?.data?.status === "success") {
                dispatch({
                    type: TRANSACTION_DELETE_SUCCESS,
                    payload: response?.data
                })
            }
            window.location.href = "/dashboard"
        } catch (error) {
            dispatch({
                type: TRANSACTION_DELETE_FAIL,
                payload: error?.response?.data?.message,
            })
        }
    }
    return (
        <transactionContext.Provider value={{
            createTransactionAction,
            updateTransactionAction,
            deleteTransactionAction,
            transaction: state.transaction,
            transactions: state.transactions,
            token: state?.userAuth?.token,
            getTransactionById,
        }}>
            {children}
        </transactionContext.Provider>
    )
}

export default TransactionContextProvider