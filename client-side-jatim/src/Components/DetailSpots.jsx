import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './css/Custom.css';

function DetailSpots(props) {

    let dateNow = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

    const [spots, setSpots] = useState([]);
    const [date, setDate] = useState(dateNow);
    const navigate = useNavigate();

    const id = useParams().id;
    let dateTest = '2023-02-03';


    const getSpots = async () => {
        await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/v1/spots/${id}?token=${props.userIdentifier.login_tokens}&date=${date}`,
        }).then(response => {
            if (response.data.vaccination_count > 0) {
                setSpots(response.data[0])
            } else {
                setSpots([]);
            }

        }).catch(error => {
            console.log(error.response)
        })
    }

    const registerVaccine = async (e) => {
        e.preventDefault();

        let bodyFormData = new FormData();

        bodyFormData.append('date',date);
        bodyFormData.append('spots_id',spots.spot.id);


        await axios({
            url: `http://127.0.0.1:8000/api/v1/vaccinations?token=${props.userIdentifier.login_tokens}`,
            method: 'post',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
            // console.log(response.data)
            navigate('/home');
        }).catch(error => console.log(error))


    }

    function detailSpot(check) {
        const arr = [];
        if (check == undefined) {
            arr.push('');
            arr.push('Tidak ada jadwal')
            arr.push('pilih tanggal lain')
        }

        for (let key in check) {
            if (check.hasOwnProperty(key)) {
                arr.push(check[key]);
            }
        }

        return arr;
    }


    useEffect(() => {
        getSpots()
    }, [props, date]);

    return (
        <>
            <main>
                {/* S: Header */}
                <header className="jumbotron">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="display-4">
                                {
                                    detailSpot(spots.spot)[1]

                                }
                            </h1>
                            <span className="text-muted"> {
                                detailSpot(spots.spot)[2]

                            }</span>
                        </div>
                        {
                            spots.length == 0 ? (
                                ''
                            ) : (
                                <form onSubmit={registerVaccine}>
                                    <button href className="btn btn-primary">Register vaccination</button>
                                </form>
                            )
                        }
                    </div>
                </header>
                {/* E: Header */}
                <div className="container">
                    <Link to="/vaccinationspots" className="btn btn-danger shadow-sm rounded mb-5 mt-2">Back</Link>
                    <div className="row mb-3">
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <label htmlFor="vaccination-date">Select vaccination date</label>
                                <input type="date" className="form-control" id="vaccination-date" defaultValue={date} onChange={val => setDate(val.target.value)} />
                            </div>
                        </div>
                    </div>
                    {
                        spots.length == 0 ? (
                            <div className="text-center">Tidak tersedia di tanggal {date}</div>
                        ) : (

                            <div className="row mb-5">
                                {/* S: Session 1 */}
                                <div className="col-md-4">
                                    <div className="card card-default">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h4>Session 1</h4>
                                                <span className="text-muted">09:00 - 11:00</span>
                                            </div>
                                            <div>
                                                <div className="row">
                                                    <div className="col-4 mb-4">
                                                        <div className="slot bg-primary text-white"> #1 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #2 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #3 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #4 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #5 </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* E: Session 1 */}
                                {/* S: Session 2 */}
                                <div className="col-md-4">
                                    <div className="card card-default">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h4>Session 2</h4>
                                                <span className="text-muted">13:00 - 15:00</span>
                                            </div>
                                            <div>
                                                <div className="row">
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #6 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #7 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #8 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #9 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #10 </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* E: Session 2 */}
                                {/* S: Session 3 */}
                                <div className="col-md-4">
                                    <div className="card card-default">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h4>Session 3</h4>
                                                <span className="text-muted">15:00 - 17:00</span>
                                            </div>
                                            <div>
                                                <div className="row">
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #11 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #12 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #13 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #14 </div>
                                                    </div>
                                                    <div className="col-4 mb-4">
                                                        <div className="slot"> #15 </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* E: Session 3 */}
                            </div>

                        )
                    }

                </div>
            </main>



        </>
    );
}

export default DetailSpots;