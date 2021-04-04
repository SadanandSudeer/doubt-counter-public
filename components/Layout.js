import Nav from './Nav'
import Header from './Header'
import styles from "../styles/Layout.module.css";
const Layout = ({children}) => {
    return (
    <>
        <Header/>
        <Nav/>
        <div id="layoutContent" className={styles.container}>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    </>
    );  //end of return
}

export default Layout;