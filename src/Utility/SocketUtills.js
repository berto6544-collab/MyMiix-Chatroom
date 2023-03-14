
import React from'react';
import Utils from './Utils';
import AuthUtils from './AuthUtils';
import LiveStatus from './liveStatus';
import Cookies from 'js-cookie';
import AuthData from '../components/AuthData';
import {reactLocalStorage} from 'reactjs-localstorage';
const io = require('socket.io-client');



let socket = null;
let websocket = null;
let yourConn = null;
let theme = "light";
let Auth = null

const readTheme = () =>{
    theme =  reactLocalStorage.get('theme')
   
    if(theme){
     Utils.setThemeMode(theme)
    }else{
    Utils.setThemeMode('light');
     
    }
 
    return theme;
  }


const getSocket = () => {
 return socket;
};
const getyourConn = () => {
 return yourConn;
};




const connect = () => {
 socket = io('https://mymiix.com:49263/',{transports: ['websocket'],forceNew: true });
   
 
};




const emitSendDirectMessage = (
  Sender,
  Receiver,
  id,
  body,
  profileimg,
  posted_at,
  postimg,
  userid
) => {




  socket.emit('messages', {Sender,Receiver,id,userid,profileimg,postimg, body,posted_at});

  

  const listMessage = Utils.getMessageContainer().state.dataSource;
const newListMessage = listMessage.slice();
console.log(Utils.getMessageContainer().state.dataSource)

 
 
 


newListMessage.unshift({
 Sender,
 Receiver,
 id,
 body,
 profileimg,
 posted_at,
 postimg
 
 
 });

 
 Utils.getMessageContainer().setState({
   dataSource:newListMessage
 })

 window.addEventListener('scroll',Utils.getMessageContainer().changenavbar);




};

const handleOnSendDirectMessage = () => {


  socket.on('messages',data=>{

const {Sender,Receiver,id,body,profileimg,posted_at,postimg} = data;


const listMessage = Utils.getMessageContainer().state.dataSource;
const newListMessage = listMessage.slice();
console.log(Utils.getMessageContainer().state.dataSource)

 
 
 


newListMessage.unshift({
 Sender,
 Receiver,
 id,
 body,
 profileimg,
 posted_at,
 postimg
 
 
 });

 
 Utils.getMessageContainer().setState({
   dataSource:newListMessage
 })

 window.addEventListener('scroll',Utils.getMessageContainer().changenavbar);


  });


 
  




};

const handleOnConnect = () => {
 
 socket.on('connect', data => {
 

    
  data = {name: Utils.getUserNameId(),userIdd: Utils.getUserId()};
 socket.emit('setUserId',data);

 if(Utils.getUserId() != null){
 socket.emit('Live-Streamm',{'dataLoad': "",'userId': Utils.getUserId()});
 }
 console.log(data)


 });


 


 
};







const emitRegisterLiveStream = (roomName, userId) => {
 socket.emit('register-live-stream', {
 roomName,
 userId,
 });




};

const emitBeginLiveStream = (roomName, userId) => {
 socket.emit(
 'begin-live-stream',
 {
 roomName,
 userId,
 },
 () => {
 console.log('begin-live-stream');

 
 },
 );


fetch('https://www.mymiix.com/public/api/postLiveReact?id='+Utils.getUserId(),{
 method:'POST',
 headers:{
 'Accept-application': 'application/json',
 'Content-type': 'application/json'
 },
 body: JSON.stringify({"streamkey": Utils.getMyStreamKey()})
}).then(response => response.json)
.then(responseJSON => {

alert(responseJSON[0].Success);

});


 
};

const emitFinishLiveStream = (roomName, userId) => {
 socket.emit(
 'finish-live-stream',
 {
 roomName,
 userId,
 },
 () => {
 console.log('register-live-stream');
 
 },
 );
};



const emitPushToMod = (roomName, userId,userName,userProfile) => {
  socket.emit(
  'Push-To-Mod-List',
  {
  roomName,
  userId,
  userName,
  userProfile
  },
  () => {
  console.log('push to Mod list');
  

  },
  );
 };




 const handleModListClient = () => {
  socket.on('modList-client',(data)=>{
    const {mod} = data;


    
 


 Utils.getContainer().setState({
   
  isMod: mod
 });

  })
  
 };

 
 const handleModList = () => {
  socket.on('modListItems',(datta)=>{
    const {data} = datta;


  

 Utils.getContainer().setState({modList: data});

  })
  
 };



 const emitUnMod = (roomName, userId,userName,userProfile) => {
  socket.emit(
  'UnMod-List',
  {
  roomName,
  userId,
  userName,
  userProfile
  },
  () => {
  console.log('Unban');
  
  
  },
  );
 };



