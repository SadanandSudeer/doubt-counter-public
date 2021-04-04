import nextConnect from 'next-connect';
import middleware from '../database';
const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
  let doc = await req.db.collection('BookDb').distinct('subject');
  let doc1 = await req.db.collection('InstituteDb').distinct('subject');
  let array3 = doc.concat(doc1);
  doc = array3.filter((item,index)=>{
      return (array3.indexOf(item) == index)
  })
  res.json(doc);
});
export default handler;