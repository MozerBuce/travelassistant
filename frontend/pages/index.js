import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Home() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/${searchTerm}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setResult(data);
      setNoResults(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setNoResults(true);

    }
  };

  return (
    <div className={`${styles.container} container-fluid p-0`}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.general} container-fluid p-0`}>
        <div className="container-fluid bg-primary py-4 d-flex justify-content-center align-items-center text-white">
          <h5>Travel assistant webapp</h5>
        </div>

        <div className="container-xl py-5">
          <div className=" form-group row d-flex justiy-content-center align-items-center mb-5 ">
            <div className="col-sm-10">
              <input placeholder="search using city name" type="search" id="searchText" name="searchText" className="form-control" required=""
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
            <div className="col-sm-2 pt-2 pt-sm-0">
              <button className="btn btn-primary w-100"
                onClick={handleSearch}
              >
                <img src="/icons/search.svg" className="img-fluid" width="25" alt="" />
              </button>
            </div>
          </div>
        </div>

        <div className={`container-xl px-0 `}>

          {noResults ? (
            <div className='border border-1 rounded border-primary p-2'>
              <p className='pb-0 mb-0'>No results found</p>
            </div>
          ) : (
            <div className="container-xl p-0">
              {result && (
                <div className="row w-100">
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3 d-flex flex-column justify-content-center align-items-center`}>
                      <p className="p-0 m-0">Current</p>
                      <strong>{result.actualweather}ºC</strong>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3 d-flex flex-column justify-content-center align-items-center`}>
                      <p className="p-0 m-0">max forecast first day: <strong>{result.day_i.max}ºC</strong></p>
                      <p className="p-0 m-0">min forecast first day: <strong>{result.day_i.min}ºC</strong></p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3 d-flex flex-column justify-content-center align-items-center`}>
                      <p className="p-0 m-0">max forecast second day: <strong>{result.day_ii.max}ºC</strong></p>
                      <p className="p-0 m-0">min forecast second day: <strong>{result.day_ii.min}ºC</strong></p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3 d-flex flex-column justify-content-center align-items-center`}>
                      <p className="p-0 m-0">max forecast third day: <strong>{result.day_iii.max}ºC</strong></p>
                      <p className="p-0 m-0">min forecast third day: <strong>{result.day_iii.min}ºC</strong></p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3 d-flex flex-column justify-content-center align-items-center`}>
                      <p className="p-0 m-0">Exchange rate(EUR)</p>
                      <strong>{result.exchange_rate} ({result.currencycode})</strong>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3 d-flex flex-column justify-content-center align-items-center`}>
                      <p className="p-0 m-0">Population</p>
                      <strong>{result.population}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
