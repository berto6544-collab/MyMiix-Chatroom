import React from "react";
import Axios from "axios";
import '../../components/RelatedFeed.css';


import "../preview.css";

const APIURL = "https://mymiix.com:49856/URICheck";
const REGEX = new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$"
);

function Preview({ url,dataUrl,type, loadingText, notFound }) {
 
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  React.useEffect(() => {
    url && url.match(REGEX) !== null && getData(url);
  }, []);


  
  const getData = async (url) => {
    setLoading(true);


    if(dataUrl.length > 0){
      setData(dataUrl[0]);
      setLoading(false);


      }else{
    let response = await Axios(`${APIURL}?URL=${url}`, {
      method: "GET",
      
    });
    ///console.log(response.data[0])
    
    setData(response.data[0]);
    setLoading(false);
  }
  };

  return loading === false ?( 
    data.status === 200 ?( 

      
        data.img ?(
           <div className="images">
            {type == "youtube" ? <i style={{position:'absolute',color:'red',justifyContent:'center',top:'30%',left:'42%'}} className="fa fa-youtube fontSizes"></i>: type == "spotify"? <i style={{position:'absolute',color:'green',justifyContent:'center',top:'30%',left:'42%'}} className="fa fa-spotify fontSizes"></i>: type == "soundcloud"? <i style={{position:'absolute',color:'orange',justifyContent:'center',top:'30%',left:'42%'}} className="fa fa-soundcloud fontSizes"></i>: type == "twitch"?<i style={{position:'absolute',color:'purple',justifyContent:'center',top:'30%',left:'42%'}} className="fa fa-twitch fontSizes"></i> :null}
          <img   src={data.img} alt={data.title} />
          </div>
          ) :(<div className="defaultImg images"></div>))

        :(<div  className="defaultImg images"></div>))
        
        :(<div className="defaultImg images"></div>)
    
        
        }
   


export default Preview;
