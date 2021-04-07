//import { useState, useEffect } from "react";
import QuestionList from '../components/QuestionList';
import subjectStyles from '../styles/Subject.module.css';
import {connection} from '../lib/database';

import Head from 'next/head';

export default function Home({articles}) {
  
  return (
      <>
        <Head>
            <title>Doubt Counter</title>
            <meta name="description" content="Doubt Counter makes learning simple by helping you get over problems you are stuck with. Prepare for JEE Main, NEET, JEE Advanced exams. Its free with no adds so you focus on studies and nothing else!" />
        </Head>
        <h3>Recently Added</h3>
        <img src="/assets/images/DocImages/UnD-SET.doc_files/image140.png" />
        <div className={subjectStyles.content}>
          <div className={subjectStyles.questionList}>
            <QuestionList questions={articles} isLeaf={false} />
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