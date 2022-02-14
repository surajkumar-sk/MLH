import { makeStyles } from "@material-ui/core";
import {  MenuItem, TextField } from "@material-ui/core";
import { useState, useLayoutEffect } from "react";
const categories = require('./categories.json')

const useStyles = makeStyles({
  main:{
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  selectCategories: {
    width: "45%",
  },
  marginTop: {
    marginTop: "3%",
  },
});
const CategoriesComponent = (props) =>{
  const classes = useStyles();
  const [subCategories,setSubCategories] = useState([]);
  let setValues = props.setValues;
  let values = props.values;
  const categoryChange = (e) =>{
    
    try {
      categories.categories.map((category) => {
        if(e.target.value == category.name){
          setValues({ ...values, category: e.target.value, subCategory: category.subCategories[0].name});
          setSubCategories(category.subCategories)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className={`${classes.main}`}>
      <TextField
        required
        onChange={(e) => {categoryChange(e)}}
        value={values.category}
        select
        label="Category"
        className={`${classes.selectCategories} ${classes.marginTop}`}
      >
        {categories.categories.map((category) => {
          return (
            <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
          )
        })}
      </TextField>
      <TextField
        required
        onChange={(e) => setValues({ ...values, subCategory: e.target.value})}
        value={values.subCategory}
        select
        label="Sub Category"
        className={`${classes.selectCategories} ${classes.marginTop}`}
      >   
          {subCategories.map((subcategory) =>{
            return <MenuItem key={subcategory.name} value={subcategory.name}>{subcategory.name}</MenuItem>
          })
        }
        {/*               <MenuItem value="Watch">Watch</MenuItem>
          */}{" "}
      </TextField>
    </div>
  )
}




export default CategoriesComponent;