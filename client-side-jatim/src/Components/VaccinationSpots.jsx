import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Custom.css';

function VaccinationSpots(props) {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [vaccination,setVaccination] = useState([]);

    function checkServe(serve) {
        let arr = [];

        if (serve == 1) {
            if( vaccination.length < 1 ){
                arr.push('Only First','spot');
            } else {
                arr.push('Only First','spot unavailable');
            }
            return arr;
        } else if (serve == 2) {
            if( vaccination.length == 1 ){
                arr.push('Only Second','spot');
            } else {
                arr.push('Only Second','spot unavailable');
            }
            arr.push('Only Second','spot unavailable');
            return arr;
        } else {
            arr.push('Both','spot');
            return arr;
        }
    }

    function checkAvailable(check) {
        const arr = [];

        for (let key in check) {
            if (check.hasOwnProperty(key)) {
                if (check[key] == true) {
                    arr.push(key);
                }
            }
        }

        return arr.join(',');


    }

    function getUserSpots(){
        let regions = props.userIdentifier.regionals
        for (let key in regions) {
            if (regions.hasOwnProperty(key)) {
              return regions['district'];
            }
        }
    }


    let getSpots = async () => {
        setLoading(true);
        await axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/v1/spots?token=${props.userIdentifier.login_tokens}`
        }).then(response => {
            setSpots(response.data[0]);
            setLoading(false)
        }).catch(response => {
            console.log(response)
        })
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
        getSpots();
        getUserSpots();
        getUserVaccination();
    }, [props])


    return (
        <>
            <main>
                {/* S: Header */}
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">First Vaccination</h1>
                    </div>
                </header>
                {/* E: Header */}
                <div className="container mb-5">
                    <div className="section-header mb-4">
                        <h4 className="section-title text-muted font-weight-normal">List Vaccination Spots in { getUserSpots() }</h4>
                        <Link to="/home" className="btn btn-danger shadow-sm rounded">Back</Link>
                    </div>
                    <div className="section-body">
                        {
                            loading ? (
                                'get data spots...'
                                ) : (
                                    spots.map((val, index) => {
                                        return (
                                        <article className={checkServe(val.serve)[1]}>
                                            <div className="row">
                                                <div className="col-5">
                                                    <h5 className="text-primary">{
                                                        checkServe(val.serve)[1] == 'spot unavailable' ? (
                                                            val.name
                                                            ) : (
                                                            <Link to={`/detailspots/${val.id}`}>{val.name}</Link>
                                                        )
                                                        }
                                                    </h5>
                                                    <span className="text-muted">{val.address}</span>
                                                </div>
                                                <div className="col-4">
                                                    <h5>Available vaccines</h5>
                                                    <span className="text-muted">{checkAvailable(val.available_vaccines)}</span>
                                                </div>
                                                <div className="col-3">
                                                    <h5>Serve</h5>
                                                    <span className="text-muted">
                                                        {checkServe(val.serve)[0]} vaccination
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })
                            )
                        }

                    </div>
                </div>
            </main>

        </>
    );
}

export default VaccinationSpots;