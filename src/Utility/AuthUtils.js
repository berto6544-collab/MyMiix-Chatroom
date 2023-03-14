let userType = null;
let container = null;
let postContainer =null;
let userId = null;
let roomName = null;
let tokenId = null;
let postData = [];
let songData = [];
let timeOutMessages = [];
let Login = "Login";
let accountPayment = "";

let themeMode = 'light';



const isNullOrUndefined = value => {
  return value === null || value === undefined;
};

const getContainer = () => {
  return container;
};

const setContainer = con => {
  container = con;
};
const getPostContainer = () => {
  return postContainer;
};

const setPostContainer = con => {
  postContainer = con;
};

const setUserType = type => {
  userType = type;
};

const getUserType = () => {
  return userType;
};

const setAccountPayment = type => {
  accountPayment = type;
};

const getAccountPayment = () => {
  return accountPayment;
};

const setUserId = id => {
  userId = id;
};

const getUserId = () => {
  return userId;
};

const setSong = id => {
  songData = id;
};

const getSong = () => {
  return songData;
};

const setLogin = id => {
  Login = id;
};

const getLogin= () => {
  return Login;
};

const setPostData = id => {
  postData = id;
};

const getPostData = () => {
  return postData;
};

const setToken = id => {
  tokenId = id;
};

const getToken = () => {
  return tokenId;
};

const setThemeMode = type => {
  themeMode = type;
};



const getThemeMode = () => {

  
  
  return themeMode;
};

const setRoomName = name => {
  roomName = name;
};

const getRoomName = () => {
  return roomName;
};






const fetchData = () =>  {

fetch('https://mymiix.com/public/api/autth',{
  method:'GET',
   header:{
     'Accept': 'application/json',
     'Content-type': 'application/json'
   }
   
  })
    .then((response) => response.json())
    .then((responseJson)=> {
  
      
      
      setToken(responseJson[0].SCOM);
      setUserId(responseJson[0].ID);
      
  
    }).catch((error) =>{
      
    });


}


const Utils = {
  isNullOrUndefined,
  getUserType,
  setUserType,
  setPostData,
  getPostData,
  getContainer,
  setContainer,
  getUserId,
  setUserId,
  setToken,
  getToken,
  setThemeMode,
  getThemeMode,
  getRoomName,
  setRoomName,
  fetchData,
  setLogin,
  getLogin,
  setPostContainer,
  getPostContainer,
  setAccountPayment,
  getAccountPayment,
  setSong,
  getSong
  
};

export default Utils;

