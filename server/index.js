const express = require("express");
const cors = require('cors');
const axios = require('axios')
const {searchAPI} = require('./search/search')

const app = express();

app.use(
  cors({
    origin:true,
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/',(req,res)=>{
  res.send('server running')
})

app.post('/upload',(req,res)=>{
  // some random username because it's irrelevant.
  const username= 'surajkumar-sk'
  //productId would the time in seconds
  let currDate = new Date();
  let productId = currDate.getTime();

  req.body['pk'] = 'PRO';
  req.body['sk'] = `USER#${username}#PRO#${productId}`;
  req.body['searchsub'] = `#${(req.body.category.toLowerCase()).replaceAll(" ","_")}#${(req.body.subCategory.toLowerCase()).replaceAll(" ","_")}#0#0`;
  req.body['searchcat'] = `#${(req.body.category.toLowerCase()).replaceAll(" ","_")}#0#0`;
  req.body['colors'] = req.body.stock.map((s)=> (s.color.toLowerCase()))
  axios
  .post('http://localhost:9200',req.body)
  .then(res1 => {
    if(res1.status == 200){
      res.status(200).send('recieved');
    } else {
      res.status(200).send('recieved');
    }
  })
  .catch(error => {
    console.error(error)
  })
})

app.post('/search',(req,res) =>{
  let searchTerms = searchAPI(req.body.query)
  axios
  .post('http://localhost:9200/products',{query:searchTerms})
  .then(res1 => {
    res.status(200).send(res1.data)
  })
  .catch(error => {
    console.error(error)
  })


})

app.listen(8000, () => {
  console.log('running on port 8000')
});