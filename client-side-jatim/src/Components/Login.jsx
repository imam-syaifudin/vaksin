import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Login() {
    const [IdCard, setIdCard] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState('');
    // const navigate = useNavigate();

    const submitLogin = async (e) => {
        e.preventDefault();


        let bodyFormData = new FormData();
        bodyFormData.append("id_card_number", IdCard);
        bodyFormData.append("password", password);

        try {
            let loginResponse = await axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/v1/auth/login",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });

            let token = await loginResponse.data.token;
            localStorage.setItem('token', token);

            window.location.href = '/home';

        } catch (error) {
            setValidation(error.response.data);
        }
    };

    return (
        <>
            <div className="container">
                <div className="row text-center mt-3">
                    <div className="col-lg-12">
                        <h1 className='text-dark fw-bold fst-italic'><i className="fa-solid fa-hospital"></i> Vaccination <span style={{ color: '#f15a2b' }}>Login <i className="fa-solid fa-hospital"></i></span></h1>
                    </div>
                </div>
                <div className="row justify-content-center text-center" style={{ marginTop: "40px" }}>
                    <div className='col-lg-6'>
                        <img className="mb-4 rounded shadow" src="https://static.vecteezy.com/system/resources/previews/004/492/131/original/corona-virus-logo-template-logotype-design-free-vector.jpg" alt="" width={400} height={400}
                            style={{ border: "3px solid white" }}
                        />
                    </div>
                    <div className="col-lg-6" style={{ marginTop: "50px" }}>
                        {validation.message ? (
                            <div className="alert alert-danger shadow-sm" role="alert">
                                <i className="fa-solid fa-triangle-exclamation"></i>  {validation.message}
                            </div>
                        ) : (
                            <div className="alert alert-success  shadow-sm" role="alert">
                                <i className="fa-solid fa-circle-exclamation"></i> ISI DATA DENGAN VALID
                            </div>
                        )}

                        <form onSubmit={submitLogin}>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" style={{ border: "1px solid #f15a2b" }} id="floatingInput" placeholder="ID CARD NUMBER" onChange={val => setIdCard(val.target.value)} />
                                <label htmlFor="floatingInput"><i className="fa-regular fa-credit-card" style={{ color: '#f15a2b' }}></i> ID Card Number</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" style={{ border: "1px solid #f15a2b" }}
                                    id="floatingPassword" placeholder="PASSWORD" onChange={val => setPassword(val.target.value)} />
                                <label htmlFor="floatingPassword"><i className="fa-solid fa-key" style={{ color: '#f15a2b' }}></i> Password</label>
                            </div>
                            <button className="w-100 btn btn-lg text-light mt-1" style={{ backgroundColor: '#f15a2b' }} type="submit"><i className="fa-solid fa-right-to-bracket"></i> Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;