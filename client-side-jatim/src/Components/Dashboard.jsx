import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard(props) {
    const [consultations, setConsultations] = useState([]);
    const [vaccination, setVaccination] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUserConsultations = async () => {
        setLoading(false);
        await axios
            .get(`http://127.0.0.1:8000/api/v1/consultations?token=${props.userIdentifier.login_tokens}`)
            .then((response) => {
                setConsultations(response.data.consultations);
                setLoading(true)
            })
            .catch((response) => {
                console.log(response);
                setLoading(true)
            });
    }

    const getUserVaccination = async () => {
        await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/v1/vaccinations?token=${props.userIdentifier.login_tokens}`,
        })
            .then(response => {
                setVaccination(response.data[0])
            })
            .catch(error => console.log(error))


    }


    useEffect(() => {
        getUserConsultations();
        getUserVaccination();
    }, [props])



    return (
        <>
            
            <main>
                {/* S: Header */}
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Dashboard</h1>
                    </div>
                </header>
                {/* E: Header */}
                <div className="container mt-5">
                    {/* S: Consultation Section */}
                    <section className="consultation-section mb-5">
                        <div className="section-header mb-3">
                            <h4 className="section-title text-muted">My Consultation</h4>
                        </div>
                        <div className="row">
                            {/* S: Link to Request Consultation */}
                            <div className="col-md-4">
                                <div className="card card-default shadow-sm">
                                    <div className="card-header">
                                        <h5 className="mb-0">Consultation</h5>
                                    </div>
                                    <div className="card-body">
                                        <Link to='/addconsultations' className='text-decoration-none text-danger'>+ Request Consultations</Link>
                                    </div>
                                </div>
                            </div>


                            {
                                loading ? (
                                    consultations.map((consul, index) => {
                                        return (
                                            <div className="col-md-4">
                                                <div className="card card-default shadow-sm">
                                                    <div className="card-header border-0">
                                                        <h5 className="mb-0">Consultation {index + 1}</h5>
                                                    </div>
                                                    <div className="card-body p-3">
                                                        <table className="table table-striped mb-0">
                                                            <tr>
                                                                <th>Status : </th>
                                                                <td className="text-success"><span class="badge text-bg-primary shadow-sm">{consul.status}</span></td>
                                                            </tr>
                                                            <tr>
                                                                <th>Disease History : </th>
                                                                <td className="text-muted">{consul.disease_history}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Current Symptoms : </th>
                                                                <td className="text-muted">{consul.current_symptoms}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Doctor Name : </th>
                                                                <td className="text-muted">{consul.doctor}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Doctor Notes : </th>
                                                                <td className="text-muted">{consul.doctor_notes}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    'Loading...'
                                )
                            }


                        </div>
                    </section>
                    {/* E: Consultation Section */}
                    {/* S: List Vaccination Section */}
                    <section className="consultation-section mb-5">
                        <div className="section-header mb-3">
                            <h4 className="section-title text-muted">My Vaccinations</h4>
                        </div>
                        <div className="section-body">
                            <div className="row mb-4">
                                {/* S: First Vaccination info */}
                                <div className="col-md-12">
                                    <div className="alert alert-warning shadow-sm">
                                        Your consultation must be approved by doctor to get the vaccine.
                                    </div>
                                </div>
                                {/* E: First Vaccination info */}
                                {/* S: Link to Register First Vaccination */}

                                {
                                    consultations.map((val, index) => {
                                        {
                                            return val.status == 'accepted' ? (
                                                <div className="col-md-4">
                                                    <div className="card card-default">
                                                        <div className="card-header border-0">
                                                            <h5 className="mb-0">{vaccination.length < 1 ? 'First' : 'Second' } Vaccination</h5>
                                                        </div>
                                                        <div className="card-body">
                                                            <Link to='/vaccinationspots' className='text-decoration-none text-danger'>+ Request Vaccination</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                ''
                                            )
                                        }
                                    })
                                }

                                {/* {console.log(vaccination[0]['First'])} */}
                                {/* First Vaccination Place  */}
                                {
                                    vaccination.map((value, index) => {
                                        {
                                            // 
                                            // console.log(value.vaccinator.name)
                                            return (
                                                <div className="col-md-4">
                                                    <div className="card card-default">
                                                        <div className="card-header border-0">
                                                            <h5 className="mb-0">{ index == 0 ? 'First' : 'Second' } Vaccination</h5>
                                                        </div>
                                                        <div className="card-body p-0">
                                                            <table className="table table-striped mb-0">
                                                                <tbody><tr>
                                                                    <th>Status</th>
                                                                    <td className="text-muted"><span className="badge text-bg-primary">{value.status}</span></td>
                                                                </tr>
                                                                    <tr>
                                                                        <th>Date</th>
                                                                        <td className="text-muted">{ value[index == 0 ? 'First' : 'Second'].vaccination_date }</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Spot</th>
                                                                        <td className="text-muted">{ value[index == 0 ? 'First' : 'Second'].spot.name }</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Vaccine</th>
                                                                        <td className="text-muted">{ value.vaccines.name }</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Vaccinator</th>
                                                                        <td className="text-muted">{ value.vaccinator.name }</td>
                                                                    </tr>
                                                                </tbody></table>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }


                            </div>

                            <div className="row">
                                {/* S: Link to Register Second Vaccination */}
                                {/* <div className="col-md-4">
                                    <div className="card card-default">
                                        <div className="card-header border-0">
                                            <h5 className="mb-0">Second Vaccination</h5>
                                        </div>
                                        <div className="card-body">
                                            <a >+ Register vaccination</a>
                                        </div>
                                    </div>
                                </div> */}


                                {/* Second Vaccination Place  */}

                            </div>
                        </div>
                    </section>
                    {/* E: List Vaccination Section */}
                </div>
            </main>



        </>
    );
}

export default Dashboard;