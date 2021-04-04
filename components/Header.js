import headerStyles from '../styles/Header.module.css'

const Header = () => {
    return(
        <div>
            <h1 className={headerStyles.title}>
                <span>Doubt Counter</span>
            </h1>
            <p className={headerStyles.description}>
                Stuck solving a problem. Search it here.
            </p>
        </div>
    );
}

export default Header;