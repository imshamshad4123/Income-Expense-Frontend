import React, { createContext, useReducer } from 'react'
import { FETCH_PROFILE_FAIL, FETCH_PROFILE_SUCCESS, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_FAIL, SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_SUCCESS } from './AuthActionTypes';

import axios from "axios";
import { json, useNavigate } from 'react-router-dom';
export const authContext = createContext();

const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    error: null,
    loading: false,
    profile: null,
    accounts:[],

}
const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userAuth: payload,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
                userAuth: null,
            };

        case LOGIN_SUCCESS:
            //Add user to localstorage
            localStorage.setItem("userAuth", JSON.stringify(payload));
            return {
                ...state,
                loading: false,
                error: null,
                userAuth: payload,
            };


        case LOGIN_FAILED:
            return {
                ...state,
                error: payload,
                loading: false,
                userAuth: null,
                
            };
        case LOGOUT:
            //remove from storage
            localStorage.removeItem("userAuth");
            return {
                ...state,
                loading: false,
                error: null,
                userAuth: null,
            };
        case FETCH_PROFILE_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                profile: payload,
              };
        case FETCH_PROFILE_FAIL:
            return{
                ...state,
                loading:false,
                error:payload,
                profile:null
            }

        case SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_SUCCESS:
            return{
                ...state,
                accounts:payload,
                loading:false,
                error:null,
            }

        case SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_FAIL:
            return {
                ...state,
                accounts: null,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}
const AuthContextProvider = ({ children }) => {
    var success=false;
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    const loginUserAction = async (formData) => {
        const config = {
            headers: {
                "content-type": "application/json"
            },
        }
        try {
            const response = await axios.post('https://income-expense-backend.onrender.com/api/v1/users/login', formData, config)
            console.log(response)
            //response && response.data&& response.data.status is same aas below line
            if (response?.data?.status === "success") {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data
                })
            }
            success=true
            // json=await response.json();
            // console.log(json)
            // console.log(response)
            window.location.href = "/dashboard";
            
           
        } catch (error) {
            console.log("error inside action ",error?.response?.data?.message)

            dispatch({
                type: LOGIN_FAILED,
                payload: error?.response?.data?.message,
            });

        }
    }
    const registerUserAction = async (formData) => {
        const config = {
            headers: {
                "content-type": "application/json"
            },
        }
        console.log("formdata=======>",formData)
        try {
            const response = await axios.post('https://income-expense-backend.onrender.com/api/v1/users/register', formData, config)
            console.log(response)
            //response && response.data&& response.data.status is same aas below line
            if (response?.data?.status === "success") {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: response.data
                })
            }

            window.location.href = "/login";

            console.log("register success",response)
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error?.response?.data?.message,
            });
        }
    }
    //logout user action 
    const logoutUserAction = () => {
        dispatch({
            type: LOGOUT,
            payload: null,
        });
        //Redirect
        window.location.href = "/login";
        };
    // profile user action

    const fetchUserProfileAction=async()=>{
        const config={
            headers:{
                "content-type":"application-json",
                Authorization:`Bearer ${state?.userAuth?.token}`
            }
        }
        try {
            const response=await axios.get(`https://income-expense-backend.onrender.com/api/v1/users/profile`,config)
            console.log("fetchprofile",response);
            if (response?.data) {
              dispatch({
                type: FETCH_PROFILE_SUCCESS,
                payload: response.data,
              });
            }
          } catch (error) {
            dispatch({
              type: FETCH_PROFILE_FAIL,
              payload: error?.response?.data?.message,
            });
        }
    }

    //get singleuser all accouunts with transaction populated
    const getSingleuserAllAccountAction=async()=>{
        console.log("token iside action",state?.userAuth?.token)
        const config={
            headers:{
                "content-type":"application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            }
        }
        if (!state?.userAuth?.accounts) { // Check if data is already fetched
            // Fetch data if not cached
            try {
              const response = await axios.get(`https://income-expense-backend.onrender.com/api/v1/account/user/id/`, config);
              dispatch({
                type: SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_SUCCESS,
                payload: response?.data?.data,
              });

              console.log("insideresponse",response)
            } catch (error) {
                dispatch({
                    type:SINGLE_ACCOUNT_ALL_TRANSACTION_FETCH_FAIL,
                    payload:error?.data?.response?.message,
                })
            }
          } else {
            // Data is already available, navigate directly
            window.location.href = "/dashboard";
          }
    }
    return (<authContext.Provider value={{
        loginUserAction,
        userAuth: state,
        token:state?.userAuth?.token,
        registerUserAction,
        logoutUserAction,
        fetchUserProfileAction,
        error:state?.error,
        profile: state?.profile,
        getSingleuserAllAccountAction,
        accounts:state?.accounts,
    }}>{children}</authContext.Provider>
    )
}

export default AuthContextProvider;