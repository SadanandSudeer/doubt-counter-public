import {normalizeQuestion, isNull } from '../utils';
import { ObjectID } from 'bson';
import nextConnect from 'next-connect';
import middleware from '../../../lib/database';

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
    let questionsP = await req.db.collection('QuestionPublic').aggregate(
        [
            {
                '$match': {
                    '_id': {
                        '$in': ids
                    }
                }
            },
            {
                '$project': {
                    "_id": 1
                }
            }
        ]).toArray();
        
    let excludeIds = [];
    questionsP.map((qp)=> excludeIds.push(qp._id.toString()));
    let qList = [];
    console.info(excludeIds);
    for(let i = 0; i < questions.length; i++){
        console.info("Processed", excludeIds.indexOf(questions[i]._id.toString()))
        if (excludeIds.indexOf(questions[i]._id.toString()) !== -1){
            console.info("Skip row", i, questions[i]._id);
            continue;        
        }
        console.info("insert row", i, questions[i]._id);
        qList.push(normalizeQuestion(questions[i]));
        if (qList.length === 30){
            await req.db.collection('QuestionPublic').insertMany(qList);
            qList=[];
        }
    }
    if (qList.length > 0){
        await req.db.collection('QuestionPublic').insertMany(qList);
        qList=[];
    }

    res.json("Ok");
});

export default handlerCopy;