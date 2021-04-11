import { useState, useEffect } from "react";
import searchStyles from "../styles/Search.module.css";

const Search = ({text, label, onChange}) => {
    const [searchText, setSearchText] = useState(text??"");
    const [shouldTrigger, setShouldTrigger] = useState(false);
    const [searchDisabled, setDisabled] = useState((text??"").length < 3);
    useEffect(() => {
        if (shouldTrigger){
            onChange(searchText);
            setShouldTrigger(false);
        }
    }, [shouldTrigger])


    let inputLabel = "Search"

    const onBlur = (e) => {
        let txt = e.currentTarget.value;
        setSearchText(txt);
        setDisabled(txt.length < 3)
    }

    const submitClick = () =>{
        setShouldTrigger(true);
    }

    const onKeyUp = (e) => {
        if (e.key === "Enter"){
            if (searchText.length >= 3){
                setShouldTrigger(true);
            }
        }
    }

    return (
        <div className={searchStyles.main}>
        <div className={searchStyles.grid}>
            <div className={searchStyles.cardLabel}>
               <h3> <label htmlFor="Search">Search {label}</label></h3>
               <span>Type at least 3 letters and then press ENTER key Or Press SEARCH button</span>
            </div>
            <div className={searchStyles.cardInput}>
                <input id="searchTextField" type="text" value={searchText} onChange={onBlur} onKeyUp={onKeyUp}/>
                <button onClick={submitClick} disabled={searchDisabled}>Search</button>
            </div>
        </div>
        </div>
    );
}

export default Search;