import nextConnect from 'next-connect';
import middleware from '../../../lib/database';
const handlerQ = nextConnect();
handlerQ.use(middleware);
handlerQ.get(async (req, res) => {
    let ids = [];
    let docs = await req.db.collection('QuestionPublic').aggregate(
        [
            { $project: { "_id": "$_id", "TimeStamp":"$TimeStamp" } },
            { $sort: { TimeStamp : -1 } }, 
            { $project: { "_id": "$_id" } },
        ]
    ).toArray();

    docs.map(d => ids.push(d._id));
    res.json(ids);
});
export default handlerQ;