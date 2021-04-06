import Head from 'next/head'
import Nav from './Nav'
import Header from './Header'
import styles from "../styles/Layout.module.css";
import {useEffect, useState} from 'react';
const Layout = ({children}) => {
    return (
    <div className={styles.container}>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        </Head>
        <Header/>
        <Nav/>
        <div id="layoutContent">
            <div className={styles.main}>
                {children}
            </div>
        </div>
    </div>
    );  //end of return
}

export default Layout;