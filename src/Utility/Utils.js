
let userType = null;
let container = null;
let postContainer  = null;
let userId = null;
let roomName = null;
let userName = null;
let counterViewer = 0;
let userProfile = '';
let streamKey = null;
let OtherUserId = null;
let timeOutMessages = [];
let usersNameId = null;
let myStreamKey = null;
let streameruserId = null;
let userTypeStream = null;
let pushToken = null;
let remoteStream = {toURL: () => null};
let themeMode = 'dark';
let socketActive = false;
let planType = null;
let isRequested = "";
let postData = [];
let UserIddd = null;
let token = null;
let SSID = null;
let MessageContainer = null;
let StatusSet = "";
/**
 * CHANGE THIS ---------------------------------
 */
const socketIOIP = process.env.REACT_APP_NODE2;
//const websocketIOIP = new WebSocket('ws://minglemiix.com:49632');
//const socketIOIP = 'https://glacial-island-40327.herokuapp.com:443/';
const rtmpPath = process.env.REACT_APP_NODE3RTMP;
/**
 *----------------------------------------------
 */



const getSocketIOIP = () => {
  return socketIOIP;
};

/*const getWebSocketIOIP = () => {
  return websocketIOIP;
};
*/
const getRtmpPath = () => {
  return rtmpPath;
};




const clearTimeOutMessages = () => {
  for (let i = 0; i < Utils.getTimeOutMessages().length; i += 1) {
    clearTimeout(Utils.getTimeOutMessages()[i]);
  }
  timeOutMessages = [];
};

const getTimeOutMessages = () => {
  return timeOutMessages;
};

const isNullOrUndefined = value => {
  return value === null || value === undefined;
};

const getContainer = () => {
  return container;
};

const getMessageContainer = () => {
  return MessageContainer;
};
const setMessageContainer = (con) => {
  MessageContainer = con;
};


const setPostContainer = con => {
  container = con;
};

const getPostContainer = () => {
  return container;
};

const setCounterViewer = con => {
  counterViewer = con;
};

const getCounterViewer = () => {
  return counterViewer;
};

const setToken = con => {
  token = con;
};

const getToken = () => {
  return token;
};

const setSSIDToken = con => {
  SSID = con;
};

const getSSIDToken = () => {
  return SSID;
};
const setContainer = con => {
  container = con;
};

const setUserType = type => {
  userType = type;
};



const getUserType = () => {
  return userType;
};


const setPlanType = type => {
  planType = type;
};



const getPlanType = () => {
  return planType;
};


const setStatusType = type => {
  StatusSet = type;
};



const getStatusType = () => {
  return StatusSet;
};



const setUserIddd = type => {
  UserIddd = type;
};



const getUserIddd = () => {
  return UserIddd;
};


const setThemeMode = type => {
  themeMode = type;
};



const getThemeMode = () => {

  
  
  return themeMode;
};

const setUserTypeStream = type => {
  userTypeStream = type;
};



const getUserTypeStream = () => {
  return userTypeStream;
};





const setUserId = id => {
  userId = id;
};


const getUserId = () => {
  return userId;
};


const setPostData = id => {
  postData.push(id);
};


const getPostData = () => {
  return postData;
};

const setRemoteStream = id => {
  remoteStream = id;
};

const getRemoteStream = () => {
  return remoteStream;
};

const setSocket = id => {
  socketActive = id;
};

const getSocket = () => {
  return socketActive;
};

const setPushToken = id => {
  pushToken = id;
};

const getPushToken = () => {
  return pushToken;
};

const setOtherUserId = id => {
  OtherUserId = id;
};

const getOtherUserId = () => {
  return OtherUserId;
};

const setIsRequested = id => {
  isRequested = id;
};

const getIsRequested = () => {
  return isRequested;
};

const setStreamerUserId = id => {
  streameruserId = id;
};

const getStreamerUserId = () => {
  return streameruserId;
};

const setUserName = id => {
  userName = id;
};
const setUserNameId = id => {
  usersNameId = id;
};

const getUserName = () => {
  return userName;
};
const getUserNameId = () => {
  return usersNameId;
};
const setUserProfile = id => {
  userProfile = id;
};

const getUserProfile = () => {
  return userProfile;
};
const setRoomName = name => {
  roomName = name;
};

const getRoomName = () => {
  return roomName;
};

const setStreamKey = Key => {
  streamKey = Key;
};

const getStreamKey = () => {
  return streamKey;
};

const setMyStreamKey = Key => {
  myStreamKey = Key;
};

const getMyStreamKey = () => {
  return myStreamKey;
};











const Utils = {
  isNullOrUndefined,
  //getWebSocketIOIP,
  getUserType,
  setUserType,
  getContainer,
  setContainer,
  setPostContainer,
  getPostContainer,
  getUserId,
  setUserId,
  setSocket,
  getSocket,
  getRoomName,
  setRoomName,
  setUserName,
  getUserName,
  setUserNameId,
  getUserNameId,
  setUserProfile,
  getUserProfile,
  setStreamKey,
  getStreamKey,
  setIsRequested,
  getIsRequested,
  setStreamerUserId,
  getStreamerUserId,
  setOtherUserId,
  getOtherUserId,
  setMyStreamKey,
  getMyStreamKey,
  setRemoteStream,
  getRemoteStream,
  setPushToken,
  getPushToken,
  setPostData,
  getPostData,
  setUserTypeStream,
  getUserTypeStream,
  setThemeMode,
  getThemeMode,
  getTimeOutMessages,
  setCounterViewer,
  getCounterViewer,
  clearTimeOutMessages,
  setUserIddd,
  getUserIddd,
  setSSIDToken,
  getSSIDToken,
  getStatusType,
  setStatusType,
  getSocketIOIP,
  setToken,
  getToken,
  getRtmpPath,
  setPlanType,
  getPlanType,
  setMessageContainer,
  getMessageContainer
};

export default Utils;