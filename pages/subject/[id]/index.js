import { useState, useEffect } from "react";
import Head from 'next/head';
import Filters from '../../../components/Filters';
import Search from '../../../components/Search';

import LeftNavigation from '../../../components/LeftNavigation';
import QuestionList from '../../../components/QuestionList';

import leftNavStyles from '../../../styles/LeftNav.module.css';
import subjectStyles from '../../../styles/Subject.module.css';
import {connection} from '../../../lib/database';
import {getLeftNav} from '../../../lib/subjectDB';
import {getApiURL} from '../../../lib/config';

export default function subject({subject}){
    const [sub, setSubject] = useState(subject);
    const [filters, setFilters] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [questionList, setQuestionList] =  useState([]);
    const [hasNextPage, setHasNextPage] = useState();
    const [error, setError] = useState("");

    useEffect(async () => {
        if (filters.length === 0 && searchText.length < 3){
            setQuestionList([]);
            setHasNextPage(false);
            return;
        }
        var req = {subject: sub.Name, SearchText: searchText,  Chapters:[], Concepts:[], Topics:[], Exams:[], PriorExams:[], skip:0, limit: 11};
        filters.map(f => {
            req[f.type].push(f.typeItem);
        });
        
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
                setQuestionList(questions);
                setHasNextPage(questions.length == 11);            
            });
        });
    }, [filters, searchText])

    const handleLoadMore = () => {
        // Some API call to fetch the next page
        var req = {subject: sub.Name, SearchText: searchText,  Chapters:[], Concepts:[], Topics:[], Exams:[], PriorExams:[], skip:questionList.length, limit: 11};
        filters.map(f => {
            req[f.type].push(f.typeItem);
        });
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

    // const router = useRouter();
    // const {id} = router.query;
    const onSelect = (subject, cat, item, count) => {
        let newFilters = [...filters];
        let matchFound = false;
        filters.map(fi => {
            if (fi.subject === subject
                && fi.type === cat
                && fi.typeItem === item)
                {
                    matchFound = true;
                }
        });
        if (!matchFound){
            newFilters.push({subject:subject, type:cat, typeItem:item});
            setFilters(newFilters);
        }
    }

    const removeFilter = (f) =>{
        let reduced = [];
        filters.map(fi => {
            if (fi.subject !== f.subject
                || fi.type !== f.type
                || fi.typeItem !== f.typeItem)
                {
                    reduced.push(fi);
                }
        });
        setFilters(reduced);
    }

    const searchTextChanged = (text) => {
        setSearchText(text);
    }

    return (
        <>
            <Head>
                <title>{subject.Name}</title>
            </Head>
            <div id="main" className={subjectStyles.grid}>
                <div className={leftNavStyles.leftNav} >
                    <LeftNavigation data={subject} onSelect={onSelect}/>
                </div>
                <div className={subjectStyles.content}>
                    <Search searchText={searchText} label={subject.Name} onChange={searchTextChanged}/>
                    <Filters filters={filters} onRemove={removeFilter}/>
                    <div className={subjectStyles.questionList}>
                        <QuestionList questions={questionList} isLeaf={false} handleMore={handleLoadMore} hasMore={hasNextPage}/>
                    </div>
                </div>
            </div>
            <div>{error}</div>
        </>
    );
}

export const getStaticProps = async(context) => {
    let conn = await connection();
    let subject = await getLeftNav(conn, context.params.id);
    subject = JSON.parse(JSON.stringify(subject));
    return {
        props: {
            subject
        }
    }
}

export const getStaticPaths = async () => {
    let conn = await connection();
    let doc = await conn.db.collection('BookDb').distinct('subject');
    let doc1 = await conn.db.collection('InstituteDb').distinct('subject');
    let array3 = doc.concat(doc1);
    doc = array3.filter((item,index)=>{
        return (array3.indexOf(item) == index)
    })
    const paths = doc.map((aid) => ({params:{id: ''+ aid}}));
    //res.json(doc);
    return {
        paths,
        fallback:false
    } 
}