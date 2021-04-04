import Head from 'next/head';
import Link from 'next/link';

export default function article({article}){
    return (
        <>
            <Head>
                <title>Selected Article</title>
            </Head>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <br/>
            <Link href='/'>Go Back</Link>
        </>
    );
}

export const getStaticProps = async(context) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + context.params.id);
    const article = await res.json();
    return {
        props: {
            article
        }
    }
}


export const getStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const articles = await res.json();
    const ids = articles.map((a) => (a.id));
    
    const paths = ids.map((aid) => ({params:{id: ''+aid}}));
    return {
        paths,
        fallback:false
    }
}