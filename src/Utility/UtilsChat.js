import Ut from './Utils';

let localStream = null;
let otherStream = null;
let container;
let listContainer;
let roomid = null;
let categorie = null;
let currentType = "VIEWER";
let isSelf = false;
let streamerSocketId = null;
let randomDisplayName = null;

const setStreamerSocketId = socketId => {
  streamerSocketId = socketId;
};

const getStreamerSocketId = () => {
  return streamerSocketId;
};

const setCurrentType = type => {
  currentType = type;
};

const getCurrentType = () => {
  return currentType;
};

const setisSelf = type => {
  isSelf = type;
};

const getisSelf = () => {
  return isSelf;
};

const setListContainer = container => {
  listContainer = container;
};

const getListContainer = () => {
  return listContainer;
};

const getContainer = () => {
  return container;
};

const setContainer = newContainer => {
  container = newContainer;
};

const setLocalStream = stream => {
  localStream = stream;
};

const getLocalStream = () => {
  return localStream;
};

const setRoomid = stream => {
  roomid = stream;
};

const getRoomid = () => {
  return roomid;
};
const setCategorie = stream => {
    categorie = stream;
  };
  
  const getCategorie = () => {
    return categorie;
  };

const setOtherStream = stream => {
  otherStream = stream;
};

const getOtherStream = () => {
  return otherStream;
};

const getRandomAvatar = () => {
 const avatar = Ut.getUserProfile();
  return avatar;
};


const getLocalStreamDevice = (isFront, callback) => {
  let videoSourceId;
  
  
  
  navigator.mediaDevices.getUserMedia({
   
    audio: true,
    video: false
  })
  .then(stream => {
    // Got stream!
    setLocalStream(stream);
    Utils.getContainer().setState({
      selfSrc: stream.toURL(),
      localStream:stream
    })
    //console.log(stream)

    callback(stream);
    
  })
  .catch(error => {
    // Log error
  });




};

const mapHash = (hash, func) => {
  const array = [];
  for (const key in hash) {
    const obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
};

const getRandomUsername = () => {
  
  const username = Ut.getUserName();
  return username;
};

const isNullOrUndefined = value => {
  return value === null || value === undefined;
};

const getDimensions = () => {
 
};

const Utils = {
  getLocalStreamDevice,
  setLocalStream,
  getLocalStream,
  getContainer,
  setContainer,
  mapHash,
  setisSelf,
  getisSelf,
  getRandomUsername,
  isNullOrUndefined,
  getDimensions,
  setOtherStream,
  getOtherStream,
  getListContainer,
  setListContainer,
  getCurrentType,
  setCurrentType,
  getStreamerSocketId,
  setStreamerSocketId,
  setRoomid,
  getRoomid,
  getRandomAvatar
};

export default Utils;