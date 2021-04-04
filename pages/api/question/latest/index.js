const jsdom = require("jsdom");
const { JSDOM } = jsdom;

import nextConnect from 'next-connect';
import middleware from '../../database';
const handlerQ = nextConnect();
handlerQ.use(middleware);
handlerQ.get(async (req, res) => {
    let response = []
    let doc = await req.db.collection('Question').find({}).sort({'TimeStamp': -1}).limit(11).toArray();
    doc.forEach(d => response.push(normalizeQuestion(d)));
    res.json(response);
});


const isNull = (obj) =>{
    if (!obj || obj === undefined || obj === null){
        return true;
    }
    return false;
}
const normalizeQuestion = (q) => {
    debugger;
    if (isNull(q)){
        q = [];
    }

    if (isNull(q.questionText) || isNull(q.questionText.html)) {
        q.questionText = {html: ""}
    }
    else{
        q.questionText.html = getCleanHTML(q.questionText.html);
    }
    if (isNull(q.answerText) || isNull(q.answerText.html)) {
        q.answerText = {html: ""}
    }
    else{
        q.answerText.html = getCleanHTML(q.answerText.html);
    }
    if (isNull(q.solutionText) || isNull(q.solutionText.html)) {
        q.solutionText = {html: ""}
    }
    else{
        q.solutionText.html = getCleanHTML(q.solutionText.html);
    }
    return q;
}

const getCleanHTML = (doc) => {
    debugger;
    const jsdom = require("jsdom");
    let dom = new JSDOM(doc)
    const $ = require('jquery')(dom.window);
    console.info("before");
    $('*[class]').removeClass();
    // elements.each(function (index){
        console.info("after");
    // });
    // console.log(elements);
    //let fakeImages = dom.window.document.querySelectorAll("*");
    let cleanHtml = dom.window.document.documentElement.innerHTML;
    return cleanHtml;
}
export default handlerQ;