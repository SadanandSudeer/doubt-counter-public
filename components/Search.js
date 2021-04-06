import { useState, useEffect } from "react";
import searchStyles from "../styles/Search.module.css";

const Search = ({text, label, onChange}) => {
    const [searchText, setSearchText] = useState(text??"");
    const [shouldTrigger, setShouldTrigger] = useState(false);

    useEffect(() => {
        if (shouldTrigger){
            onChange(searchText);
            setShouldTrigger(false);
        }
    }, [shouldTrigger])


    let inputLabel = "Search"

    const onBlur = (e) => {
        setSearchText(e.currentTarget.value);
        setShouldTrigger(true);
    }

    const submitClick = () =>{
        setShouldTrigger(true);
    }

    const onKeyUp = (e) => {
        if (e.key === "Enter"){
            setSearchText(e.currentTarget.value);
            setShouldTrigger(true);
        }
    }

    return (
        <div className={searchStyles.main}>
        <div className={searchStyles.grid}>
            <div className={searchStyles.cardLabel}>
               <h3> <label htmlFor="Search">Search {label}</label></h3>
            </div>
            <div className={searchStyles.cardInput}>
                <input id="searchText" type="text" value={searchText} onChange={onBlur} onKeyUp={onKeyUp}/>
                <button onClick={submitClick}>Search</button>
            </div>
        </div>
        </div>
    );
}

export default Search;