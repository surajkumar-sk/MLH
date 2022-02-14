import { makeStyles } from "@material-ui/styles";
import UploadInfoComponent from "../components/UploadProductPage/UploadInfo";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root :{
    position:"absolute",
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    overflow:'scroll'
  },
  mainContainer: {
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    height:'fit-content',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "4%",

  },
  marginTop: {
    marginTop: 80,
    "@media (max-width:660px)":{
      marginTop: 140,
    },
    paddingBottom:20,
    textAlign: "center",
    "@media (max-width:500px)":{
      fontSize:'1.5rem'
    }
  },
  searchBtn:{
    position:'fixed',
    top:'100%',
    left:'2%',
    width:50,
    height:50,
    padding:0,
    margin:0,
    border:'none',
    transform:'translateY(-70px)',
    backgroundColor:'#96e4f5',
    borderRadius:'50%',
    zIndex:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    '& img':{
      position:'relative',
      top:0,
      left:0,
      width:'60%',
      height:'60%'

    }
  }
});
//Hello
const ProductUpload = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p>I have added Sample data so feel free to search but also try out uploading a product</p>
      <a href="/search" className={classes.searchBtn}><img src="./search.png" alt="search_button"/></a>
      <Typography variant="h4" className={classes.marginTop}>
        Upload Your Product
      </Typography>
      <div className={classes.mainContainer}>
        {/* <ImageUploadComponent /> */}
        <UploadInfoComponent className={classes.uploadInfo} />
      </div>
    </div>
  );
};

export default ProductUpload;
