import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";
import CroppingDisplay from "./CroppingDisplay";
import {palette} from "./ColorPalette";
import ColorPicker from "./ColorPicker";
import CategoriesComponent from "./CategoriesComponent";
const useStyles = makeStyles({
  root: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    "@media (max-width:500px)": {
      flexDirection: "column",
    },
  },
  deleteConformation: {
    display: (props) => (props.deleteD ? "block" : "none"),
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    flexDirection: "column",
    width: "40%",
    "@media (max-width:500px)": {
      width: "100%",
    },
    height: "fit-content",
    zIndex: "6",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    alignItems: "center",
    "& p": {
      textAlign: "center",
    },
  },
  deleteButtons: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    "& button": {
      paddingLeft: "4%",
      paddingRight: "4%",
      backgroundColor: "#ffffff",
    },
  },
  background: {
    display: (props) => (props.deleteD ? "block" : "none"),
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#999999",
    opacity: "50%",
    zIndex: "5",
  },

  defaultCropperContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "40%",
    "@media (max-width:500px)": {
      width: "90%",
      left: "50%",
      transform: "translateX(-50%)",
    },
    padding: "5%",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #999999",
    "& h4": {
      color: "#999999",
    },
  },
  defaultImgCOntainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      width: "100%",
    },
  },
  croppingDisplay: {
    position: "relative",
    top: 0,
    left: 0,
    height: "100%",
    overflow: "hidden",
    width: "40%",
    marginRight: "5%",
  },
  uploadInfoContainer: {
    position: "relative",
    top: 0,
    left: 0,
    height: "100%",
    width: "50%",
    "@media (max-width:500px)": {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  //styles for image display in the form side
  uploadInfoOrganize: {
    position: "relative",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    "@media (max-width:500px)": {
      width: "100%",
      flexDirection: "column-reverse",
    },
    justifyContent: "flex-start",
  },
  imgContainer: {
    position: "relative",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "60%",
    "@media (max-width:500px)": {
      width: "100%",
    },
    height: "fit-content",
    // "&:after":{
    //   display:'block',
    //   content:'" "',
    //   width:'100%',
    //   paddingTop:'100%'
    // }
  },
  imgsContainer: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    "@media (max-width:500px)": {
      flexDirection: "column",
      width: "100%",
    },
    justifyContent: "space-between",
  },
  subImages: {
    position: "relative",
    top: 0,
    left: 0,
    width: "30%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    "@media (max-width:500px)": {
      flexDirection: "row",
      width: "100%",
    },
    alignItems: "center",
    justifyContent: "space-around",
    border: 0,
    "& img": {
      width: "70%",
      padding: "5%",
      "@media (max-width:500px)": {
        width: "25%",
        padding: "3%",
      },
      height: "auto",
      "&:focus": {
        border: "1px solid black",
      },
      "&:hover": {
        border: "1px solid black",
      },
    },
  },
  mainImage: {
    position: "relative",
    top: 0,
    left: "50%",
    paddingTop: "10%",
    transform: "translateX(-50%) ",
    width: "70%",
    height: "fit-content",
    "& img": {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "auto",
    },
  },

  // upload and edit button style starts here
  buttonGroup: {
    position: "relative",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    marginTop: "1%",
    marginBottom: "1%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: "fit-content",
  },
  button: {
    position: "relative",
    top: 0,
    width: "fit-content",
    height: "fit-content",
    border: "1px solid black",
    padding: "2%",
    margin: "1%",
    "& input": {
      display: "none",
    },
  },
  input: {
    position: "relative",
    width: "80%",
    marginTop: "1%",
    height:50,
    '& div':{
      height:'100%',
      paddingTop:'12px'
    }
  },
  inputB: {
    position: "relative",
    width: "80%",
    marginTop: "1%",
    height:100,
    '& div':{
      height:'100%',
      paddingTop:'12px'
    }
  },
  inputC: {
    position: "relative",
    width: "80%",
    marginTop: "1%",
  },
  headings: {
    position: "relative",
    width: "fit-content",
    left: "50%",
    transform: "translateX(-50%)",
    marginTop: "3%",
  },
  marginTop: {
    marginTop: "3%",
  },
  saveButton: {
    position: "relative",
    marginTop: "3%",
    width: "30%",
    padding:'2%',
    backgroundColor:'#343434',
    color:'#ffffff',
    border:'none'
  },

  smallImagesContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
    marginTop: "2%",
  },
  smallImages: {
    width: "100%",
  },

  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  twoInputs: {
    width: "45%",
    height:50,
    '& div':{
      height:'100%'
    }
  },
  selectCategories: {
    width: "45%",
  },
  choosePhotos: {
    width: "50%",
  },
  choosingContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  selectedColor:{
    marginBottom:"30px",
    border:"1px solid",
    margin:"10px",
    width: "30px", 
    height: "30px", 
    borderRadius:"20px"
  }
});

