import Head from 'next/head';

import { useEffect } from "react";
import QuestionList from "../../../components/QuestionList";
/*import {server} from '../../../config';*/
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
            <Head>
                <title>Kota Doubt Counter - {question.subject}</title>
                <meta name="description" content="Doubt Counter makes learning simple by helping you get over problems you are stuck with. Prepare for JEE Main, NEET, JEE Advanced exams. Its free with no adds so you focus on studies and nothing else!" />
                <meta name="keywords" content={question.SearchableText}/>
                <link rel="icon" href="/assets/images/KDC_Logo_3.png"></link>
            </Head>
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
