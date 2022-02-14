const { json } = require('body-parser');
const terms = require('./search.json');

module.exports.searchAPI = (query) =>{
  let temp='';
  let test = query;
  //add a space at the end and start of the search test for recognising size value accurately
  test = " " + test + " ";
  test = test.toLowerCase();
  let searchTerms={
    category:"",
    subCategory:{category:"",subcategory:''},
    color:[],
    size:[],
  }
  // there could be many subcategories related to a single term, in that case we will choose the one with longest length
  //  because that term will be the most acurate one.
  let sub_categories_temp=[]

  for(let i=0;i<terms.colors.length;i++){
    let has_color = test.indexOf(terms.colors[i].toLowerCase())
    if(has_color != -1){
      searchTerms.color.push(terms.colors[i].toLowerCase())
    }
  }
  for(let i=0;i<terms.size.length;i++){
    let has_size = test.indexOf(` ${terms.size[i].toLowerCase()} `)
    if(has_size != -1){
      searchTerms.size.push(terms.size[i].toLowerCase())
    }
  }
  for(let i=0;i<terms.categories.length;i++){
    let has_category = test.indexOf(terms.categories[i].name.toLowerCase())
    if(has_category != -1){
      searchTerms.category = terms.categories[i].name.toLowerCase()
    }
    for(let j=0;j<terms.categories[i].subCategories.length;j++){
      let has_subcategory = test.indexOf(terms.categories[i].subCategories[j].name.toLowerCase());
      if(has_subcategory != -1){
        sub_categories_temp.push({category:terms.categories[i].name.toLowerCase() , subCategory:terms.categories[i].subCategories[j].name.toLowerCase()});
      }
    }
  }

  temp = {category:"",subCategory:""};
  let subCategories = [];
  if(sub_categories_temp.length){
    sub_categories_temp.map((a) =>{
      if(subCategories.length){
        subCategories.map(s =>{
          if(s.category != a.category){
            subCategories.push(a);
          }
        })
      } else{
        subCategories.push(a);
      }
      if(a.subCategory.length > temp.subCategory.length){
        temp = a;
      }
    });
    searchTerms.subCategory = temp
  }
  
  //adding colors with all the prefix like dark green or light green for green color search
  searchTerms.color.map((color) => {
    let has_color = -1;
    terms.colors.map((color1) =>{
      has_color = (color1.toLowerCase()).indexOf(color.toLowerCase());
      if(has_color != -1){
        searchTerms.color.push(color1.toLowerCase())
      }
    })
  })


  let searchTexts = '';
  let onlyCategory = false;
  let searchTextsArray=[]
  if(searchTerms.category && searchTerms.subCategory.subCategory){
    searchTexts= `#${searchTerms.category.replaceAll(" ","_")}#${searchTerms.subCategory.subCategory.replaceAll(" ","_")}`
  } else if(searchTerms.category && !searchTerms.subCategory.subCategory){
    onlyCategory = true;
    searchTexts = `#${searchTerms.category.replaceAll(" ","_")}`;    
  } else if(!searchTerms.category && searchTerms.subCategory.subCategory){
    if(subCategories.length <=1){
      searchTexts = `#${searchTerms.subCategory.category.replaceAll(" ","_")}#${searchTerms.subCategory.subCategory.replaceAll(" ","_")}`;
    } else{
      subCategories.map(s =>{
        searchTextsArray.push(`#${s.category.replaceAll(" ","_")}#${s.subCategory.replaceAll(" ","_")}`)
      })
    }
  } 
  return {searchText:searchTexts,searchTextsArray:searchTextsArray, color:searchTerms.color, size:searchTerms.size, onlyCategory:onlyCategory};
}


// this method for getting recommendation on search type needs a bit of more improvement 
// module.exports.searchAsYouTypeAPI = (req,res,next) => {
   
//   let temp='';
//   let test = req.query.q;
//   //add a space at the end and start of the search test for recognising size value accurately
//   test = " " + test + " ";
//   test = test.toLowerCase();
//   let searchTerms={
//     category:"",
//     subCategory:{category:"",subcategory:''},
//     color:[],
//     size:[],
//     color_true:false,
//     size_true:false,
//   }
//   // there could be many subcategories related to a single term, in that case we will choose the one with longest length
//   //  because that term will be the most acurate one.
//   let sub_categories_temp=[]

