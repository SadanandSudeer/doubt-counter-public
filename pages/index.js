import { useEffect } from "react";
import qiStyle from '../styles/Article.module.css';
import QuestionList from '../components/QuestionList';

import Head from 'next/head';
import ArticleList from '../components/ArticleList';
export default function Home({articles}) {
  useEffect(async () => {
    document.getElementById("__next").style.marginLeft = "5px";
  }, [])

  const buildQuestion = (x) => {
      if (!x || x === undefined || x === null){
        return (<span/>);
      }

      let opts = !x.options || x.options === undefined || x.options === null?[]:x.options._v===undefined? x.options : x.options._v;
      const qOptions =  opts.map(d => {
          return(
              <div className={qiStyle.opt} key={d.sequenceNumber}>
                  <div className={qiStyle.optBullet}>
                      {getCleanValue(d.Bullet, undefined).trim()}
                  </div>
                  <div className={qiStyle.optData} dangerouslySetInnerHTML={{ __html: getCleanValue(d, 'html') }} />
              </div>);
          });
      const prevYear = buildPreviousYear(x);
      return (<div id={x._id} className={qiStyle.card} key={x._id}>
          <div><div><b>Question:</b></div>&nbsp;<div>{getCleanValue(x.questionId, undefined)}</div></div>
          <div dangerouslySetInnerHTML={{ __html: getCleanValue(x.questionText, 'html') }}></div>
          {prevYear}
          <br/>
          <div className={qiStyle.questionOptions} >{qOptions}</div>
          <div><div style={{ float: "left" }}><b>Answer:</b></div>&nbsp;&nbsp;<div dangerouslySetInnerHTML={{ __html: getCleanValue(x.answerText, 'html') }} /></div>
          <div><div style={{ float: "left" }}><b>Solution:</b></div><br/><div dangerouslySetInnerHTML={{ __html: getCleanValue(x.solutionText, 'html') }} /></div>
      </div>);
  }

  const getCleanValue = (x, attr) => {
      if (x === undefined || x === null || x === "") {
          return "";
      }
      if (attr === undefined || attr === null || attr === "") {
          return x
      }
      else return x[attr];
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

  return (
      <>
          <h3>Recently Added</h3>
          <QuestionList questions={articles} isLeaf={false} />;
      </>
  );
}

export const getStaticProps = async () => {
  let url = `${process.env.NEXT_PUBLIC_API}/question/latest`
  const res = await fetch(url);
  const articles = await res.json();

  return ({
      props: {
          articles
      }
  });
}