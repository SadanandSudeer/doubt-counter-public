import { useState, useEffect } from "react";
import QuestionList from '../components/QuestionList';
import subjectStyles from '../styles/Subject.module.css';
import {connection} from '../lib/database';
import Search from '../components/Search';
import {getApiURL} from '../lib/config';

import Head from 'next/head';

export default function Home({articles}) {
  const [searchText, setSearchText] = useState("");
  const [origQuestions, setOrigQuestion] = useState(articles);
  const [searchedQuestions, setSearchedQuestion] = useState([]);
  const [hasNextPage, setHasNextPage] = useState();

  useEffect(async () => {
    document.getElementById("__next").style.marginLeft = "5px";
  }, []);

  useEffect(async () => {
    if (searchText.length < 3){
      setSearchedQuestion([]);
      setHasNextPage(false);
      return;
    }
    var req = {subject: "All Subjects", SearchText: searchText,  Chapters:[], Concepts:[], Topics:[], Exams:[], PriorExams:[], skip:0, limit: 11};
    
    fetch(`${getApiURL()}/questionList`, {
        crossDomain:true,
        method: 'POST',
        headers: {
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(req)
    }).then((res)=>{
        res.json().then((questions)=>{
          setSearchedQuestion(questions);
          setHasNextPage(questions.length == 11);            
        });
    });
  }, [searchText])


  const searchTextChanged = (text) => {
    setSearchText(text);
  }

  const getHeader = () => {
    if (!searchText || searchText.length === 0){
      return (<div className={subjectStyles.resultTitle}><h3>Recently Added</h3></div>);
    }
    else
      return (<></>);
  }
  const handleLoadMore = () => {
    // Some API call to fetch the next page
    var req = {subject: "All Subjects", SearchText: searchText,  Chapters:[], Concepts:[], Topics:[], Exams:[], PriorExams:[], skip:questionList.length, limit: 11};
    fetch(`${getApiURL()}/questionList`, {
        crossDomain:true,
        method: 'POST',
        headers: {
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(req)
    }).then((res)=> {
        res.json().then((questions) => {
            setHasNextPage(questions.length == 11);
            var qList = [...questionList];
            questions.map(q => qList.push(q));
            setQuestionList(qList);    
        });
    });
}


  return (
      <>
        <Head>
            <title>Kota Doubt Counter</title>
            <meta name="description" content="Doubt Counter makes learning simple by helping you get over problems you are stuck with. Prepare for JEE Main, NEET, JEE Advanced exams. Its free with no adds so you focus on studies and nothing else!" />
            <link rel="icon" href="/assets/images/KDC_Logo_3.png"></link>
        </Head>
        <div className={subjectStyles.content}>
          <Search searchText={searchText} label="All Subjects" onChange={searchTextChanged}/>
          <hr/>
          {getHeader()}
          <div className={subjectStyles.questionList}>
            <QuestionList questions={searchText.length>0 ? searchedQuestions : origQuestions} isLeaf={false} handleMore={handleLoadMore} hasMore={hasNextPage}/>
          </div>
        </div>
      </>
  );
}

export const getStaticProps = async () => {
  try{
    let conn = await connection();
    let doc = await conn.db.collection('QuestionPublic').find({}).sort({'TimeStamp': -1}).limit(11).toArray();
    let out = JSON.parse(JSON.stringify(doc));
    return ({
      props: {
        articles: out
      }
    });
  }
  catch(error){
    console.log(error);
    return ({
      props: {
        articles: []
      }
    });
  }
}