import React from "react";




import "../preview.css";
 



function Previeww(props) {
 
  const [data, setData] = React.useState(null);
 

  

  return (
    

      <div onClick={()=>{
          props.dataPress(props.songs);
      }} style={{width:'100%'}} className="preview">
      <div style={{position:'relative'}} >
      <div style={{position:'relative',height:350,display:'flex',width:'100%',backgroundColor:'lightgray',justifyContent:'center'}} >
      {
        //<i style={{fontSize:50,position:'absolute',top:'50%',left:'50%',zIndex:50}} class="fa fa-play"></i>
      }
      <i style={{fontSize:80,position:'absolute', color:'#007bff',top:'40%',zIndex:50}} class="fa fa-play-circle"></i>
          <img src={props.img} style={{height:350}} alt={props.title} />
          </div>
        
        {
          //<div className="previewRight">
          //<h3>{props.title }</h3>
         
          
        //</div>
        
        
        }
        </div>
      </div>
    )
}

export default Previeww;
