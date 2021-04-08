import QuestionItem  from './QuestionItem';
import articleStyles from '../styles/Question.module.css';

const QuestionList = ({questions, isLeaf, handleMore, hasMore}) => {
    const getMoreButton = (hasMore) => {
        if (hasMore){
            return (<div className={articleStyles.card}><button onClick={handleMore} className={articleStyles.moreButton} >More</button></div>);
        }
        else{
            return(<></>);
        }
    }
    return(
        <div className={articleStyles.grid}>
            {questions.map((a) => (<QuestionItem key={'qList' + a._id} question={a} isLeaf={isLeaf}/>))}
            {getMoreButton(hasMore)};
        </div>
    );
}

export default QuestionList;