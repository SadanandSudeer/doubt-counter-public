import { useEffect } from "react";
import QuestionList from '../components/QuestionList';

import Head from 'next/head';
export default function Home({articles}) {
  useEffect(async () => {
    document.getElementById("__next").style.marginLeft = "5px";
  }, [])

  return (
      <>
            <Head>
                <title>Doubt Counter</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Doubt Counter makes learning simple by helping you get over problems you are stuck with. Prepare for JEE Main, NEET, JEE Advanced exams. Its free with no adds so you focus on studies and nothing else!" />
            </Head>
          <h3>Recently Added</h3>
          <img src="/assets/images/DocImages/UnD-SET.doc_files/image140.png" />
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