import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddConsultations(props) {
    const [riwayat,setRiwayat] = useState('');
    const [sekarang,setSekarang] = useState('');
    const navigate = useNavigate();

    const selectControll = (key,key2) => {
        let riwayatSelect = document.getElementById(`${key}`);
        let getTextArea = document.getElementById(`${key2}`);

        if( riwayatSelect.value === 'no' ){
            // setDisplay('none');
            getTextArea.style.display = 'none';
        } else {
            // setDisplay('block');
            getTextArea.style.display = 'block';
        }
    }

    const addPlayer = async (e) => {
        e.preventDefault();

        let bodyFormData = new FormData();
        bodyFormData.append('disease_history',riwayat);
        bodyFormData.append('current_symptoms',sekarang);

        let response = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/v1/consultations?token=${props.userIdentifier.login_tokens}`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        navigate('/home');


    }


    return (
        <>

            <main>
                {/* S: Header */}
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Request Consultation</h1>
                    </div>
                </header>
                {/* E: Header */}
                <div className="container">
                    <form onSubmit={addPlayer}>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label htmlFor="disease-history" className="mr-3 mb-0 mx-2">Do you have disease history ?</label>
                                        <select className="form-control-sm" onChange={event => selectControll('riwayatSelect','disease-history')} id="riwayatSelect">
                                            <option value="yes">Yes, I have</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <textarea id="disease-history"  className="form-control" cols={30} rows={10} placeholder="Describe your disease history"  onChange={val => setRiwayat(val.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label htmlFor="current-symptoms" className="mr-3 mb-0 mx-2">Do you have symptoms now ?</label>
                                        <select className="form-control-sm" onChange={event => selectControll('sekarang','current-symptoms')}  id="sekarang">
                                            <option value="yes">Yes, I have</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <textarea id="current-symptoms"  className="form-control" cols={30} rows={10} placeholder="Describe your current symptoms"  onChange={val => setSekarang(val.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary mx-2">Send Request</button>
                        <Link to="/home" className="btn btn-outline-danger">Back</Link>
                    </form>
                </div>
            </main>


        </>
    );
}

export default AddConsultations;