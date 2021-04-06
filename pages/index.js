//import { useState, useEffect } from "react";
import QuestionList from '../components/QuestionList';
import subjectStyles from '../styles/Subject.module.css';
import Head from 'next/head';

export default function Home({articles}) {

  // const [windowWidth, setWindowWidth] = useState();
  // const [windowHeight, setWindowHeight] = useState();
  // useEffect(async () => {
  //     setWindowHeight(window.innerHeight);
  //     setWindowWidth(window.innerWidth);
  // }, []);
  // useEffect(async () => {
  //   document.getElementById("layoutContent").style.maxHeight = windowHeight;
  //   document.getElementById("layoutContent").style.maxWidth = windowWidth;
  // }, [windowWidth, windowHeight])

  // useEffect(async () => {
  //   document.getElementById("__next").style.marginLeft = "5px";
  // }, [])

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
  let url = `${process.env.NEXT_PUBLIC_API}/question/latest`
  const res = await fetch(url);
  const articles = await res.json();

  return ({
      props: {
          articles
      }
  });
}