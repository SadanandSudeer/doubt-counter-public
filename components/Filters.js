import Link from 'next/link'
import filterStyles from "../styles/filter.module.css";

const Filters = ({filters, onRemove}) => {
    return (
        <div className={filterStyles.grid}>
            {filters.map((f) => (<div key={f.type + ":" + f.typeItem} className={filterStyles.card}><div>{f.type + ": " + f.typeItem}</div><div onClick={() => onRemove(f)}>x</div></div>))}
        </div>
    );
}

export default Filters;