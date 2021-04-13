import {normalizeQuestion, isNull } from '../utils';
import { ObjectID } from 'bson';
import nextConnect from 'next-connect';
import middleware from '../../../lib/database';
const handlerFix = nextConnect();
handlerFix.use(middleware);
handlerFix.get(async (req, res) => {
    console.info("concept");
    let questionIds = await req.db.collection('Question').aggregate([
            {"$match" : { "concept._v" : { "$exists": true }}},
            {"$project":{ "_id": "$_id" }}
        ]).toArray();
    let ids = []
    questionIds.map( (q) => {
        ids.push(ObjectID(q._id));
    });
    for(let i = 0; i < ids.length; i++){
        let id = ids[i];
        console.info("-------------", id, "--------------");
        let question = await req.db.collection('Question').find({"_id":id}).toArray();
        console.info(question[0].concept);
        let opts = [...question[0].concept._v];
        await req.db.collection('Question').update({"_id": id}, {$set: {"concept": opts}});
    }
    
    //Topic
    console.info("topic");
    questionIds = await req.db.collection('Question').aggregate([
        {"$match" : { "topic._v" : { "$exists": true }}},
        {"$project":{ "_id": "$_id" }}
    ]).toArray();
    ids = []
    questionIds.map( (q) => {
        ids.push(ObjectID(q._id));
    });
    for(let i = 0; i < ids.length; i++){
        let id = ids[i];
        console.info("-------------", id, "--------------");
        let question = await req.db.collection('Question').find({"_id":id}).toArray();
        console.info(question[0].topic);
        let opts = [...question[0].topic._v];
        await req.db.collection('Question').update({"_id": id}, {$set: {"topic": opts}});
    }

    console.info("exam");
    questionIds = await req.db.collection('Question').aggregate([
        {"$match" : { "exam._v" : { "$exists": true }}},
        {"$project":{ "_id": "$_id" }}
    ]).toArray();
    ids = []
    questionIds.map( (q) => {
        ids.push(ObjectID(q._id));
    });
    for(let i = 0; i < ids.length; i++){
        let id = ids[i];
        console.info("-------------", id, "--------------");
        let question = await req.db.collection('Question').find({"_id":id}).toArray();
        console.info(question[0].exam);
        let opts = [...question[0].exam._v];
        await req.db.collection('Question').update({"_id": id}, {$set: {"exam": opts}});
    }

    console.info("prevExams");
    questionIds = await req.db.collection('Question').aggregate([
        {"$match" : { "prevExams._v" : { "$exists": true }}},
        {"$project":{ "_id": "$_id" }}
    ]).toArray();
    ids = []
    questionIds.map( (q) => {
        ids.push(ObjectID(q._id));
    });
    for(let i = 0; i < ids.length; i++){
        let id = ids[i];
        console.info("-------------", id, "--------------");
        let question = await req.db.collection('Question').find({"_id":id}).toArray();
        console.info(question[0].prevExams);
        let opts = [...question[0].prevExams._v];
        await req.db.collection('Question').update({"_id": id}, {$set: {"prevExams": opts}});
    }


    console.info("add subject field to question")
    questionIds = await req.db.collection('Question').aggregate([
        {"$project":{ "_id": "$_id" }}
    ]).toArray();
    questionIds.map( (q) => {
        ids.push(ObjectID(q._id));
    });
    Promise.all(ids.map(async (id) =>{
        try{
            let question = await req.db.collection('Question').find({"_id": id}).toArray();
            let file = await req.db.collection('FileDetailsDB').find({"_id": ObjectID(question[0].fileId)}).toArray();
            console.info("Files Found", file.length);
            if (file.length == 0){
                //await req.db.collection('Question').updateOne({"_id": id}, {$set: {"subject": 'Physics'}});
            }
            else{
                //  console.info("Files Src Type", file[0].srcType);
                if (file[0].srcType === "BOOK"){
                    let b = await req.db.collection('BookDb').find({"_id":ObjectID(file[0].srcId)}).toArray();
                    //console.info("Books Found", b.length);
                    console.info("Books Subject", b[0].subject);
                    await req.db.collection('Question').updateOne({"_id": id}, {$set: {"subject": b[0].subject}});
                }
                else{
                    let i = await req.db.collection('InstituteDb').find({"_id":file[0].srcId}).toArray();
                    //console.info("institutes Found", i.length);
                    console.info("institutes Subject", i[0].subject);
                    await req.db.collection('Question').updateOne({"_id": id}, {$set: {"subject": i[0].subject}});
                }
            }
        }
        catch(error){
            console.log("failed updating subject for:", id, error);
        }
    })).then(()=>res.json("Ok"));
});

export default handlerFix;