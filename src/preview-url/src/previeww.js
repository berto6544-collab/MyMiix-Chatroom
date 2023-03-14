import React from "react";




import "../preview.css";



function Previeww(props) {
 
  const [data, setData] = React.useState(null);
 

  

  return (
    

      <div className="preview">
      <a href={props.url}>
       
          <img src={props.img} style={{height:350}} alt={props.title} />
        
        <div className="previewRight">
          <h3>{props.title && props.title.length > 150? props.title.slice(0, 150)
              : props.title}</h3>
         
          {<i>{props.url.length > 90 ? props.url.slice(0, 90) : props.url}</i>}
        </div>
        </a>
      </div>
    )
}

export default Previeww;
class Canvas extends React.Component {

  
  constructor(props) {
    super(props);
  this.state = {
    
  };
  this.refImage = React.createRef(); 


  }


 getFont() {
  var fontBase = 1000,                 
  fontSize = 40; 

    var ratio = fontSize / fontBase;   // calc ratio
    var size = this.refImage.current.width * ratio;   // get font size based on current width
    return (size|0) + 'px arial'; // set font
  }
  
componentDidMount(){

  
  let canvas =  this.refImage.current;
            const context = canvas.getContext('2d');
            
            const images = new Image();
            images.src = this.props.Image;
            
            images.onload = ()=>{
              canvas.width = images.width;
            canvas.height = images.height;
              context.font = this.getFont();
              context.drawImage(images,0,0,images.width,canvas.height)
              context.fillText('@'+this.props.ArtistName, 20,canvas.height - 20);
                context.fillText('mymiix.com', 20,20);
              
              
            }
            
            
            
            
            canvas.toDataURL('image/jpeg', 1.0)
}


  render() {
  return (
    <canvas ref={this.refImage} style={{width:'100%',height:'100%',position:'absolute',objectFit:'cover'}}></canvas>
  );
  }
}