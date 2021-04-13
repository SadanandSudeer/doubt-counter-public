import { ObjectID } from 'bson';

export async function getLeftNav(conn, subject){
    let chapters = await conn.db.collection("Question").aggregate([
        {
            $match: {
                "subject": { 
                    $eq: subject
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
                "subject": { 
                    $eq: subject
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
                "subject": { 
                    $eq: subject
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

    // let exam = await conn.db.collection("Question").aggregate([
    //     {
    //         $match: {
    //             "subject": { 
    //                 $eq: subject
    //             }
    //        }
    //     },
    //     {
    //         '$unwind': {
    //             'path': '$exam'
    //         }
    //     }, 
    //     {
    //         '$project': {
    //             'exam': '$exam.value'
    //         }
    //     }, 
    //     {
    //         '$group': {
    //             '_id': '$exam', 
    //             'count': {
    //                 '$sum': 1
    //             }
    //         }
    //     }]).toArray();        

    // let priorExam = await conn.db.collection("Question").aggregate([
    //     {
    //         $match: {
    //             "subject": { 
    //                     $eq: subject
    //                 }
    //         }
    //     },
    //     {
    //         '$unwind': {
    //             'path': '$prevExams'
    //         }
    //     }, 
    //     {
    //         '$project': {
    //             'prevExams': {
    //                 '$concat': [
    //                     '$prevExams.label', '-', '$prevExams.value'
    //                 ]
    //             }
    //         }
    //     }, 
    //     {
    //         '$group': {
    //             '_id': '$prevExams', 
    //             'count': {
    //                 '$sum': 1
    //             }
    //         }
    //     }]).toArray();        
    
        
    let response = {Name: subject, Concepts: concepts, Chapters: chapters, Topics: topics, Exams: [], PriorExams: []};
    return response;
}