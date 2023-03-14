import React from "react";
import Axios from "axios";



import "../previewLive.css";

const APIURL = "https://mymiix.com:49856/URICheck";
const REGEX = new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$"
);

function PreviewLive({ url, loadingText, notFound }) {
 
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
    setData(response.data[0]);
    setLoading(false);
  };

  return loading === false ? (
    data.status === 200 ? (

      <div className="preview">
      <a href={data.url}>
        {data.img ? (
          <img src={data.img} alt={data.title} />
        ) : (
          <div className="defaultImg"></div>
        )}
        <div className="previewRight">
          <h3>{data.title && data.title.length > 90? data.title.slice(0, 90)
              : data.title}</h3>
          <p>
            {data.desc && data.desc.length > 90
              ? data.desc.slice(0, 90)
              : data.desc}
          </p>
          {<i>{data.url.length > 90 ? data.url.slice(0, 90) : data.url}</i>}
        </div>
        </a>
      </div>
    ) : (
      <div className="preview">
      <a href={data.url}>
        {data.img ? (
          <img src={data.img} alt={data.title} />
        ) : (
          <div className="defaultImg"></div>
        )}
        <div className="previewRight">
        <h3>{data.title && data.title.length > 150? data.title.slice(0, 150)
              : data.title}</h3>
          
          {<i>{data.url.length > 90 ? data.url.slice(0, 90) : data.url}</i>}
        </div>
        </a>
      </div>
    )
  ) : null;
}

export default PreviewLive;

