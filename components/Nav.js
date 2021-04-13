import { useState, useEffect } from "react";

import Link from 'next/link'
import navStyles from "../styles/Nav.module.css";

const Nav = () => {
    const [menuitem, setMenuitem] = useState("Home");
    const [clickedMenu, setClickedMenu] = useState("Home");
    useEffect(async () => {
        if (clickedMenu !== menuitem){
            setMenuitem(clickedMenu)
        }
    }, [clickedMenu]);

    const onclickNav = (menu) =>{
        if (menu != clickedMenu){
            setClickedMenu(menu);
        }
    }

    const getStyle = (menuName) =>{
        if (menuName === menuitem){
            return navStyles.selected;
        }
        else{
            return navStyles.nonSelected
        }
    }
    return (
        <div id="navBar" className={navStyles.nav}>
            <ul>
                <li>
                    <Link href="/"><div className={getStyle('Home')} onClick={() => onclickNav('Home')}>Home</div></Link>
                </li>
                <li>
                    <Link href="/subject/Physics"><div className={getStyle('Physics')} onClick={() => onclickNav('Physics')}>Physics</div></Link>
                </li>
                <li>
                    <Link href="/404"><div className={getStyle('Maths')} onClick={() => onclickNav('Maths')}>Maths</div></Link>
                </li>
                <li>
                    <Link href="/404"><div className={getStyle('Chemistry')} onClick={() => onclickNav('Chemistry')}>Chemistry</div></Link>
                </li>
                <li>
                    <Link href="/404"><div className={getStyle('Biology')} onClick={() => onclickNav('Biology')}>Biology</div></Link>
                </li>
                <li>
                    <Link href="/404"><div className={getStyle('XIIBoards')} onClick={() => onclickNav('XIIBoards')}>XII Boards</div></Link>
                </li>
                <li>
                    <Link href="/about"><div className={getStyle('About')} onClick={() => onclickNav('About')}>About Us</div></Link>
                </li>
            </ul>
        </div>
    );
}

export default Nav;