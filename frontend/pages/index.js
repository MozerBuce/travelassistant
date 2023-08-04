import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS


export default function Home() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/maputo`);

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
              <input placeholder="search for" type="search" id="searchText" name="searchText" className="form-control" required=""
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
            <div className="">
              { result && (
                <div className="row w-100">
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3`}>
                    <p>Current weather: <strong>{result.actualweather}</strong></p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3`}>
                      <p>Current weather: <strong>{result.actualweather}</strong></p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3`}>
                      a
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3`}>
                      a
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3`}>
                      a
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-4 px-2 py-1">
                    <div className={`${styles.card} p-3`}>
                      a
                    </div>
                  </div>


                </div>
              )}
            </div>
          )}




        </div>
      </div>

      {/* <footer className="container-fluid bg-secondary text-white py-3 d-flex justify-content-center align-items-center">
        <p>
          Copyright © 2023 Almerino Buce
        </p>
      </footer> */}

    </div>
  )
}
