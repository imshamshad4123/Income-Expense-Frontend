import axios from 'axios';
import React, { createContext, useReducer } from 'react'
import { ACCOUNT_CREATION_FAIL, ACCOUNT_CREATION_SUCCESS, ACCOUNT_DELETE_FAIL, ACCOUNT_DELETE_SUCCESS, ACCOUNT_DETAILS_FAIL, ACCOUNT_DETAILS_SUCCESS, ACCOUNT_UPDATE_FAIL, ACCOUNT_UPDATE_SUCCESS, SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_FAIL, SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_SUCCESS } from './AccountActionTypes';
// import { config } from '@fortawesome/fontawesome-svg-core';

export const accountContext = createContext();

const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    account: null,
    accounts: [],
    loading: false,
    error: null
}

const reducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case ACCOUNT_DETAILS_SUCCESS:
            return {
                ...state,
                account: payload,
                loading: false,
                error: null,
            }

        case ACCOUNT_DETAILS_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
            };
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
        //account creation 
        case ACCOUNT_CREATION_SUCCESS:
            return {
                ...state,
                account: payload.myres,
                accounts:payload.accounts,
                loading: false,
                error: null,
            }

        case ACCOUNT_CREATION_FAIL:
            return {
                ...state,
                account: null,
                accounts:state?.accounts,
                loading: false,
                error: payload,
            };
        case ACCOUNT_UPDATE_SUCCESS:
            return {
                ...state,
                account: payload.myres,
                accounts:payload.newAccounts,
                loading: false,
                error: null,
            }

        case ACCOUNT_UPDATE_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
                accounts:state?.accounts
            };
        case ACCOUNT_DELETE_SUCCESS:
            return {
                ...state,
                account: payload.myres,
                accounts:payload.newAccounts,
                loading: false,
                error: null,
            }

        case ACCOUNT_DELETE_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
            };
        case SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_SUCCESS:
            return {
                ...state,
                accounts: payload,
                loading: false,
                error: null,
            }

        case SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_FAIL:
            return {
                ...state,
                accounts: null,
                loading: false,
                error: payload,
            };


        default:
            return state

    }
}
const AccountContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

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
                    type: ACCOUNT_DETAILS_SUCCESS,
                    payload: response?.data?.data,
                })

            }

        } catch (error) {
            dispatch({
                type: ACCOUNT_DETAILS_FAIL,
                payload: error?.data?.response?.message,
            })
        }
    }
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
    //single user all accounts
    const getSingleuserAllAccountAction = async (tokenFromFunc) => {
        // console.log("token iside singleaccountaLLaction", state?.userAuth?.token)
        console.log("token iside singleaccountaLLaction", tokenFromFunc)
        const config = {
            headers: {
                "content-type": "application/json",
                // Authorization: `Bearer ${state?.userAuth?.token}`,
                Authorization: `Bearer ${tokenFromFunc}`,
            }
        }
        if (!state?.userAuth?.accounts) { // Check if data is already fetched
            // Fetch data if not cached
            try {
                const response = await axios.get(`https://income-expense-backend.onrender.com/api/v1/account/user/id/`, config);
                // const response = await axios.get(`http://localhost:5001/api/v1/account/user/all/`, config);

                if (response?.data?.status === "success") {
                    dispatch({
                        type: SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_SUCCESS,
                        payload: response?.data?.data,
                    });

                    console.log("Insideresponse", response)
                    return response?.data?.status
                }
            } catch (error) {
                dispatch({
                    type: SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_FAIL,
                    payload: error?.data?.response?.message,
                })
                return error?.data?.response?.message
            }
        } else {
            // Data is already available, navigate directly
            window.location.href = "/dashboard";
        }
    }

    //action for account creation
    const createAccountAction = async (formData) => {
        console.log("token iside action", state?.userAuth?.token)
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response = await axios.post(`https://income-expense-backend.onrender.com/api/v1/account/`, formData, config)
            // const response = await axios.post(`http://localhost:5001/api/v1/account/`, formData, config)
            console.log("acc created", response)
            console.log("res", response?.data?.data,)
            if (response?.data?.status === "success") {
                
                const myres=response?.data?.data
                const newAccounts=state?.accounts.concat(myres)
                dispatch({
                    type: ACCOUNT_CREATION_SUCCESS,
                    payload: {
                        myres,
                        newAccounts,
                    },
                })

            }
            // window.location.href = "/dashboard"
            return response?.data?.status

        } catch (error) {
            dispatch({
                type: ACCOUNT_CREATION_FAIL,
                payload: error?.data?.response?.message,
            })
        }
    }

    const updateAccountAction = async (formData) => {
        console.log("formadat=======", formData)
        console.log("token iside token============", state?.userAuth?.token)
        //api call
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response = await axios.put(`https://income-expense-backend.onrender.com/api/v1/account/${formData._id}`, formData, config)
            console.log("acc updated", response)
            console.log("res", response?.data?.data,)
            if (response?.data?.status === "success") {
                //frontend update accounts
                let newAccounts = state?.accounts
                for (let index = 0; index < newAccounts.length; index++) {
                    const element = newAccounts[index];
                    if (element._id === formData._id) {
                        newAccounts[index].name = formData.name;
                        newAccounts[index].initialBalance = formData.initialBalance;
                        newAccounts[index].notes = formData.notes;
                        newAccounts[index].accountType = formData.accountType;
                        break;
                    }

                }
                console.log("newaccounts",newAccounts)
                const myres=response?.data?.data
                dispatch({
                    type: ACCOUNT_UPDATE_SUCCESS,
                    payload: {
                        myres,
                        newAccounts,
                    },
                })

            }
            // window.location.href="/dashboard"


            return response?.data?.status
        } catch (error) {
            dispatch({
                type: ACCOUNT_UPDATE_FAIL,
                payload: error?.data?.response?.message,
            })
            return error?.data?.response?.message
        }


    }
    //delete account
    const deleteAccountAction = async (id) => {
        console.log("token iside token============", state?.userAuth?.token)
        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response = await axios.delete(`https://income-expense-backend.onrender.com/api/v1/account/${id}`, config)
            console.log("acc created", response)
            console.log("res", response?.data?.data,)
            if (response?.data?.status === "success") {
                //client side deletion of account
                const newAccounts = state?.accounts.filter((account) => { return account._id !== id })
                
                const myres=response?.data?.data

                dispatch({
                    type: ACCOUNT_DELETE_SUCCESS,
                    payload: {
                        myres,
                        newAccounts,
                    },
                })


            }
            // window.location.href = "/dashboard"

        } catch (error) {
            dispatch({
                type: ACCOUNT_DELETE_FAIL,
                payload: error?.data?.response?.message,
            })
        }
    }
    
    return (
        <accountContext.Provider value={{
            setTokenFromLocalStorageToUserAuth,
            userAuth:state,
            getAccountDetails,
            account: state?.account,
            createAccountAction,
            accounts: state?.accounts,
            updateAccountAction,
            deleteAccountAction,
            getSingleuserAllAccountAction,
            error: state?.error,
        }}>
            {children}
        </accountContext.Provider>
    )
}

export default AccountContextProvider