//   for(let i=0;i<terms.colors.length;i++){
//     let has_color = test.indexOf(terms.colors[i].toLowerCase())
//     if(has_color != -1){
//       searchTerms.color.push(terms.colors[i].toLowerCase())
//       searchTerms.color_true = true
//     }
//   }
//   for(let i=0;i<terms.size.length;i++){
//     let has_size = test.indexOf(` ${terms.size[i].toLowerCase()} `)
//     if(has_size != -1){
//       searchTerms.size.push(terms.size[i].toLowerCase())
//       searchTerms.size_true = true
//     }
//   }
//   for(let i=0;i<terms.categories.length;i++){
//     let has_category = test.indexOf(terms.categories[i].name.toLowerCase())
//     if(has_category != -1){
//       searchTerms.category = terms.categories[i].name.toLowerCase()
//       searchTerms.color_true = terms.categories[i].color
//       searchTerms.size_true = terms.categories[i].size
//     }
//     for(let j=0;j<terms.categories[i].subCategories.length;j++){
//       let has_subcategory = test.indexOf(terms.categories[i].subCategories[j].name.toLowerCase());
//       if(has_subcategory != -1){
//         sub_categories_temp.push({category:terms.categories[i].name.toLowerCase() , subCategory:terms.categories[i].subCategories[j].name.toLowerCase()});
//         searchTerms.color_true = terms.categories[i].color
//         searchTerms.size_true = terms.categories[i].size
//       }
//     }
//   }

//   temp = {category:"",subCategory:""};
  
//   if(sub_categories_temp.length){
//     sub_categories_temp.map((a) =>{
//       if(a.subCategory.length > temp.subCategory.length){
//         temp = a;
//       }
//     });
//     searchTerms.subCategory = temp
//   }

//   let texts = []
//   let combi =[]
//   let loop = 0
//   for(let i=0;i<6;i++){
//     if(loop>15){
//       break
//     }
//     let category_ran = !searchTerms.category ? Math.floor(Math.random() * ((terms.categories.length) - 0) ) + 0 : NaN
//     let subCategory_ran = !searchTerms.subCategory && category_ran ? Math.floor(Math.random() * (terms.categories[category_ran].subCategories.length - 0)) + 0 : NaN
//     let allSubcategory_ran = !searchTerms.subCategory && !category_ran ? Math.floor(Math.random() * (terms.allSubCategories.length - 0)) + 0 : NaN
    
//     let color_ran = !searchTerms.color.length ? Math.floor(Math.random() * ((terms.colors.length) - 0) ) + 0 : NaN
//     let size_ran = !searchTerms.size.length ? Math.floor(Math.random() * ((terms.size.length) - 0) ) + 0 : NaN

//     let search_recommended = '';
    
//     if(combi.indexOf(`${category_ran}${subCategory_ran}${color_ran}${size_ran}`) != -1){
   
//       i=i-1;
//       loop = loop+1;
//       continue
//     }
//     combi.push(`${category_ran}${subCategory_ran}${color_ran}${size_ran}`);

//     if(searchTerms.color_true && searchTerms.size_true){
//       search_recommended = test 
//                                 + `${subCategory_ran ? terms.categories[category_ran].subCategories[subCategory_ran].name+ ' ' : ''}` 
//                                 + `${allSubcategory_ran ? terms.allSubCategories[allSubcategory_ran].name+ ' ' : ''}` 
//                                 + `${size_ran ? terms.size[size_ran]+" " : ''}`
//                                 + `${color_ran ? terms.colors[color_ran]+" " : ''}`
//     } 
//     else if(!searchTerms.color_true && searchTerms.size_true){
//       search_recommended = test 
//                                 + `${subCategory_ran ? terms.categories[category_ran].subCategories[subCategory_ran].name+ ' ' : ''}` 
//                                 + `${allSubcategory_ran ? terms.allSubCategories[allSubcategory_ran].name+ ' ' : ''}` 
//                                 + `${size_ran ? terms.size[size_ran]+" " : ''}`
//     }
//     else if(searchTerms.color_true && !searchTerms.size_true){
//       search_recommended = test
//                                 + `${subCategory_ran ? terms.categories[category_ran].subCategories[subCategory_ran].name+ ' ' : ''}` 
//                                 + `${allSubcategory_ran ? terms.allSubCategories[allSubcategory_ran].name+ ' ' : ''}` 
//                                 + `${color_ran ? terms.colors[color_ran]+" " : ''}`
//     }
//     else if(!searchTerms.color_true && !searchTerms.size_true){
//       search_recommended = test
//                                 + `${subCategory_ran ? terms.categories[category_ran].subCategories[subCategory_ran].name+ ' ' : ''}` 
//                                 + `${allSubcategory_ran ? terms.allSubCategories[allSubcategory_ran].name+ ' ' : ''}` 
//     }
//     if(texts == test){
//       texts.push(search_recommended)
//     }
    

//   }

//   res.send(texts)



// }