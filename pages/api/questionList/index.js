import {normalizeQuestion } from '../utils';
import { ObjectID } from 'bson';
import nextConnect from 'next-connect';
import cors from "cors";
import middleware from '../../../lib/database';
const handlerQ = nextConnect();
handlerQ.use(middleware);
handlerQ.use(cors());
handlerQ.post(async (req, res) => {
    if (!req.body){
        return [];
    }
    let searchReq = req.body;
    searchReq.hasSearchText = searchReq.SearchText.length > 0
    searchReq.hasChapters = searchReq.Chapters.length > 0
    searchReq.hasConcepts = searchReq.Concepts.length > 0
    searchReq.hasTopics = searchReq.Topics.length > 0
    searchReq.hasExams = searchReq.Exams.length > 0
    searchReq.hasPriorExams = searchReq.PriorExams.length > 0
    let basePipeline = [];

    if (searchReq.hasSearchText){
        basePipeline.push(
                {
                "$match": {
                    "$text": {
                        "$search": searchReq.SearchText
                    }
                }
            });
    }
    basePipeline.push({
                        "$unwind": {
                            "path": "$concept"
                        }
                    });
    basePipeline.push({
                        "$unwind": {
                            "path": "$topic"
                        }
                    });
    basePipeline.push({
                        "$unwind": {
                            "path": "$exam"
                        }
                    });
    basePipeline.push({
                        "$unwind": {
                            "path": "$prevExams"
                        }
                    });
    let projection = {
                        "questionText": "$questionText.html",
                        "answerText": "$answerText.html",
                        "solutionText": "$solutionText.html",
                        "chapterName": "$chapterName",
                        "concept": "$concept",
                        "topic": "$topic",
                        "exam": "$exam",
                        "prevExams": "$prevExams",
                        "PrevExamFilter": {
                            "$concat": [
                                "$prevExams.label",
                                "-",
                                "$prevExams.value"
                            ]
                        },
                        "score": {"$meta": "textScore"}
                    };
        if (searchReq.hasSearchText){
            projection.score = {"$meta": "textScore"};
        }
        else{
            projection.score = {"$literal": 0};
        }
    basePipeline.push({
        '$project': projection
    });
    if (searchReq.hasChapters){
        basePipeline.push(
        {
            "$match": {
                "chapterName": {
                    "$in": searchReq.Chapters
                }
            }
        });
    }
    if (searchReq.hasConcepts){
        basePipeline.push(
        {
            "$match": {
                "concept.label": {
                    "$in": searchReq.Concepts
                }
            }
        });
    }
    if (searchReq.hasTopics){
        basePipeline.push(
        {
            "$match": {
                "topic.label": {
                    "$in": searchReq.Topics
                }
            }
        });
    }
    if (searchReq.hasExams){
        basePipeline.push(
        {
            "$match": {
                "exam.label": {
                    "$in": searchReq.Exams
                }
            }
        });
    }
    if (searchReq.hasPriorExams){
        basePipeline.push(
        {
            "$match": {
                "PrevExamFilter": {
                    "$in": searchReq.PriorExams
                }
            }
        });
    }

     basePipeline.push({
        "$group":{
            "_id":"$_id" ,
            "score": {"$first": "$score"}
        }
    });
    basePipeline.push({"$sort": {"score": -1}});
    basePipeline.push({"$skip": searchReq.skip})
    basePipeline.push({"$limit": searchReq.limit});

    let questionIds = await req.db.collection('Question').aggregate(basePipeline).toArray();
    let ids = [];
    questionIds.map(q => ids.push(ObjectID(q._id)));
    let files = await req.db.collection("QuestionPublic").aggregate([
        {
            "$match": {
                '_id': {
                    '$in': ids
                }
            }
        }
    ]).toArray();
    //let files = await req.db.collection("QuestionPublic").find({"_id": { $in: ids}}).toArray();
    res.json(files);
});
export default handlerQ;