import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card } from "../components/UploadSearch/ProductCard";

const useStyles = makeStyles({

  main:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  form:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    '@media (max-width:500px)':{
      flexDirection:'column',
    },
    '& input':{
      position:'relative',
      top:0,
      left:0,
      width:'70%',
      padding:'1%',
      border:'1px solid #48cacd',
      borderRadius:'5px',
      '@media (max-width:500px)':{
        width:'80%'
      }
    },
    '& button':{
      position:'relative',
      top:0,
      left:0,
      width:'10%',
      padding:'1%',
      border:'none',
      marginLeft:'10px',
      borderRadius:'5px',
      color:'#ffffff',
      backgroundColor:'#0bb5cb',
      '@media (max-width:500px)':{
        marginLeft:'0px',
        marginTop:'10px',
        width:'50%',
      }
    }
  },
  msg:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    height:300,
    display:(props) => ((props.msg) ? 'flex' : 'none'),
    justifyContent:'center',
    alignItems:'center',
    fontSize:'2rem'
  },
  cardDiv:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    display:'grid',
    marginLeft:'2.5%',
    gridTemplateColumns:'22.5% 22.5% 22.5% 22.5%',
    gridGap:'2.5%',
    '@media (max-width:1082px)':{
      marginLeft:'5%',
      gridTemplateColumns:'30% 30% 30%'
    },
    '@media (max-width:682px)':{
      marginLeft:'7.5%',
      gridTemplateColumns:'45% 45%'
    },
    '@media (max-width:420px)':{
      marginLeft:'10%',
      gridTemplateColumns:'90%'
    }
    
  },
  recommendation:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    '& p':{
      position:'relative',
      top:0,
      left:0,
      width:"100px",
      border:'1px solid #252525',
      borderRadius:'10px',
      margin:'1%',
      cursor:'pointer',
      '@media (max-width:775px)':{
        fontSize:'0.8rem'
      }
    },
    '@media (max-width:560px)':{
      flexDirection:'column'
    }
  }


})

export function ProductSearch(){
  let [data,setData] =useState([]);
  const [msg,setMsg] = useState('');
  const [searchValue,setSearchValue] = useState('')

  const classes = useStyles({msg});
  function handleSearch(event){
    event.preventDefault();
    setMsg('Loading....')
    const Http = new XMLHttpRequest();
    const url='http://localhost:8000/search';
    Http.open("POST", url);
    Http.setRequestHeader('Content-type', 'application/json');
    Http.send(JSON.stringify({query:event.target.query.value}));
    Http.onreadystatechange = function(){
      if(this.readyState==4 && this.status==200){
        let tempData = JSON.parse(this.response)
        setData(tempData);
        
        if(!tempData.length){
          setMsg('No Products Found');
        } else{
          setMsg('')
        }
      }
    }
  }
  function handleClickSearch(e){
    setMsg('Loading....')
    setSearchValue(e.target.innerHTML)
    const Http = new XMLHttpRequest();
    const url='http://localhost:8000/search';
    Http.open("POST", url);
    Http.setRequestHeader('Content-type', 'application/json');
    Http.send(JSON.stringify({query:e.target.innerHTML}));
    Http.onreadystatechange = function(){
      if(this.readyState==4 && this.status==200){
        let tempData = JSON.parse(this.response)
        setData(tempData);
        
        if(!tempData.length){
          setMsg('No Products Found');
        } else{
          setMsg('')
        }
      }
    }
  }
  
  return(
    <div className={classes.main}>
      <p>I have added sample data so feel free to search or click on text below</p>
      <form className={classes.form} onSubmit={(event)=>{handleSearch(event)}}>
        <input name="query" type='text' value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        <button type="submit">Search</button>
      </form>
      
      <div className={classes.recommendation}>
        <p>Search for : </p>
        <p onClick={(event)=>{handleClickSearch(event)}}>Men</p>
        <p onClick={(event)=>{handleClickSearch(event)}}>Women</p>
        <p onClick={(event)=>{handleClickSearch(event)}}>Men Shoes</p>
        <p onClick={(event)=>{handleClickSearch(event)}}>Women Skirt</p>
        <p onClick={(event)=>{handleClickSearch(event)}}>Shoes</p>
        <p onClick={(event)=>{handleClickSearch(event)}}>Black</p>
      </div>
      <div id="msg-div" className={classes.msg}>
        <p id="msg">{msg}</p>
      </div>
      
      <div className={classes.cardDiv}>
        {data.map((d)=>{
          return <Card key={`${d.pk}${d.sk}`} data={d}/>
        })}
      </div>
      
    </div>
  )
}