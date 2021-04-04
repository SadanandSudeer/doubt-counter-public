import { ObjectID } from 'bson';
import nextConnect from 'next-connect';
import middleware from '../../database';
const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
    let ids = [];
    let doc = await req.db.collection('BookDb').find({"subject": req.query.id}).project({"_id": 1}).toArray();
    doc.map(d => ids.push(ObjectID(d._id)));
    doc = await req.db.collection('InstituteDb').find({"subject": req.query.id}).project({"_id": 1}).toArray();
    doc.map(d => ids.push(ObjectID(d._id)));
    let files = await req.db.collection("FileDetailsDB").find({"srcId": { $in: ids}}).project({"_id": 1}).toArray();
    ids = [];
    files.map(d => ids.push(ObjectID(d._id)));
    let chapters = await req.db.collection("Question").aggregate([
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

    let concepts = await req.db.collection("Question").aggregate([
        {
            $match: {
                "fileId": { 
                    $in: ids
                }
            }
        },
        {
            '$unwind': {
                'path': '$concept._v'
            }
        }, 
        {
            '$project': {
                'concept': '$concept._v.value'
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

    let topics = await req.db.collection("Question").aggregate([
        {
            $match: {
                "fileId": { 
                    $in: ids
                }
            }
        },
        {
            '$unwind': {
                'path': '$topic._v'
            }
        }, 
        {
            '$project': {
                'topic': '$topic._v.value'
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

    let exam = await req.db.collection("Question").aggregate([
        {
            $match: {
                "fileId": { 
                    $in: ids
                }
            }
        },
        {
            '$unwind': {
                'path': '$exam._v'
            }
        }, 
        {
            '$project': {
                'exam': '$exam._v.value'
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

    let priorExam = await req.db.collection("Question").aggregate([
        {
            '$unwind': {
                'path': '$prevExams._v'
            }
        }, {
            '$project': {
                'prevExams': {
                    '$concat': [
                        '$prevExams._v.label', '-', '$prevExams._v.value'
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
    
        
        let response = {Name: req.query.id, Concepts: concepts, Chapters: chapters, Topics: topics, Exams: exam, PriorExams: priorExam}
        res.json(response);
    });
export default handler;