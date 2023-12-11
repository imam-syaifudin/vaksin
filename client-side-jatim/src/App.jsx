import './App.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import AddConsultations from './Components/AddConsultations';
import Error from './Components/Error';
import Auth from './Auth/Auth';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VaccinationSpots from './Components/VaccinationSpots';
import DetailSpots from './Components/DetailSpots';

function App() {

  const [name, setName] = useState('');
  let token = localStorage.getItem('token');


  const getUser = async () => {

    if (token) {
      await axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/getuser?token=${token}`,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        setName(response.data[0]);
      })
    } else {
      setName('');
    }

  }


  const logoutHandler = async () => {

    localStorage.removeItem('token');
    await axios({
      method: 'post',
      url: `http://127.0.0.1:8000/api/v1/auth/logout?token=${token}`
    }).then(response => {
      console.log(response);
    })
    window.location.href = '/login';


  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* NavBar */}
        <header className="p-3 border-bottom shadow-sm fixed-top" style={{ backgroundColor: "white" }}>
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none mx-5">
                <i className="fa-solid fa-virus text-danger fs-1 mx-3"></i>
                <h3 className='mt-2'>Vacci<span style={{ color: '#f15a2b' }}>nation</span></h3>
              </a>
              <ul className="nav col-12 col-lg-auto ms-auto mb-2 mb-md-0">
                {
                  name !== '' ? (
                    <a href="" className='nav-link mx-2 btn bg-dark text-light'>{name.name}</a>
                  ) : (
                    ''
                  )
                }
                {
                  localStorage.getItem('token') ?
                    (
                      <button className="btn bg-light nav-link px-2 link-dark shadow-sm" onClick={logoutHandler}>LOGOUT</button>

                    ) : (
                      <Link to="/login" className="nav-link px-2 link-dark bg-light btn bg-light shadow-sm">LOGIN</Link>
                    )
                }
              </ul>

            </div>
          </div>
        </header>
        {/* End Navbar  */}

        <div className="div" style={{ marginTop: '100px' }}>

          <Routes>
            <Route path='/login' element={
              <Auth>
                <Login />
              </Auth>
            } />

            <Route path='/home' element={
              <Auth>
                <Dashboard userIdentifier={name} />
              </Auth>
            } />

            <Route path='/addconsultations' element={
              <Auth>
                <AddConsultations userIdentifier={name} />
              </Auth>
            } />


            <Route path='/vaccinationspots' element={
              <Auth>
                <VaccinationSpots userIdentifier={name} />
              </Auth>
            } />

            <Route path='/detailspots/:id' element={
              <Auth>
                <DetailSpots userIdentifier={name} />
              </Auth>
            } />

            <Route
              path="*"
              element={
                <Error />
              }
            />
          </Routes>



        </div>

        {/* Footer  */}
        <footer>
          <div className="container">
            <div className="text-center py-4 text-muted">
              Copyright &copy; 2023 - Web Tech ID
            </div>
          </div>
        </footer>
        {/* End Footer */}

      </BrowserRouter>
    </>
  );
}

export default App;
