import Head from 'next/head';

import errorStyles from '../styles/Error.module.css';
import { useEffect } from "react";

const Custom500 = () => {
    useEffect(async () => {
        document.getElementById("__next").style.marginLeft = "5px";
      }, []);

      return (
        <>
            <Head>
                <title>Kota Doubt Counter - Coming Soon</title>
                <meta name="description" content="Doubt Counter makes learning simple by helping you get over problems you are stuck with. Prepare for JEE Main, NEET, JEE Advanced exams. Its free with no adds so you focus on studies and nothing else!" />
                <link rel="icon" href="/assets/images/KDC_Logo_3.png"></link>
            </Head>
            <div className={errorStyles.content}>
                <div className={errorStyles.grid}>
                    <h2>We are experiencing issues servicing your request</h2>
                    <h1>We have noted this error and will fixed soon</h1>
                </div>
            </div>
        </>
    );

      return 
}
export default Custom500;