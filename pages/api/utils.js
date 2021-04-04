const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export const isNull = (obj) =>{
    if (!obj || obj === undefined || obj === null){
        return true;
    }
    return false;
}
export const normalizeQuestion = (q) => {
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
    if (isNull(q.options)) {
        q.options = [];
    }else{
        q.options.map(o => {
            if (isNull(o.html)){
                o.html = "";
            }
            else{
                o.html = getCleanHTML(o.html)
            }
        });
    }
    return q;
}

export const getSearchText = (q) => {
    let questionHtml = q.questionText.html;
    let solutionHtml = q.solutionText.html;
    //const jsdom = require("jsdom");
        
    const dom = new JSDOM('<!DOCTYPE html><body><p id="main">' + questionHtml + '</p> <p id="main1">' + solutionHtml + '</p></body>');
    return dom.window.document.documentElement.textContent;
}

export const getCleanHTML_Old = (doc) => {
    //const jsdom = require("jsdom");
    let dom = new JSDOM(doc)
    let fakeImages = dom.window.document.querySelectorAll("*");
	fakeImages.forEach(fakeImage => {
      fakeImage.removeAttribute('class');
	});
    return dom.window.document.documentElement.innerHTML;
}

const getCleanHTML = (doc) => {
    debugger;
    const jsdom = require("jsdom");
    let dom = new JSDOM(doc)
    const $ = require('jquery')(dom.window);
    $('*[class]').removeClass();
    $('img').each(function(){
        let oldPAth = $(this).attr('src');
        let newImg = '/assets/images/DocImages/' + oldPAth.split("=")[1].replace('%2F', "/");
        $(this).attr('src', newImg);
        });
    let cleanHtml = dom.window.document.documentElement.innerHTML;
    return cleanHtml;
}