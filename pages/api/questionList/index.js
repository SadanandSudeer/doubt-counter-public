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
    console.info("Handling cors request QuestionList", searchReq);
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
                            "path": "$concept._v"
                        }
                    });
    basePipeline.push({
                        "$unwind": {
                            "path": "$topic._v"
                        }
                    });
    basePipeline.push({
                        "$unwind": {
                            "path": "$exam._v"
                        }
                    });
    basePipeline.push({
                        "$unwind": {
                            "path": "$prevExams._v"
                        }
                    });
    let projection = {
                        "questionText": "$questionText.html",
                        "answerText": "$answerText.html",
                        "solutionText": "$solutionText.html",
                        "chapterName": "$chapterName",
                        "concept": "$concept._v",
                        "topic": "$topic._v",
                        "exam": "$exam._v",
                        "prevExams": "$prevExams._v",
                        "PrevExamFilter": {
                            "$concat": [
                                "$prevExams._v.label",
                                "-",
                                "$prevExams._v.value"
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