import React from "react";




import "../previewMusic.css";
 



function Previeww(props) {
 
  const [data, setData] = React.useState(null);
 

  

  return (
    

      <div onClick={()=>{
        if(props.songs.length > 0 ){ props.dataPress(props.songs);
        }else {

if(props.dataVideo != ""){
  props.dataPress(props.dataVideo)

}
        }



      }}  className="preview">
      <div style={{position:'relative'}} >
      <div className={'previewImage'} style={{position:'relative',display:'flex',width:'100%',justifyContent:'center'}} >
      {
        //<i style={{fontSize:50,position:'absolute',top:'50%',left:'50%',zIndex:50}} class="fa fa-play"></i>
      }
      {props.songs.length > 0 || props.dataVideo != "" ?<i style={{fontSize:80,position:'absolute', color:'#007bff',top:'40%',zIndex:50}} class="fa fa-play-circle"></i>:[]}
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
