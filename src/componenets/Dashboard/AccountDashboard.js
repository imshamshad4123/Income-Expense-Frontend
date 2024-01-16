import React, { useContext, useEffect } from 'react'
import AccountSummary from './AccountSummary'
// import AccountDetails from './AccountDetails'
import { authContext } from '../context/AuthContext/AuthContext'
import AccountList from './AccountList'

const AccountDashboard = (props) => {
const {fetchUserProfileAction,getSingleuserAllAccountAction,profile,error,accounts,userAuth}=useContext(authContext)
console.log("errorr========",error)

 useEffect(()=>{
  fetchUserProfileAction();
  getSingleuserAllAccountAction();
  

 },[])
//  useEffect(()=>{
  // getSingleuserAllAccountAction();

//  },[])
console.log("accountsafteruseeffect",accounts)
  return (
    <>
      {userAuth?.error ? (
        <>
          <div
            className="container btn-outline-danger"
            role="alert"
          >
            <strong className="font-bold">Error!</strong> {""}
            <span className="block sm:inline ">{userAuth?.error}</span>
          </div>
        </>
      ) : (
        <>
          <AccountSummary Accounts={accounts}/>
          <AccountList accounts={profile?.accounts} />
        </>
      )}
    </>
  )
}

export default AccountDashboard