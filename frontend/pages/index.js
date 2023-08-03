import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS


export default function Home() {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container- ">
        <div className="container-fluid bg-primary py-4 d-flex justify-content-center align-items-center text-white">
          <h5>Travel assistant webapp</h5>
        </div>

        <div className="container-xl py-5">



        </div>

      </div>

      <footer className="container-fluid bg-secondary text-white py-3 d-flex justify-content-center align-items-center">
        <p>
          Copyright © 2023 Almerino Buce
        </p>
      </footer>

    </div>
  )
}
