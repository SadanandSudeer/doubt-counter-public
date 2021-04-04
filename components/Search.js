import { useState, useEffect } from "react";
import searchStyles from "../styles/Search.module.css";

const Search = ({text, onChange}) => {
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
        <div className={searchStyles.grid}>
            <label htmlFor="Search">Search</label>
            <input id="searchText" type="text" value={searchText} onChange={onBlur} onKeyUp={onKeyUp}/>
            <button onClick={submitClick}>Go</button>
        </div>
    );
}

export default Search;