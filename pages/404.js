import Head from 'next/head';

import { useEffect } from "react";
import errorStyles from '../styles/Error.module.css';
const Custom404 = () => {
    useEffect(async () => {
        document.getElementById("__next").style.marginLeft = "5px";
      }, []);
    
    return (
        <>
            <Head>
                <title>Kota Doubt Counter - Coming Soon</title>
                <meta name="description" content="Kota Doubt Counter makes learning simple by helping you get over problems you are stuck with. Prepare for IIT JEE Main, NEET, ITT JEE Advanced exams. Its free, with no ads so you can focus on your studies and nothing else!" />
                <link rel="icon" href="/assets/images/KDC_Logo_3.png"></link>
            </Head>
            <div className={errorStyles.content}>
                <div className={errorStyles.grid}>
                    <h2>Kota Teachers are working on this content, for you</h2>
                    <h1>We will have it here soon.</h1>
                </div>
            </div>
        </>
    );
}
export default Custom404;