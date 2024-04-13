import React, { useContext, useEffect, useState } from 'react'
import AccountSummary from './AccountSummary'
// import AccountDetails from './AccountDetails'
import { authContext } from '../context/AuthContext/AuthContext'
import AccountList from './AccountList'
import { accountContext } from '../context/AccountContext/AccountContext'

const AccountDashboard = (props) => {
  const { fetchUserProfileAction, profile,  userAuth,token } = useContext(authContext)
  const { getSingleuserAllAccountAction,  accounts, error ,setTokenFromLocalStorageToUserAuth} = useContext(accountContext)

  console.log("errorr========", error)
  console.log("Logged_in_token",token)


  // useEffect(() => {
   
  //   getSingleuserAllAccountAction();
  // }, [])
  useEffect(() => {
    const fetchData = async () => {
        if (token) {
          console.log("Logged_in",userAuth)
            try {
              console.log("Logged_in_token_function",token)

                await getSingleuserAllAccountAction(token);
                await setTokenFromLocalStorageToUserAuth()
            } catch (error) {
                console.error("Error fetching account data:", error);
            }
        }
    };

    fetchData();
}, []);




  console.log("accountsafteruseeffect", accounts)

  return (
    <>
      {error ? (
        <>
          <div
            className="container btn-outline-danger"
            role="alert"
          >
            <strong className="font-bold">Error!</strong> {""}
            <span className="block sm:inline ">{error}</span>
          </div>
        </>
      ) : (
        <>

          {/* this accounts has transactions init  and it is coming from getSingleuserAllAccountAction*/}
          <AccountSummary Accounts={accounts} />

          <AccountList accounts={accounts} />
          {/* this accounts has transaactions id  and is coming from fetchUserProfileAction */}
        </>
      )}
    </>
  )
}

export default AccountDashboard