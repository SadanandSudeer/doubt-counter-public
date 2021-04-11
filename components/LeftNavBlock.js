import leftNavStyles from '../styles/LeftNav.module.css';
const LeftNavBlock = (props) => {
    const buildChapterLink = (propId, propItem) =>{
        return (
            <a 
                key={propId.subject + "~" + propItem._id + "~" + propItem.count} 
                onClick={e => propId.onSelect(propId.subject, propId.label, propItem._id, propItem.count)}>
                    {(propItem._id === "" ? '00000 - Miscellaneous' : propItem._id) + " (" + propItem.count + ")"}
            </a>);
    }

    return (
        <>
            <div className={leftNavStyles.menuHead}>
                <div className={leftNavStyles.spacer}></div>
                <a className={leftNavStyles.head} href="#">{props.label}</a>
                <img src='/assets/images/eye.png' className={leftNavStyles.toggle} onClick={e => props.onClick(props.id, e)}/>
            </div>
            <div className={leftNavStyles.menuItems} style={{display:props.isOpen?"block":"none"}}>
                {
                    props.items.map(i => buildChapterLink(props, i))
                }
            </div>

        </>
    );
}
export default LeftNavBlock;