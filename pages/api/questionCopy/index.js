import {normalizeQuestion, isNull } from '../utils';
import { ObjectID } from 'bson';
import nextConnect from 'next-connect';
import middleware from '../database';
console.log("1")
const handlerCopy = nextConnect();
handlerCopy.use(middleware);
handlerCopy.get(async (req, res) => {
    console.info("started");
    let questionIds = await req.db.collection('Question').aggregate(
        [
            {"$project":{ "_id": "$_id" }}
        ]).toArray();
    let ids = []
    questionIds.map( (q) => {
        ids.push(ObjectID(q._id));
    });

    let questions = await req.db.collection('Question').aggregate(
        [
            {
                '$match': {
                    '_id': {
                        '$in': ids
                    }
                }
            }
        ]).toArray();
    
    let qList = [];
    for(let i = 0; i < questions.length; i++){
        console.info("insert row", i, questions[i]._id);
        await req.db.collection('QuestionPublic').insertOne(normalizeQuestion(questions[i]));
    }

    res.json("Ok");
});

export default handlerCopy;