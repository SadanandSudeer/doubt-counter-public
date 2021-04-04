import QuestionItem  from './QuestionItem';
import articleStyles from '../styles/Question.module.css';

const QuestionList = ({questions, isLeaf, handleMore, hasMore}) => {
    return(
        <div className={articleStyles.grid}>
            {questions.map((a) => (<QuestionItem key={'qList' + a._id} question={a} isLeaf={isLeaf}/>))}
            <div className={articleStyles.card} style={{display:hasMore?'block':'none'}}><button onClick={handleMore} className={articleStyles.moreButton} >More</button></div>
        </div>
    );
}

export default QuestionList;