import { useState } from 'react'
import { CompactPicker} from 'react-color'; 
import { Button as NB, ButtonGroup} from "@material-ui/core";
import {palette} from "./ColorPalette";

function ColorPicker(props){
    const[color,setColor] = useState([]);
    let tempStock = props.val.stock;
    function addColor(col){
      palette.forEach((itm) => {
        if (itm.color.toUpperCase() === col.toString().toUpperCase()) {
          let found = tempStock.some(data => data.color === itm.name);
          if (!found) {
            let tempStock = props.val.stock;
            tempStock.push({color:itm.name,quantity:0});
            props.setVal({ ...props.val, stock: tempStock});
          }
        }
      })      
    }
    function removeColor(col){
      palette.filter((itm) => {
        if(itm.color.toUpperCase() === col.toString().toUpperCase()){
          let found = tempStock.some(data => data.color === itm.name);
          if(found){
              tempStock = tempStock.filter(d => d.color !== itm.name);
              props.setVal({ ...props.val, stock: tempStock })
          }
        }
      })
    }
    return(
        <div style={{marginTop:"10px",marginBottom:"10px"}}>
            <CompactPicker 
            color={color}
            onChangeComplete={(color)=>{setColor(color.hex)}}
            />
            <ButtonGroup size="small" variant="outlined" aria-label="outlined button group" orientation="horizontal">
                <NB onClick={()=>{if(color){addColor(color)}}}> + </NB>
                <NB onClick={()=>{if(color){removeColor(color)}}}> - </NB>
            </ButtonGroup>
        </div>
    )
}

export default ColorPicker;