const emitPushToBan = (roomName, userId,userName,userProfile) => {
  socket.emit(
  'Push-To-Ban-List',
  {
  roomName,
  userId,
  userName,
  userProfile
  },
  () => {
  console.log('push to ban list');
  

  },
  );
 };




 const handleBanListClient = () => {
  socket.on('bannedList-client',(data)=>{
    const {banned} = data;


    
 


 Utils.getContainer().setState({
   
  isBanned: banned
 });

  })
  
 };

 
 const handleBanList = () => {
  socket.on('bannedListItems',(datta)=>{
    const {data} = datta;


    
 
 


 Utils.getContainer().setState({banList: data});

  })
  
 };



 const emitUnBan = (roomName, userId,userName,userProfile) => {
  socket.emit(
  'UnBan-List',
  {
  roomName,
  userId,
  userName,
  userProfile
  },
  () => {
  console.log('Unban');
  
  
  },
  );
 };

const emitCancelLiveStream = (roomName, userId) => {
 socket.emit('cancel-live-stream', {
 roomName,
 userId,
 });
};

const emitJoinServer = (roomName, userId,userName,userProfile,RequestJoin,badge) => {
 
 socket.emit(
 'join-server',
 {
 roomName,
 userId,
 userName: Utils.getUserNameId(),
 userProfile: Utils.getUserProfile(),
 RequestJoin: 'request',
 badge
 },
 
 data => {
 
  Utils.setCounterViewer(data)
  Utils.getContainer().setState({counter:data});
 },
 );
 
 
};


const emitJoinServver = (roomName, userId,userName,userProfile,RequestJoin,badge) => {
 
 socket.emit(
 'join-servver',
 {
 roomName,
 userId,
 userName: Utils.getUserNameId(),
 userProfile: Utils.getUserProfile(),
 RequestJoin: 'request',
 badge
 },
 
 data => {

Utils.setCounterViewer(data)
 
 Utils.getContainer().setState({counter:formatToUnits(data)});
 
 
 },
 );
 
 
};




const emitFeedPost = (userId,body,title,category,fileName,type,uri,name) => {
 
 socket.emit(
 'FeedPost',
 {
 
 userId,
 body,
 title,
 category,
 fileName,
 type,
 uri,
 name
 },
 
 data => {
 




 
 },
 );
 
 
};






const emitProfileImage = (userId,profileImage) => {
 
 socket.emit(
 'ProfilePost',
 {
 
 userId,
 profileImage
 },
 
 data => {
 const {userId,profileImage} = data;

 Utils.getPostContainer().refs.ProfileModal.close();
 
 AuthUtils.getContainer().setState({
 userProfileImage: profileImage
 })
 
 
 Utils.setUserProfile(profileImage)




 
 },
 );
 
 
};



const handleProfileImage = () => {

 
 socket.on('ProfilePost', (data) => {
 const {userId,profileImage} = data;


 
 Utils.setUserProfile(profileImage)
 






 });
}












const handleStreamingLive= () => {

 
 socket.on('Live-Streamm', (data) => {
 const {dataLoad} = data;
 
 

 if(dataLoad == "" ){

 }
 else{

 setTimeout(()=>{
if(Utils.getPostContainer() != null){

Utils.getPostContainer().setState({
 TwitcchSource: dataLoad
})
}

},10000)
console.log(dataLoad)

 }

 
 
 
 
 
 
 });

};




const handleOnClientJoin = () => {
 socket.on('join-client', (data) => {
 console.log(data);
 // const countViewer = Utils.getContainer().state.countViewer;
 //Utils.getContainer().state({counter:data});
 Utils.setCounterViewer(data)
 Utils.getContainer().setState({counter:formatToUnits(data)});
 
 });
};



const handleOnClienttJoin = () => {
 socket.on('join-clientt', (data) => {
 console.log(data);
 
 Utils.setCounterViewer(data)
 //Utils.setCounterViewer(countViewwer);
 Utils.getContainer().setState({counter:formatToUnits(data)});
 
 
 });
};




