import { useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import Link from 'next/link'
import qStyles from "../styles/Question.module.css";
import Image from "next/image";

const QuestionItem = ({question, isLeaf}) => {

    const getCleanValue = (x, attr) => {
        if (x === undefined || x === null || x === "") {
            return "";
        }
        if (attr === undefined || attr === null || attr === "") {
            return x
        }
        else return x[attr];
    }

    const getPlayer = (videoURL, isleaf) => {
        if (isNull(videoURL) || videoURL === ""){
            return(<></>);
        }
        else{
            if (isleaf){
                return(<div style={{textAlign: "-moz-center"}}><ReactPlayer url={videoURL} width="90%" height="60%" style={{margin:"0px auto"}}/></div>);
            }else{
                return(<div style={{textAlign: "-moz-center", width: "28px"}}><Image src="/assets/images/video.jpeg" width="26px" height="20px"/></div>);
            }
        }
    }
  
    const buildPreviousYear = (item) => {
        let exam =  !item || item === null 
                        ? [] 
                        : !item.prevExams || item.prevExams === null 
                            ? [] 
                            : !item.prevExams._v || item.prevExams._v === null 
                                ? !item.prevExams 
                                : !item.prevExams._v;
        if (!exam || exam === undefined || exam === null){
          return "";
        }
        return exam.map(e => <span key={item._id + "exam" + e.label+"|"+e.value} style={{marginLeft:"5px"}}>[{e.label} - {e.value}]</span>);
    }

    const buildQOptions =  (options, qId) => {
        let opts = isNull(options)?[]: isNull(options._v)? options : options._v;
        let counter = 1;
        const bmap = ['', 'a', 'b', 'c', 'd'];
        return (opts.map(d => {
                let bullet = isNull(d.bullet)? isNull(d.optSequence) ? counter++ : bmap[d.optSequence] : d.bullet
                if (isNull(bullet)){
                    debugger;
                }
                return(<div key={qId + "bullet_" + bullet} className={qStyles.opt}>
                    <div className={qStyles.optBullet}>
                        {bullet}.
                    </div>
                    <div className={qStyles.optData} dangerouslySetInnerHTML={{ __html: getCleanValue(d, 'html')}} />
                </div>);
            }));
    }

    const isNull = (obj) =>{
        if (!obj || obj === undefined || obj === null){
            return true;
        }
        return false;
    }

    const getHtml = (question, field, label) => {
        if (isNull(question)) return <div/>;
        if (isNull(question[field])) return <div/>;
        if (isNull(question[field].html)) return <div/>;
        return(<div key={label + question._id}><b>{label}</b><div dangerouslySetInnerHTML={{ __html: question[field].html}}/></div>);
    }

    if (isLeaf){
        return(
            <div key={"QItem" + question._id} className={qStyles.selectedCard}>
                    {getHtml(question, "questionText", "Question")}
                    <div className={qStyles.questionOptions}>{buildQOptions(question.options, question._id)}</div>
                    {getPlayer(question.solutionVideoPath, isLeaf)}
                    {getHtml(question, "answerText", "Answer")}
                    {getHtml(question, "solutionText", "Solution")}
            </div>
            );
    }else{
        return(
            <div key={"QItem" + question._id} className={qStyles.card}>
                <Link 
                    key={"QItem_List_   " + question._id}
                    href="/question/[id]" 
                    as={`/question/${question._id}`}>
                    <a>
                        {getHtml(question, "questionText", "Question")}
                        <div className={qStyles.questionOptions}>{buildQOptions(question.options, question._id)}</div>
                        <div className={qStyles.clickMe}><div style={{flex:1}}>Click here to view answer &amp; solution</div><div>{getPlayer(question.solutionVideoPath, isLeaf)}</div></div>
                        {
                            //getHtml(question, "answerText", "Answer")
                        }
                        {
                            //getHtml(question, "solutionText", "Solution")
                        }
                    </a>
                </Link>
            </div>
        );
    }
}

export default QuestionItem;
