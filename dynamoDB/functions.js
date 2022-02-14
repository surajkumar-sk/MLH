const db = require('./db.json')

/**
 * @description - this functions searches the db.json with pk and sk
 * @param {string} pk - Atrribute name of primary key for search 
 * @param {string} sk  - atrribute name for sort key for search
 * @param {string} beginsWith - begins with text value for sort key so the algo can replicate beginwith() of dynamoDB
 */
exports.searchWithoutFilter= (pk,sk,beginsWith) =>{
  if(!pk){
    return {status:400,message:'Primary key is essential for searching data'}
  }
  else if(!sk){
    return {status:400,message:'Sort key is essential for searching data'}
  }
  else if(!beginsWith){
    return {status:400,message:'Sort key beginswith value is essential for searching data'}
  }
  else if(pk != 'pk'){
    return {status:400,message:`${pk} is not a valid Primary Key`}
  }
  else if(sk != 'sk' && sk !='searchsub' && sk != 'searchcat'){
    return {status:400,message:`${sk} is not a valid Sort Key`}
  }

  let results = [];

  db.map((d) =>{
    if(d[sk].indexOf(beginsWith) >= 0){
      results.push(d);
    }
  })
  return results;

}

/**
 * @description - this functions searches the db.json with pk and sk
 * @param {string} pk - Atrribute name of primary key for search 
 * @param {string} sk  - atrribute name for sort key for search
 * @param {string} beginsWith - begins with text value for sort key so the algo can replicate beginwith() of dynamoDB
 * @param {Array} color - An array of colors to filter the results of
 */
exports.searchWithFilter= (pk,sk,beginsWith,colors) =>{
  if(!pk){
    return {status:400,message:'Primary key is essential for searching data'}
  }
  else if(!sk){
    return {status:400,message:'Sort key is essential for searching data'}
  }
  else if(!beginsWith){
    return {status:400,message:'Sort key beginswith value is essential for searching data'}
  }
  else if(!colors.length){
    return {status:400,message:"Use SearchWithoutFilter() function if there's nothing to filter"}
  }
  else if(pk != 'pk'){
    return {status:400,message:`${pk} is not a valid Primary Key`}
  }
  else if(sk != 'sk' && sk !='searchsub' && sk != 'searchcat'){
    return {status:400,message:`${sk} is not a valid Sort Key`}
  }

  let results = [];
  
  db.map((d) =>{
    if(d[sk].indexOf(beginsWith) >= 0){
      for(let i=0;i<colors.length;i++){
        if(d.colors.indexOf(colors[i]) >= 0){
          results.push(d);
          break;
        }
      }
      
    }
  })
  return results;

}