const handleOnSendHeart = () => {
 socket.on('send-heart', () => {
 console.log('send-heart');
 const countHeart = Utils.getContainer().state.countHeart;
 Utils.getContainer().setState({countHeart: countHeart + 1,});
 });
};

const emitSendHeart = roomName => {
 socket.emit('send-heart', {
 roomName,
 });
};




const handleOnSendMessage = async() => {
 var security = await fetch('https://mymiix.com/public/api/userData') .then(response => response.json());
 

 socket.on('send-message', data => {
 const {userId,userName, userProfile, message, productId,productImageUrl, productUrl,RequestJoin,bandWords,ismod} = data;

 
 



 const listMessages = Utils.getContainer().state.listMessages;
 const newListMessages = listMessages.slice();

 
 if(security[0].Security == "safeGaurd" && message.match("/[^!@#$%^&*]*"+(bandWords)+"[^!@#$%^&*]*/gi") ){

 
 }
 else{
 


 newListMessages.push({
 userId,
 userName,
 userProfile,
 message,
 productId,
 productImageUrl,
 productUrl,
 RequestJoin,
 ismod
 
 });
 
 
 
 console.log(data);
 


 Utils.getContainer().setState({listMessages: newListMessages});
 
 }
 
 });

 
};





const handleOnSendMessagge = async() => {
 var security = await fetch('https://mymiix.com/public/api/userData') .then(response => response.json());
 

 socket.on('send-messagge', data => {
 const {userId,userName, userProfile, message, productId,productImageUrl, productUrl,RequestJoin,bandWords} = data;

 
 



 const listMessagess = Utils.getContainer().state.MessageListt;
 const newListMessagess = listMessagess.slice();

 
 
 


 newListMessagess.push({
 userId,
 userName,
 userProfile,
 message,
 productId,
 productImageUrl,
 productUrl,
 RequestJoin,
 
 
 });
 
 
 
 console.log(data);
 


 //Utils.getContainer().setState({MessageListt: newListMessagess});
 

 
 });

 
};









const emitRequest = (
 roomName,
 userId,
 RequestedRoomJoin,
 requestVal,
 liveStreamerUserId
) => {

 socket.emit('requestTojoin', {
 roomName,
 userId,
 RequestedRoomJoin,
 requestVal,
 liveStreamerUserId
 },
 data => {
 const {roomName,userId,RequestedRoomJoin,requestVal,liveStreamerUserId} = data;
 console.log(data);
 
 if(requestVal == "Requested" ){





 
 }
 
 });


};


const handleRequest = () => {

 socket.on('requestTojoin', (data) => {
 const {roomName,userId,RequestedRoomJoin,requestVal,liveStreamerUserId} = data;
 console.log(data);
 


 
 if(requestVal == "Requested" && Utils.getUserType() == "STREAMER"){



 
 }

else if(requestVal == "Accepted" ){

 
 
 Utils.setIsRequested(RequestedRoomJoin);

 if(Utils.getUserId() == userId){
 Utils.getContainer().onBeginLiveStreamm(RequestedRoomJoin,userId);
 
 
 
 }

 


 }

 else if(requestVal == "ClosedRequest" ){


 emitFinishLiveStream(RequestedRoomJoin,userId);
 Utils.setIsRequested("");
 if(Utils.getUserId() == userId){
 
 
 Utils.getContainer().onFinishLiveStreamm(RequestedRoomJoin,userId);
 
 }

 Utils.getContainer().setState({
 RequestJoin:"",
 RequestJoinUserId:""
 
 });

 }

 });
};









const emitPinnedComments = (roomName,pinnedData) => {

 socket.emit('PinnedComments', {roomName,pinnedData});


 

};

const handlePinnedComments = () => {
 socket.on('PinnedComments', (data) => {
 const {roomName, pinnedData} = data;



 if(pinnedData != null){ 
 
  //Utils.getContainer().setState({pinnedMessages: pinnedData})

  if(Utils.getContainer().state.pinnedMessages.length > 0){
    Utils.getContainer().state.pinnedMessages.pop()
  }
  //const listMessages = Utils.getContainer().state.pinnedMessages;
  const newMessages = []
  newMessages.push({
    userId:pinnedData.userId,
 userName:pinnedData.userName,
 userProfile:pinnedData.userProfile,
 message:pinnedData.message,
 productId:null,
 productImageUrl:null,
 productUrl:null,
 RequestJoin:pinnedData.RequestJoin,
  })

  Utils.getContainer().setState({pinnedMessages:newMessages});

 }else{
  Utils.getContainer().setState({pinnedMessages:[]});

 }
 });
};


