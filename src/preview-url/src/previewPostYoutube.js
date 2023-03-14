import React from "react";
import Axios from "axios";



import "../preview.css";

const APIURL = "https://mymiix.com:49856/URICheck";
const REGEX = new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$"
);

function Preview({ url,setDatta, loadingText, notFound }) {
 
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  React.useEffect(() => {
    url && url.match(REGEX) !== null && getData(url);
  }, []);

  const getData = async (url) => {
    setLoading(true);
    let response = await Axios(`${APIURL}?URL=${url}`, {
      method: "GET",
      
    });
    ///console.log(response.data[0])
    //if(setDatta != null){
      setDatta(response.data)
    //}
    
    
  };

  return null
}

export default Preview;
