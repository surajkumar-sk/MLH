const db = require('./db.json')
const express = require("express");
const cors = require('cors');
var fs = require('fs');
const {searchWithoutFilter,searchWithFilter} = require('./functions')
const searchJSON = require('./search.json')

const app = express();

app.use(
  cors({
    origin:true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  }),
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/',(req,res)=>{
  res.send('server running')
})

app.post('/',(req,res1)=>{
  db.push(req.body);
  let data = JSON.stringify(db,null,2)
  fs.writeFile('db.json', data , 'utf8', ()=>{
    res1.status(200).send('Data Written Successfully')
  });
});

app.post('/products',(req,res) =>{
  try{
    let results=[];
    if(req.body.query.searchText && req.body.query.color.length){
      results =  searchWithFilter('pk','searchsub',req.body.query.searchText,req.body.query.color);
    }
    else if(req.body.query.searchText){
      results =  searchWithoutFilter('pk','searchsub',req.body.query.searchText);
    } else if(!req.body.query.searchText && req.body.query.color.length && !req.body.query.searchTextsArray.length){
      searchJSON.categories.map((cat) =>{
        try{
          let result = searchWithFilter('pk','searchsub',`#${cat.name.toLowerCase()}`,req.body.query.color);
          results = [...results,...result]
        }
        catch(err){
          console.log(err)
        }
        
      })
    } else if(!req.body.query.searchText && req.body.query.color.length && req.body.query.searchTextsArray.length){
      
      try{
        let searchTexts = req.body.query.searchTextsArray;
        searchTexts.map((t) =>{
          let result = searchWithFilter('pk','searchsub',t,req.body.query.color);
          results = [...results,...result];
        })
      }
      catch(err){
        console.log(err);
      }
      
    } else if(!req.body.query.searchText && !req.body.query.color.length && req.body.query.searchTextsArray){
      
      try{
        let searchTexts = req.body.query.searchTextsArray;
        searchTexts.map((t) =>{
          let result = searchWithoutFilter('pk','searchsub',t,req.body.query.color);
          results = [...results,...result];
        })
      }
      catch(err){
        console.log(err);
      }
      
    }
    console.log(results,req.body.query)
    str =JSON.stringify(results);
    res.send(str);
  }
  catch(err){
    console.log(err);
    res.status(400).send({msg:"some error occured"})
  }
  
})

app.listen(9200, () => {
  console.log('running on port 9200')
});