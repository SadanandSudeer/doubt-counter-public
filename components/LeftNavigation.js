import { useState } from "react";
import LeftNavBlock from './LeftNavBlock';
import leftNavStyles from '../styles/LeftNav.module.css';

import navStyles from "../styles/Nav.module.css";
const LeftNavigation = ({data, onSelect}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [openBlock, setOpenBlock] = useState("");
    function toggleMenuBlock(name, e){
        if (name === openBlock){
            name = "";
        }
        setOpenBlock(name);
    }

    /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
    function openNav(e) {
        setMenuOpen(true);
        document.getElementById("mySidebar").style.width = "280px";
        //document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("__next").style.marginLeft = "280px";
    }
  
    function closeNav(e) {
        setMenuOpen(false);
        setOpenBlock("");
        document.getElementById("mySidebar").style.width = "48.1818px";
        document.getElementById("__next").style.marginLeft = "48.1818px";
    }

    const renderLeftNave = (data, onSelect, prop) => {
        if (data && data[prop] && data[prop].length > 0){
            return (<div><LeftNavBlock id={prop} label={prop} subject={data.Name} isOpen={prop === openBlock} items={data[prop]} onClick={toggleMenuBlock} onSelect={onSelect}/></div>);
        }
        else{
            return (<></>);
        }
    };

    /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
    return (
        <>
            <div id="mySidebar" className={leftNavStyles.sidebar}>
                <button className={leftNavStyles.openbtn} onClick={openNav}>&#9776; <div style={{display : isMenuOpen?"contents":"none"}}>Open Sidebar</div></button>
                <a className={leftNavStyles.closebtn} onClick={closeNav}  style={{display : isMenuOpen?"block":"none"}}>&times;</a>

                {renderLeftNave(data, onSelect, "Chapters")}
                {renderLeftNave(data, onSelect, "Concepts")}
                {renderLeftNave(data, onSelect, "Topics")}
                {renderLeftNave(data, onSelect, "Exams")}
                {renderLeftNave(data, onSelect, "PriorExams")}
            </div>
        </>
    );

}
export default LeftNavigation;