const handleDonation = () => {
 socket.on('donatedStream', (data) => {
 const {roomName, userId,ammount} = data;

 

 

 
 
 
 
 });
 

 
};


const handleJoinClientPinnedComments = () => {
 
 socket.on('PinnedClientJoinedComments', (data) => {
 const {roomName, pinnedData} = data;



 if(pinnedData != null){ 
  //Utils.getContainer().setState({pinnedMessages: pinnedData,});

  
  const newListMessages = [];
  newListMessages.push({
    userId:pinnedData.userId,
 userName:pinnedData.userName,
 userProfile:pinnedData.userProfile,
 message:pinnedData.message,
 productId:null,
 productImageUrl:null,
 productUrl:null,
 RequestJoin:pinnedData.RequestJoin,
  })

  Utils.getContainer().setState({pinnedMessages:newListMessages});

 }else{

  Utils.getContainer().setState({pinnedMessages:[]});
 }
 });
};



const emitSendMessage = (roomName,userId,userName,userProfile,message,productId,productImageUrl,productUrl,RequestJoin,isMod) => {

//let bandWords = await fetch('https://minglemiix.com/public/assets/bandWords.txt').then(response => response.text());
 
 socket.emit('send-message', {
 roomName,
 userId,
 userName,
 userProfile,
 message,
 productId,
 productImageUrl,
 productUrl,
 RequestJoin,
 bandWords:"",
 ismod:isMod

 },data => {
const {userId,userName, userProfile, message, productId,productImageUrl, productUrl,RequestJoin,bandWords,ismod} = data;

 
 



 const listMessages = Utils.getContainer().state.listMessages;
 const newListMessages = listMessages.slice();

 

 


 newListMessages.push({
 userId,
 userName,
 userProfile,
 message,
 productId,
 productImageUrl,
 productUrl,
 RequestJoin,
 ismod
 
 
 });
 
 
 
 console.log(data);
 


 Utils.getContainer().setState({listMessages: newListMessages});

});
 

};



const emitSendMessagge = async(roomName,userId,userName,userProfile,message,productId,productImageUrl,productUrl,RequestJoin) => {
 
 socket.emit('send-messagge', {
 roomName,
 userId,
 userName,
 userProfile,
 message,
 productId,
 productImageUrl,
 productUrl,
 RequestJoin,
 },data => {
  const {userId,userName, userProfile, message, productId,productImageUrl, productUrl,RequestJoin,bandWords} = data;
  
   
   
  
  
  
   const listMessages = Utils.getContainer().state.listMessages;
   const newListMessages = listMessages.slice();
  

  
  
   newListMessages.push({
   userId,
   userName,
   userProfile,
   message,
   productId,
   productImageUrl,
   productUrl,
   RequestJoin,
   
   
   });
   
   
   
   console.log(data);
   
  
  
   Utils.getContainer().setState({listMessages: newListMessages});
  
  });


};

const emitLeaveServer = (roomName, userId) => {
 socket.emit('leave-server', {
 roomName,
 userId,
 });
 
};

const emitLeaveServver = (roomName, userId) => {
 socket.emit('leave-servver', {
 roomName,
 userId,
 });
 
};




const handleOnDonateClient = () => {
  socket.on('donate', (data) => {
  const {donation} = data;

   if(Utils.getUserType() == "STREAMER")
   {

let sum = (+Utils.getContainer().state.amount + +donation).toFixed(2);

  Utils.getContainer().setState({donate:  "$"+sum+" USD" });
   }
  
  });
 };



 const handleSendRemoveDirectMessage = () => {


  socket.on('Removemessages', (data) => {
const {id} =data;

  let allItems =  Utils.getMessageContainer().state.dataSource;
  let filteredItems = allItems.findIndex((obj => obj.id === id));
 // alert(filteredItems);
  allItems.splice(filteredItems,1);


  Utils.getMessageContainer().setState({
    dataSource: allItems
  });
  
  
  


  

})




};


