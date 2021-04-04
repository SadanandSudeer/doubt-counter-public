const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import nextConnect from 'next-connect';
import middleware from '../../database';
const handlerQ = nextConnect();
handlerQ.use(middleware);
handlerQ.get(async (req, res) => {
    let response = []
    let doc = await req.db.collection('QuestionPublic').find({}).sort({'TimeStamp': -1}).limit(11).toArray();
    doc.forEach(d => response.push(d));
    res.json(response);
});

export default handlerQ;