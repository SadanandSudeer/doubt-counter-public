const jsdom = require("jsdom");
const { JSDOM } = jsdom;

import { ObjectID } from 'bson';
import nextConnect from 'next-connect';
import middleware from '../../database';
const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
    const jsdom = require("jsdom");
    let doc = await req.db.collection('Question').find({"_id": ObjectID(req.query.id)}).toArray();
    let response = {question: normalizeQuestion(doc[0]), similarQuestions:[]};
    
    if (response.question === null){
        res.json({});
        return;
    }

    let qText = getSearchText(response.question);

    let similarQuestions = []
    if (qText != null){
        similarQuestions = await req.db.collection('Question').aggregate(
        [
            { $match: { $text: { $search: qText } } },
            { $addFields: {score: { $meta: "textScore" }}},
            { $sort: { score : -1 } }, 
            { $limit : 11 }        
        ]
     ).toArray();
    }

    similarQuestions.map(q => response.similarQuestions.push(normalizeQuestion(q)));

    res.json(response);
});

const isNull = (obj) =>{
    if (!obj || obj === undefined || obj === null){
        return true;
    }
    return false;
}
const normalizeQuestion = (q) => {
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

const getSearchText = (q) => {
    let questionHtml = q.questionText.html;
    let solutionHtml = q.solutionText.html;
        
    const dom = new JSDOM('<!DOCTYPE html><body><p id="main">' + questionHtml + '</p> <p id="main1">' + solutionHtml + '</p></body>');
    return dom.window.document.documentElement.textContent;
}

const getCleanHTML = (doc) => {
    let dom = new JSDOM(doc)
    let fakeImages = dom.window.document.querySelectorAll("*");
	fakeImages.forEach(fakeImage => {
      fakeImage.removeAttribute('class');
	});
    return dom.window.document.documentElement.innerHTML;
}
export default handler;