const handleOnLeavveClient = () => {
 socket.on('leave-clientt', () => {
 //console.log('leave-client');
 //const countViewer = Utils.getContainer().state.counter;
 //Utils.getContainer().setState({counter: countViewer - 1});
 
 });
};


const handleOnLeaveClient = () => {
 socket.on('leave-client', () => {
 console.log('leave-client');
 const countViewer = Utils.getContainer().state.counter;
 Utils.getContainer().setState({counter: countViewer - 1});


 });
};

const emitReplay = (roomName, userId) => {
 socket.emit(
 'replay',
 {
 roomName,
 userId,
 },
 result => {
 if (!Utils.isNullOrUndefined(result)) {
 const createdAt = result.createdAt;
 const messages = result.messages;
 let start = createdAt
 for (let i = 0; i < messages.length; i += 1) {
 let end = messages[i].createdAt
 let duration = end.diff(start);
 const timeout = setTimeout(() => {
 const {message, productId, productImageUrl, productUrl,RequestJoin} = messages[
 i
 ];
 const listMessages = Utils.getContainer().state.listMessages;
 const newListMessages = listMessages.slice();
 newListMessages.push({
 userId,
 message,
 productId,
 productImageUrl,
 productUrl,
 RequestJoin
 });
 //Utils.getContainer().setState({listMessages: newListMessages});
 }, duration);
 Utils.getTimeOutMessages().push(timeout);
 }
 }
 },
 );
};






const handleOnChangedLiveStatus = () => {
 socket.on('changed-live-status', data => {
 const {roomName, liveStatus} = data;
 const currentRoomName = Utils.getRoomName();
 const currentUserType = Utils.getUserType();
 if (roomName === currentRoomName) {
 if (currentUserType === 'STREAMER') {
 } else if (currentUserType === 'VIEWER') {
 if (liveStatus === LiveStatus.CANCEL) {
 }
 if (liveStatus === LiveStatus.FINISH) {

 }
 Utils.getContainer().setState({liveStatus});
 } else if (currentUserType === 'REPLAY') {
 }
 }
 });
};

const handleOnNotReady = () => {
 socket.on('not-ready', () => {
 console.log('not-ready');
 Utils.getContainer().alertStreamerNotReady();
 });
};





const SocketUtils = {
 getSocket,
 connect,
 readTheme,
 handleOnConnect,
 emitRegisterLiveStream,
 emitBeginLiveStream,
 emitFinishLiveStream,
 handleOnClientJoin,
 emitJoinServer,
 emitCancelLiveStream,
 handleOnSendHeart,
 emitSendHeart,
 handleOnSendMessage,
 emitSendMessage,
 emitSendMessagge,
 handleOnSendMessagge,
 emitLeaveServer,
 handleOnLeaveClient,

 handleRequest,
 emitRequest,

 emitJoinServver,
 

 emitFeedPost,

 handleOnDonateClient,
 emitReplay,
 handleOnChangedLiveStatus,
 handleOnNotReady,
 emitProfileImage,
 handleProfileImage,
 handleStreamingLive,
 handleOnClienttJoin,
 getyourConn,
 emitLeaveServver,
 handleOnLeavveClient,
 emitPinnedComments,
 handlePinnedComments,
 emitPushToBan,
 emitUnBan,
 handleBanList,
 handleBanListClient,
 handleJoinClientPinnedComments,
 handleDonation,
 emitSendDirectMessage,
 handleSendRemoveDirectMessage,
 handleModListClient,
 handleModList,
 emitPushToMod,
 emitUnMod,
 handleOnSendDirectMessage
 

 

};

export default SocketUtils;

function formatToUnits(value, fixed) {
  if (value >= 1100000){
  return (value / 1000000).toFixed(fixed) + 'M'
  }
 if (value >= 1000000){
  return (value / 1000000).toFixed(0) + 'M'
 }
 if (value >= 100000){
  return (value / 1000).toFixed(0) + 'K'
 }
 if (value >= 10000)
 {
  return (value / 1000).toFixed(0) + 'K'
 }
 if (value >= 1100)
 {
  return (value / 1000).toFixed(fixed) + 'K'
 }
 if (value >= 1000)
 {
  return (value / 1000).toFixed(0) + 'K'
 }
 return value
 
 }