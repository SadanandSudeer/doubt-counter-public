import { useState, useEffect } from "react";

import Link from 'next/link'
import navStyles from "../styles/Nav.module.css";

const Nav = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
 
    }, [subjects])

    return (
        <div id="navBar" className={navStyles.nav}>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/subject/Physics">Physics</Link>
                </li>
                <li>
                    <Link href="/subject/Maths">Maths</Link>
                </li>
                <li>
                    <Link href="/subject/Chemistry">Chemistry</Link>
                </li>
                <li>
                    <Link href="/subject/biology">Biology</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
            </ul>
        </div>
    );
}

export default Nav;