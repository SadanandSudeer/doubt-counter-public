import { useEffect } from "react";
import QuestionList from "../../../components/QuestionList";
import {server} from '../../../config';
import qiStyle from '../../../styles/Question.module.css';
export default function question({question}){
    useEffect(async () => {
        document.getElementById("__next").style.marginLeft = "5px";
    }, [])
    

    let selectedQuestion = [];
    selectedQuestion.push(question.question);

    return (
        <>
            <div id="showQDetails" className={qiStyle.contentSingleColumn}>
                <QuestionList questions={selectedQuestion} isLeaf={true}/>
            </div>
            <h3>Similar Questions</h3>
            <p className={qiStyle.content}>
                <QuestionList questions={question.similarQuestions} isLeaf={false}/>
            </p>
        </>
    );
}

export const getStaticProps = async(context) => {
    let url = `${process.env.NEXT_PUBLIC_API}/question/${context.params.id}`
    const res = await fetch(url, {
        crossDomain:true,
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    });
    const question = await res.json();
    return {
        props: {
            question
        }
    }
}

export const getStaticPaths = async () => {
    let url = `${process.env.NEXT_PUBLIC_API}/question/`
    const res = await fetch(url, {
        crossDomain:true,
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    });
    const articles = await res.json();
    //const ids = articles.map((a) => (a));
    
    const paths = articles.map((aid) => ({params:{id: ''+ aid}}));
    return {
        paths,
        fallback:false
    }
}
