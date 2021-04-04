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
            { "$match": { "options._v" : {$exists: false}}},
            {"$project":{ "_id": "$_id" }}
        ]).toArray();
    questionIds.map(async (q) => {
        console.info("processing", q._id);
        //let question = await req.db.collection('QuestionPublic').find({"_id": ObjectID(q._id)}).toArray();
        //if (isNull(question) || question.length === 0){
        //    console.info("Info not found in new table for ", q._id);
            let question = await req.db.collection('Question').find({"_id": ObjectID(q._id)}).toArray();
            question.map(async (q1) => {
                let nQ = normalizeQuestion(q1);
                console.info("Normalized ", q1._id);
                await req.db.collection('QuestionPublic').updateOne({"_id": ObjectID(q1._id)}, [ { "$set": nQ}],  {
                    upsert: true
                  });
            });
        //}        
    });
    res.json("Ok");
});

export default handlerCopy;