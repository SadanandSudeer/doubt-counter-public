import { ObjectID } from 'bson';

export async function getLeftNav(conn, subject){
    let ids = [];
    let doc = await conn.db.collection('BookDb').find({"subject": subject}).project({"_id": 1}).toArray();
    doc.map(d => ids.push(ObjectID(d._id)));
    doc = await conn.db.collection('InstituteDb').find({"subject": subject}).project({"_id": 1}).toArray();

    doc.map(d => ids.push(ObjectID(d._id)));
    let files = await conn.db.collection("FileDetailsDB").find({"srcId": { $in: ids}}).project({"_id": 1}).toArray();
    ids = [];
    files.map(d => ids.push(ObjectID(d._id)));


    let chapters = await conn.db.collection("Question").aggregate([
        {
            $match: {
                "fileId": { 
                    $in: ids
                }
            }
        },
        {
            $group :{
                _id: "$chapterName",
                "count": { $sum: 1}
            }
        }]).toArray();

    let concepts = await conn.db.collection("Question").aggregate([
        {
            $match: {
                "fileId": { 
                    $in: ids
                }
            }
        },
        {
            '$unwind': {
                'path': '$concept'
            }
        }, 
        {
            '$project': {
                'concept': '$concept.value'
            }
        }, 
        {
            '$group': {
                '_id': '$concept', 
                'count': {
                    '$sum': 1
                }
            }
    }]).toArray();


    let topics = await conn.db.collection("Question").aggregate([
        {
            $match: {
                "fileId": { 
                    $in: ids
                }
            }
        },
        {
            '$unwind': {
                'path': '$topic'
            }
        }, 
        {
            '$project': {
                'topic': '$topic.value'
            }
        }, 
        {
            '$group': {
                '_id': '$topic', 
                'count': {
                    '$sum': 1
                }
            }
    }]).toArray();

    let exam = await conn.db.collection("Question").aggregate([
        {
            $match: {
                "fileId": { 
                    $in: ids
                }
            }
        },
        {
            '$unwind': {
                'path': '$exam'
            }
        }, 
        {
            '$project': {
                'exam': '$exam.value'
            }
        }, 
        {
            '$group': {
                '_id': '$exam', 
                'count': {
                    '$sum': 1
                }
            }
        }]).toArray();        

    let priorExam = await conn.db.collection("Question").aggregate([
        {
            '$unwind': {
                'path': '$prevExams'
            }
        }, {
            '$project': {
                'prevExams': {
                    '$concat': [
                        '$prevExams.label', '-', '$prevExams.value'
                    ]
                }
            }
        }, {
            '$group': {
                '_id': '$prevExams', 
                'count': {
                    '$sum': 1
                }
            }
        }]).toArray();        
    
        
    let response = {Name: subject, Concepts: concepts, Chapters: chapters, Topics: topics, Exams: exam, PriorExams: priorExam};
    return response;
}