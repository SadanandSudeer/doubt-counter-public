import { errorHandler, getSearchText } from '../pages/api/utils';
import { ObjectID } from 'bson';

export async function getQuestionIds(conn) {
    let ids = [];
    let docs = await conn.db.collection('QuestionPublic').aggregate(
        [
            { $project: { "_id": "$_id", "TimeStamp":"$TimeStamp" } },
            { $sort: { TimeStamp : -1 } }, 
            { $project: { "_id": "$_id" } },
        ]
    ).toArray();

    docs.map(d => ids.push(d._id));
    return ids;
}


export async function getQuestionById (con, qId) {
    let doc = await con.db.collection('QuestionPublic').find({"_id": ObjectID(qId)}).toArray();
    let response = {question: doc[0], similarQuestions:[]};
    
    if (response.question === null){
        res.json({});
        return;
    }

    let qText = getSearchText(response.question);

    let similarQuestions = []
    if (qText != null){
        similarQuestions = await con.db.collection('Question').aggregate(
        [
            { $match: { $text: { $search: qText } } },
            { $addFields: {score: { $meta: "textScore" }}},
            { $sort: { score : -1 } }, 
            { $limit : 11 },
            { $project: {"_id": "$_id"}}
        ]
        ).toArray();
    }
    let ids = []
    similarQuestions.map(q => ids.push(ObjectID(q._id)));
    similarQuestions = await con.db.collection('QuestionPublic').find({_id : { "$in": ids}}).toArray();
    response.similarQuestions = similarQuestions;
    return response;
}