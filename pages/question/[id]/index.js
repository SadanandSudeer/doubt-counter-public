import { useEffect } from "react";
import QuestionList from "../../../components/QuestionList";
import {server} from '../../../config';
import qiStyle from '../../../styles/Question.module.css';
import {getQuestionById, getQuestionIds} from '../../../lib/questionDB';
import {connection} from '../../../lib/database';

export default function question({question}){
    useEffect(async () => {
        document.getElementById("__next").style.marginLeft = "5px";
    }, [])
    
    const getSelectedQuestion = (q) =>{
        let selectedQuestion = [];
        selectedQuestion.push(q.question);
        return selectedQuestion
    }

    return (
        <>
            <div id="showQDetails" className={qiStyle.content}>
                <QuestionList questions={getSelectedQuestion(question)} isLeaf={true}/>
            </div>
            <h3>Similar Questions</h3>
            <div className={qiStyle.content}>
                <QuestionList questions={question.similarQuestions} isLeaf={false}/>
            </div>
        </>
    );
}

export const getStaticProps = async(context) => {
    let conn = await connection();
    let question = await getQuestionById(conn, context.params.id);

    question = JSON.parse(JSON.stringify(question));
    return {
        props: {
            question
        }
    }
}

export const getStaticPaths = async () => {
    let conn = await connection();
    let qIds = await getQuestionIds(conn);

    const paths = qIds.map((aid) => ({params:{id: ''+ aid}}));
    return {
        paths,
        fallback:false
    }
}