const UploadInfoComponent = () => {

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 300,
    useWebWorker: true,
  };
  const [values, setValues] = useState({
    productName: "",
    price: "",
    mrp: "",
    productDescription: "",
    productFeatures: "",
    category: "",
    subCategory: "",
    selectedFile: "",
    file: [],
    stock: [] 
  });

  let colorValue = '';

  const [cropperDisplay, setCropperDisplay] = useState(true);
  const [deleteD, setDeleteD] = useState(false);

  const classes = useStyles({ cropperDisplay, deleteD });

  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState({ src: "", index: "" });
  const [croppedImages, setCroppedImages] = useState([]);
  const [currentcroppedImage, setCurrentCroppedImage] = useState({
    src: croppedImages[0] ? croppedImages[0] : "",
    index: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState("");


  useEffect(() => {
    let tempCroppedImages = [...croppedImages];
    if (currentcroppedImage.src) {
      if (currentImageIndex >= 0 && tempCroppedImages[currentImageIndex]) {
        tempCroppedImages[currentImageIndex] = currentcroppedImage.src;
      } else if (currentImageIndex >= 0) {
        tempCroppedImages.push(currentcroppedImage.src);
      }
    }
    setCroppedImages(tempCroppedImages);
    /*  console.log(currentImageIndex); */
  }, [currentcroppedImage]);



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    values.file = croppedImages;
    if (values.file.length === 0) {
      Swal.fire({
        icon: "error",
        text: "Please select a file...",
      });
    } else if (values.file.length > 4) {
      Swal.fire({
        icon: "error",
        text: "You can select upto 4 files only...",
      });
    } else if (values.mrp < values.price) {
      Swal.fire({
        icon: "error",
        text: "You Price Should be less than MRP",
      });
    } else if (
      !values.productName ||
      !values.price ||
      !values.mrp ||
      !values.productDescription ||
      !values.productFeatures ||
      !values.category ||
      !values.subCategory
    ) {
      Swal.fire({
        icon: "error",
        text: "Please enter all the values",
      });
    } else {
      const Http = new XMLHttpRequest();
      const url='http://localhost:8000/upload';
      Http.open("POST", url);
      Http.setRequestHeader('Content-type', 'application/json');

      Http.send(JSON.stringify(values));
      Http.onreadystatechange = function () {
        if(this.readyState==4 && this.status==200){
          Swal.fire({
            icon:"success",
            text:Http.responseText
          });
        }
      }
    }
  };


  const handleFileUPload = async (e) => {
    var imagesArr = [...images];
    if(e.target.files[0]){
      const compressedFile = await imageCompression(e.target.files[0], options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = async () => {
        await imagesArr.push(reader.result);
        await setImages(imagesArr);
        setCurrentImageIndex(imagesArr.length - 1);
        setCurrentImage({ src: imagesArr[imagesArr.length - 1], index: imagesArr.length - 1 });
        setCropperDisplay(false);
      };
    }
  };


  const handleImageClick = (e, index) => {
    /*  console.log(images, croppedImages); */
    setCurrentImageIndex(index);
    setCropperDisplay(true);
    // setCurrentImage({src:images[index],index:index});
    setCurrentCroppedImage({ src: croppedImages[index], index: index });
  };
  const handleEditButton = () => {
    setCropperDisplay(false);
    setCurrentImage({ src: images[currentImageIndex], index: currentImageIndex });
  };
  const handleDeleteButton = () => {
    setDeleteD(true);
  };
  const handleDeleteYButton = () => {
    setDeleteD(false);
    if (images.length && croppedImages.length) {
      setCropperDisplay(true);
      setCroppedImages(croppedImages.filter((item, index) => index != currentImageIndex));
      setImages(images.filter((item, index) => index != currentImageIndex));
      setCurrentImage({ src: "", index: "" });
      setCurrentImageIndex("");
      setCurrentCroppedImage({ src: "", index: "" });
    }
  };
  const handleDeleteNButton = () => {
    setDeleteD(false);
  };

  let tempStock = values.stock;
  let obj = {
    color : '',
    quantity: ''
  };
  let found;
  const addQuantity = (e, item) =>{
    obj = {
      color : item,
      quantity : e.target.value
    }
    found = tempStock.some((itm) => itm.color.toString().toUpperCase() === item.toString().toUpperCase())
    if(found){
      tempStock.forEach((itm) => {
        if(itm.color.toString().toUpperCase() === item.toString().toUpperCase()){
          itm.quantity = e.target.value
        }
      })
    }
    setValues((values)=>({...values, stock: tempStock}))
  }

  return (
    <div className={classes.root}>
      <div className={classes.background}></div>
      <div className={classes.deleteConformation}>
        <p> Are you sure you want to delete the image </p>
        <div className={classes.deleteButtons}>
          <button onClick={handleDeleteYButton} className={classes.button}>
            Yes
          </button>
          <button onClick={handleDeleteNButton} className={classes.button}>
            No
          </button>
        </div>
      </div>
      {cropperDisplay ? (
        <div className={classes.defaultCropperContainer}>
          <h4>Crop Section</h4>
          <div className={classes.defaultImgCOntainer}>
            <img src="default_img.svg" alt="default IMage Icon" />
          </div>
        </div>
      ) : (
        <CroppingDisplay
          cropperDisplay={cropperDisplay}
          currentImageIndex={currentImageIndex}
          setCurrentCroppedImage={setCurrentCroppedImage}
          image={currentImage.src}
          className={classes.croppingDisplay}
        />
      )}
      <div className={classes.uploadInfoContainer}>
        <div className={classes.uploadInfoOrganize}>
          <div className={classes.imgContainer}>
            <div className={classes.imgsContainer}>
              <div className={classes.subImages}>
                {croppedImages.length == 0 ? (
                  <div className={classes.defaultImgList}>
                    <img src="default_min_img.svg" alt="default IMage Icon" />
                    <img src="default_min_img.svg" alt="default IMage Icon" />
                    <img src="default_min_img.svg" alt="default IMage Icon" />
                    <img src="default_min_img.svg" alt="default IMage Icon" />
                  </div>
                ) : (
                  croppedImages.map((img, index) => (
                    <img key={index} src={img} onClick={(e) => handleImageClick(e, index)} />
                  ))
                )}
              </div>
              <div className={classes.mainImage}>
                {!currentcroppedImage.src ? (
                  <div style={{ width: "100%" }} className={classes.defaultImgCOntainer}>
                    <img src="default_img.svg" alt="default IMage Icon" />
                  </div>
                ) : (
                  <img src={currentcroppedImage.src} />
                )}
              </div>
            </div>
          </div>
          <div className={classes.buttonGroup}>
            <label className={classes.button}>
              <input
                type="file"
                onChange={(e) =>
                  images.length <= 3
                    ? handleFileUPload(e)
                    : Swal.fire({ icon: "error", text: "You can select upto 4 files only..." })
                }
              />
              Add an image
            </label>
            <label className={classes.button}>
              <input type="button" onClick={() => handleDeleteButton()} />
              Delete image
            </label>
            <label className={classes.button}>
              <input type="button" onClick={() => handleEditButton()} />
              Edit image
            </label>
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <TextField
            required
            className={classes.input}
            variant="filled"
            fullWidth
            label="Product Name"
            onChange={(e) => setValues({ ...values, productName: e.target.value })}
          />
          <Typography className={classes.headings} variant="h6">
            Pricing
          </Typography>
          <div className={classes.inputContainer}>
            <TextField
              required
              className={`${classes.marginTop} ${classes.twoInputs}`}
              variant="filled"
              type="number"
              label="Your Price"
              onChange={(e) => setValues({ ...values, price: e.target.value })}
            />
            <TextField
              required
              className={`${classes.marginTop} ${classes.twoInputs}`}
              variant="filled"
              type="number"
              label="MRP of the Product"
              onChange={(e) => setValues({ ...values, mrp: e.target.value })}
            />
          </div>
          <Typography className={classes.headings} variant="h6">
            Product Information
          </Typography>
          <TextField
            required
            className={classes.inputB}
            label="Product Description"
            multiline
            fullWidth
            rows={4}
            variant="filled"
            onChange={(e) => setValues({ ...values, productDescription: e.target.value })}
          />
          <TextField
            required
            label="Product Features"
            multiline
            className={classes.inputB}
            fullWidth
            rows={3}
            variant="filled"
            onChange={(e) => setValues({ ...values, productFeatures: e.target.value })}
          />
          <Typography className={classes.headings} variant="h6">
            Available Colors
          </Typography>
          <div style={{justifyContent:"center"}}>
            <div className={classes.inputC} style={{marginTop:"10px",marginBottom:"10px"}}>
              <ColorPicker val={values} setVal={setValues}/>
            </div> 
            <div className={classes.inputC} style={{display:"flex",flexDirection:"column" ,flexWrap:"wrap"}}> 
              { 
                values.stock.map((item)=>{     
                  palette.filter((itm) => {
                    if(itm.name === item.color){
                        colorValue = itm.color;
                    }
                  })
                  return (
                    <div key={item.color} style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                      <div className={classes.selectedColor} style={{backgroundColor: colorValue}}>
                      </div>
                      <TextField 
                      required 
                      className={classes.inputC} 
                      style={{width:"75px", height:"5px"}} 
                      label="Quantity"
                      onChange={(e) => {
                        addQuantity(e, item.color);
                        }}
                      />
                    </div>                    
                  )  
                })
              }
            </div>
          </div>
          <div className={classes.choosingContainer}>
            <CategoriesComponent values={values} setValues={setValues}/>
          </div>

          <Button
            type="submit"
            className={`${classes.marginTop} ${classes.saveButton}`}
            variant="secondary"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadInfoComponent;
