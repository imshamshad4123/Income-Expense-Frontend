import axios from 'axios';
import React, { createContext, useReducer } from 'react'
import { ACCOUNT_CREATION_FAIL, ACCOUNT_CREATION_SUCCESS, ACCOUNT_DELETE_FAIL, ACCOUNT_DELETE_SUCCESS, ACCOUNT_DETAILS_FAIL, ACCOUNT_DETAILS_SUCCESS, ACCOUNT_UPDATE_FAIL, ACCOUNT_UPDATE_SUCCESS } from './AccountActionTypes';
// import { config } from '@fortawesome/fontawesome-svg-core';

export const accountContext=createContext();

const INITIAL_STATE={
    userAuth:JSON.parse(localStorage.getItem("userAuth")),
    account:null,
    accounts:[],
    loading:false,
    error:null
}

const reducer=(state,action)=>{
    const {type,payload}=action

    switch (type){
        case ACCOUNT_DETAILS_SUCCESS:
            return{
                ...state,
                account:payload,
                loading:false,
                error:null,
            }

        case ACCOUNT_DETAILS_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
            };

        //account creation 
        case ACCOUNT_CREATION_SUCCESS:
            return{
                ...state,
                account:payload,
                loading:false,
                error:null,
            }

        case ACCOUNT_CREATION_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
            };
        case ACCOUNT_UPDATE_SUCCESS:
            return{
                ...state,
                account:payload,
                loading:false,
                error:null,
            }

        case ACCOUNT_UPDATE_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
            };
        case ACCOUNT_DELETE_SUCCESS:
            return{
                ...state,
                account:payload,
                loading:false,
                error:null,
            }

        case ACCOUNT_DELETE_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
            };
    

        
        default:
            return state

    }
}
const AccountContextProvider = ({children}) => {
    const [state,dispatch]=useReducer(reducer,INITIAL_STATE)
    const getAccountDetails=async(id)=>{
        const config={
            header:{
                "content-type":"application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response=await axios.get(`https://income-expense-backend.onrender.com/api/v1/account/${id}`,config)
            console.log("acc det",response)
            console.log("res",response?.data?.data,)
            if (response?.data?.status==="success"){
                dispatch({
                    type: ACCOUNT_DETAILS_SUCCESS,
                    payload: response?.data?.data,
                })
                
            }

        } catch (error) {
            dispatch({
                type:ACCOUNT_DETAILS_FAIL,
                payload:error?.data?.response?.message,
            })
        }
    }

    //action for account creation
    const createAccountAction=async(formData)=>{
        console.log("token iside action",state?.userAuth?.token)
        const config={
            headers:{
                "content-type":"application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response=await axios.post(`https://income-expense-backend.onrender.com/api/v1/account/`,formData,config)
            console.log("acc created",response)
            console.log("res",response?.data?.data,)
            if (response?.data?.status==="success"){
                dispatch({
                    type: ACCOUNT_CREATION_SUCCESS,
                    payload: response?.data?.data,
                })
                
            }
            window.location.href="/dashboard"

        } catch (error) {
            dispatch({
                type:ACCOUNT_CREATION_FAIL,
                payload:error?.data?.response?.message,
            })
        }
    }

    const updateAccountAction=async(formData)=>{
        console.log("formadat=======",formData)
        console.log("token iside token============",state?.userAuth?.token)
        const config={
            headers:{
                "content-type":"application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response=await axios.put(`https://income-expense-backend.onrender.com/api/v1/account/${formData._id}`,formData,config)
            console.log("acc created",response)
            console.log("res",response?.data?.data,)
            if (response?.data?.status==="success"){
                dispatch({
                    type: ACCOUNT_UPDATE_SUCCESS,
                    payload: response?.data?.data,
                })
                
            }
            window.location.href="/dashboard"

        } catch (error) {
            dispatch({
                type:ACCOUNT_UPDATE_FAIL,
                payload:error?.data?.response?.message,
            })
        }
    }
    //delete account
    const deleteAccountAction=async(id)=>{
        console.log("token iside token============",state?.userAuth?.token)
        const config={
            headers:{
                "content-type":"application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        try {
            const response=await axios.delete(`https://income-expense-backend.onrender.com/api/v1/account/${id}`,config)
            console.log("acc created",response)
            console.log("res",response?.data?.data,)
            if (response?.data?.status==="success"){
                dispatch({
                    type: ACCOUNT_DELETE_SUCCESS,
                    payload: response?.data?.data,
                })
                
            }
            window.location.href="/dashboard"

        } catch (error) {
            dispatch({
                type:ACCOUNT_DELETE_FAIL,
                payload:error?.data?.response?.message,
            })
        }
    }
    
    return (
        <accountContext.Provider value={{
            getAccountDetails,
            account: state?.account,
            createAccountAction,
            accounts:state?.accounts,
            updateAccountAction,
            deleteAccountAction,
        }}>
        {children}  
        </accountContext.Provider>
    )
}

export default AccountContextProvider