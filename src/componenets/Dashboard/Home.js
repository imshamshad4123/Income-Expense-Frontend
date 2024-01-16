import React from 'react'
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div   className=" dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
        <button   className=" btn btn-outline-primary py-2 dropdown-toggle d-flex align-items-center"
          id="bd-theme"
          type="button"
          aria-expanded="false"
          data-bs-toggle="dropdown"
          aria-label="Toggle theme (auto)">
          <svg   className=" bi my-1 theme-icon-active" width="1em" height="1em"><use href="#circle-half"></use></svg>
          <span   className=" visually-hidden" id="bd-theme-text">Toggle theme</span>
        </button>
        <ul   className=" dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
          <li>
            <button type="button"   className=" dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
              <svg   className=" bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#sun-fill"></use></svg>
              Light
              <svg   className=" bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
            </button>
          </li>
          <li>
            <button type="button"   className=" dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
              <svg   className=" bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#moon-stars-fill"></use></svg>
              Dark
              <svg   className=" bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
            </button>
          </li>
          <li>
            <button type="button"   className=" dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
              <svg   className=" bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#circle-half"></use></svg>
              Auto
              <svg   className=" bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
            </button>
          </li>
        </ul>
      </div>


      <main>
        <div   className=" container py-4">
          <header   className=" pb-3 mb-4 border-bottom">
            <h2   className=" d-flex align-item-center justify-content-center text-body-emphasis text-decoration-none">
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32"   className=" me-2" viewBox="0 0 118 94" role="img"><title>Bootstrap</title><path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path></svg> */}
              Income Expense Tracker App
            </h2  >
          </header>

          <div   className=" p-5 mb-4 bg-body-tertiary rounded-3">
            <div   className=" container-fluid py-5">
              <h1   className=" display-5 fw-bold">Manage Your Income And Expenses</h1>
              <p   className=" col-md-8 fs-4"> Manage your money more effectively and make better financial
              decisions with this easy-to-use software.</p>
              <p   className=" display-7 fw-bold">NOTE: The server for the backend is slow because it uses free plan so have some patience while loading 😃.</p>
              <Link  to="/Register"  className=" btn btn-outline-primary" type="button">Sign Up</Link>
            </div>
          </div>
<div className="container d-flex align-item-center justify-content-center"><h1>Steps to use Income And Expense Tracker.</h1></div>
          <div   className=" row align-items-md-stretch">
            <div   className=" col-md-6">
              <div   className=" h-100 p-5 text-bg-dark rounded-3">
                <h2>1.Create Account</h2>
                <p>First Create Account Fill the forms and You Are One step Away from creating Your First Transaction!!!🙂.</p>
                <Link  to="/Login"  className=" btn btn-outline-success" type="button">Sign In</Link>
              </div>
            </div>
            <div   className=" col-md-6">
              <div   className=" h-100 p-5 bg-body-tertiary border rounded-3">
                <h2>2.Create Transaction</h2>
                <p>Create Your First Transaction By filling the form and Handsomely Manage Your Capital</p>
                <Link  to="/Login"  className=" btn btn-outline-success" type="button">Sign In</Link>
              </div>
            </div>
          </div>

          <footer   className=" pt-3 mt-4 text-body-secondary border-top">
            &copy; letscode Academy 2024
          </footer>
        </div>
      </main>
    </div>


  );
}

export default Home
