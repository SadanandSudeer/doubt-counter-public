import headerStyles from '../styles/Header.module.css'
import Image from 'next/image';
const Header = () => {
    return(
        <>
        <div style={{top:"10px",left:"20px", position:"absolute"}}>
            <Image src="/assets/images/KDC_Logo_3.png" height="68px" width="80px"/>
        </div>
        <div>
            <h1 className={headerStyles.title}>
                <span>Kota Doubt Counter</span>
            </h1>
            <p className={headerStyles.description}>
                Need help solving a problem? Search it here.
            </p>
        </div>
        </>
    );
}

export default Header;