import io from 'socket.io-client';

import PeerConnectionUtils from '../Utility/PeerConnectionUtils';
import Utils from '../Utility/UtilsChat';
import Utills from '../Utility/Utils';

import Peer from 'peerjs';
import { setTimeout } from 'timers';

let socket = null;
let friends = [];
let listServer = [];
let peers = {};
let peerServer =null;
let thisPeer=null;
let otherPeer = null;
let peer = null;


const getSocket = () => {
  return socket;
};

const getListServer = () => {
  return listServer;
};

const emitListServer = () => {
  socket.emit('list-server', {}, responseListServer => {
    let result = Object.entries(responseListServer);

    const results = Object
      .keys(responseListServer)
      .map(k => { 
        
        return responseListServer[k] 
      })
      .flat();
   // console.log('list-server', results);
    
    Utils.getListContainer().setState({ dataSource: results });
  });
};


const connect = () => {
  socket = io('https://mymiix.com:49848/',{ forceNode:true,secure:true});
  //Utils.setSocket(socket);
};




const handlePassword = () =>{
  socket.on('password',(data)=>{

    Utils.getContainer().setState({
      isShowPassword:true
    })


  })


}


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
  //console.log('push to Mod list');
  

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
  //console.log('Unban');
  
  
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
  //console.log('push to ban list');
  

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



 function emitStreamPushMute(roomName, displayName, userId, isMuted) {
  socket.emit(
    'Stream_Mute',
    {
      "roomId": roomName,
      "displayName": displayName,
      userId,
      isMuted
    },
    () => {

      let allItems = Utils.getContainer().state.otherStreams;
      let filteredItems = allItems.findIndex((obj => obj.userId === userId));

      if (filteredItems == -1) { }


      else
        allItems[filteredItems] = { ...allItems[filteredItems], muted: true };

      Utils.getContainer().setState({
        otherStreams: allItems,
      });


    });

};



 const handleStreamPushMute = () => {
  socket.on('Stream_Mute',(data) => {
 
    let allItems = Utils.getContainer().state.otherStreams;
    let filteredItems = allItems.findIndex((obj => obj.userId === data.userId));
    
    if(filteredItems == -1){
      
    }
    else{
   
      
    allItems[filteredItems] = {...allItems[filteredItems], muted: true};
  
    Utils.getContainer().setState({
      otherStreams:allItems,
      //viewersmute:true,
      //streamerMute:data.isMuted,
      //muted:false,
      //RoomMute:data.isMuted
      
    })

    

    
    
    


  
    }
    Utils.getLocalStream().getAudioTracks()[0].enabled = false;

    Utils.getContainer().setState({
      viewersmute:true,
      streamerMute:data.isMuted,
      muted:false,
      RoomMute:data.isMuted
    })

  });
 };


 const EmitRoomList = () => {
  socket.emit('list-server',{"roomList":''})

 }
 const handleRoomList = () => {
socket.on('list-server-client',data=>{
const {roomList} = data
//console.log(roomList);

const results = Object
      .keys(roomList)
      .map(k => { 
        
        return roomList[k] 
      })
      .flat();
    //console.log('list-server', results);
    
    Utils.getListContainer().setState({ dataSource: results });


})
 }


 const handleMute = () => {
  socket.on('Mute',(data) => {
 
    let allItems = Utils.getContainer().state.otherStreams;
    let filteredItems = allItems.findIndex((obj => obj.userId === data.displayName));
    
    if(filteredItems == -1){}
    else{
   
    allItems[filteredItems] = {...allItems[filteredItems], muted: true};
  
    Utils.getContainer().setState({
      otherStreams:allItems
    })

    
  
    }

  });
 };



 const handleUnMute = () => {
  socket.on('UN_Mute',(data) => {
 
    let allItems = Utils.getContainer().state.otherStreams;
    let filteredItems = allItems.findIndex((obj => obj.userId === data.displayName));
    
    if(filteredItems == -1){

    }
    else{
   
    allItems[filteredItems] = {...allItems[filteredItems], muted: false};
  
    Utils.getContainer().setState({
      otherStreams:allItems
    })

  
  
    }

  });
 };




 const emitMute = (roomName, userId) => {
  socket.emit(
  'Mute',
  {
  "roomId":roomName,
  "displayName":userId,
  },
  () => {
 
    let allItems = Utils.getContainer().state.otherStreams;
    let filteredItems = allItems.findIndex((obj => obj.userId === userId));
    
    if(filteredItems == -1){}
    else{
   
    allItems[filteredItems] = {...allItems[filteredItems], muted: true};
  
    Utils.getContainer().setState({
      otherStreams:allItems
    })
   

    }

  },
  );
 };


 const emit_Un_Mute = (roomName, userId) => {
  socket.emit('UN_Mute',{"roomId":roomName,"displayName":userId},
  () => {
  
  let allItems = Utils.getContainer().state.otherStreams;
  let filteredItems = allItems.findIndex((obj => obj.userId === userId));
  
  if(filteredItems == -1){

  }
  else{
 
  allItems[filteredItems] = {...allItems[filteredItems], muted: false};

  Utils.getContainer().setState({
    otherStreams:allItems
  })
 
 
 
}


  },
  );
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
  //console.log('Unban');

  
  
  },
  );
 };


 const emitJoinRoomPeers = (roomId,userId,profileImg,Localstream,password) =>{
  socket.emit('join-room',{roomId,userId,userName: Utills.getUserNameId(), profileImg,stream: Localstream,password})
 }


const emitJoinRoomPeer = (roomId,userId,profileImg,Localstream,password) =>{

   
  peerServer =  new Peer(userId,{
secure:true,
host:'/',
port:49848,
path:'/chat',
config: { 'iceServers': [
{ 'urls': 'stun:stun.l.google.com:19302'},

],},

    
  });
  
   Utills.setUserIddd(userId);

 
  
   
    // Got stream!
 
   
      //console.log('Localstream: ',Utils.getLocalStream())
     // Utils.getLocalStream().getAudioTracks()[0].muted = Utils.getContainer().state.viewersmute
      Utils.getLocalStream().getAudioTracks()[0].enabled = false;
      //Utils.getLocalStream().getVideoTracks()[0].enabled = false;
      
    
   
    
    
    
      
 
   

   socket.emit('join-room',{roomId,userId,userName: Utills.getUserNameId(), profileImg,stream: Localstream.id,password})


    
   thisPeer = peerServer.connect(userId);
      //open peerjs 
   peerServer.on('open',(userId) => {
    //send join-room through socket.io
    
 //console.log('peer Server Open');

 peerServer.on("connection", (conn) => {  // listen for data connection here
  //console.log("the caller sent message", conn);

  peerServer.on('close', () => {
    //console.log("conn close event");
    
 // manually close the peer connections
 for (let conns in peerServer.connections) {
    peerServer.connections[conns].forEach((connn, index, array) => {
     //console.log(`closing ${thisPeer.connectionId} peerConnection (${index + 1}/${array.length})`, thisPeer.peerConnection);
     connn.peerConnection.close();

     // close it using peerjs methods
     if (connn.close)
     connn.close();
     
  });
}

 });

 })
})

  

    //peerjs getuser connected to server
    socket.on('user-connected', (data) =>{
      
      const {roomId,userId,userName,profileImg,participant,admin,count} = data;


      //console.log(participant)
      //connect to new user and stream media
      connectToNewUser(userId,userName,profileImg,Utils.getLocalStream(),peerServer,participant,admin,count);
      //console.log('userConnected');
     
      
     // profileIm = profileImg;

      

    })

  
  
   

  socket.on('user-connectedd',data =>{

      const {participant,userId,admin,profileImg,broadcasters,requesting,count} = data;
      
      


//call user
peerServer.on('call', call => {

      
  //console.log('called',call);

  //answer user 
  call.answer(Utils.getLocalStream());

 

  //get stream of user
  call.on('stream',(userstream)=> {
  //console.log('userstream: ',userstream)
    const listMessagesss = Utils.getContainer().state.otherStreams;
    const newListMessage = listMessagesss.concat(participant)



    
   //var filter = participant.filter((fil) => fil.profileImg !== Utills.getUserProfile());
   var filter = participant.sort(function(x,y){ return x.userId == Utills.getUserId() ? -1 : y.userId == Utills.getUserId() ? 1 : 0; });


   
   //console.log(participant[0].stream)
    if(userstream){


      
 


     
      
      Utils.getContainer().myRef.current.srcObject = Utils.getLocalStream();
      
    


      Utils.getContainer().setState({
        otherViewSrc: Utils.getContainer().state.otherViewSrc.concat(userstream),
        otherStreams: filter,
        Admin:admin

    
        })
    
if(admin.length > 0){
  if(admin[0].userId == Utills.getUserId()){
    Utils.getContainer().setState({
      isAdmin:true

    })


  }
}

       
    
    
         Utils.getContainer().state.otherStreams.map((post,i)=>{
    
          Utils.getContainer().state.otherStreams[i].stream = Utils.getContainer().state.otherViewSrc[i]
    
         })
    
         Utils.getContainer().setState({
          otherStreams:  Utils.getContainer().state.otherStreams,
      
        })


        //console.log(Utils.getContainer().state.otherViewSrc)


    }
    
    
       

  



  })
  
 



  peers[userId] = call;

  })

      
    
    
    
       })


  


       


    
      
      peerServer.on('error',console.log)
    
 

  


   
 

  



  
}




//already connected user
async function connectToNewUserRequest(userId,userName,profileImg,peer,participant,admin,count) {
 
  const localsStream = await navigator.mediaDevices.getUserMedia({audio:true,video:false})
   
  Utils.setLocalStream(localsStream)
 // localsStream.getAudioTracks()[0].muted = this.state.viewersmute
  Utils.getContainer().setState({
   localStream: localsStream
  })

 var call = peer.call(userId,localsStream);
 

 

 //call stream and grab remotestream
call.on('stream', remoteVideoStream => {

  

if(remoteVideoStream){
  




 // console.log(participant[0].stream)
 
  //Utils.getContainer().otherRef.current.srcObject = remoteVideoStream;
  //Utils.getContainer().otherRef.current.play();

  if (Utils.getCurrentType() === 'STREAMER') {
  Utils.getContainer().myRef.current.srcObject = Utils.getLocalStream();
  
  }
  //Utils.getContainer().myRef.current.play();



  
    Utils.getContainer().setState({
      otherViewSrc: Utils.getContainer().state.otherViewSrc.concat(remoteVideoStream),    
      Admin:admin

    
     })


     //console.log(Utils.getContainer().state.otherViewSrc)

     if(admin.length > 0){
      if(admin[0].userId == Utills.getUserId()){
        Utils.getContainer().setState({
          isAdmin:true
    
        })
    
    
      }
    }






 

  
   }


   

    })

    peers[userId] = call;

  }



//already connected user
async function connectToNewUserRemote(userId,userName,profileImg,peer,admin,count) {
 
  const localsStream = await navigator.mediaDevices.getUserMedia({audio:true,video:false})
   
  Utils.setLocalStream(localsStream)
 // localsStream.getAudioTracks()[0].muted = this.state.viewersmute
  Utils.getContainer().setState({
   localStream: localsStream,
   
  })


 var call = peer.call(userId,localsStream);
 

 

 //call stream and grab remotestream
call.on('stream', remoteVideoStream => {

  

if(remoteVideoStream){
  




 // console.log(participant[0].stream)
 
  //Utils.getContainer().otherRef.current.srcObject = remoteVideoStream;
  //Utils.getContainer().otherRef.current.play();

  if (Utils.getCurrentType() === 'STREAMER') {
  Utils.getContainer().myRef.current.srcObject = Utils.getLocalStream();
  }
  //Utils.getContainer().myRef.current.play();



  
    Utils.getContainer().setState({
      otherViewSrc: Utils.getContainer().state.otherViewSrc.concat(remoteVideoStream),    
      Admin:admin

    
     })


     //console.log(Utils.getContainer().state.otherViewSrc)


     if(admin.length > 0){
      if(admin[0].userId == Utills.getUserId()){
        Utils.getContainer().setState({
          isAdmin:true
    
        })
    
    
      }
    }





 

  
   }


   

    })

    peers[userId] = call;

  }




//already connected user
function connectToNewUser(userId,userName,profileImg,stream,peer,participant,admin,count) {
  //peerServer = new Peer(userId);
  
  //call new user and send userId and stream

  
 var call = peer.call(userId,stream);
 

 

 //call stream and grab remotestream
call.on('stream', remoteVideoStream => {

  

if(remoteVideoStream){
  




 

 
  Utils.getContainer().myRef.current.srcObject = Utils.getLocalStream();
 




  
    Utils.getContainer().setState({
      otherViewSrc: Utils.getContainer().state.otherViewSrc.concat(remoteVideoStream),    
      

    
     })


     

     Utils.getContainer().setState({
      otherStreams: participant,
  
    })


     Utils.getContainer().state.otherStreams.map((post,i)=>{

      Utils.getContainer().state.otherStreams[i].stream = Utils.getContainer().state.otherViewSrc[i]

     })

     Utils.getContainer().setState({
      otherStreams:  Utils.getContainer().state.otherStreams,
  
    })



 

  
   }


   

    })

    peers[userId] = call;

  }

    


  const requestClient = () =>{

    

  }
    



  // emit request to Unite 
  const requestLive = async (roomId,displayName,profileImg,socketId,status,typpe,stream) =>{
    


   
  
  
  }




//Create Room
const emitCreateRoom = (roomId,password,Localstream) =>{
  
  socket.emit('newroom-server',{
    id:roomId,
    image:'',
    token:'',
    userId:Utills.getUserId(),
    userName:Utills.getUserNameId(),
    userProfile: Utills.getUserProfile(),
    admin:[],
    participant:[],
    count:0,
    password

  },data=>{

   

  })

 setTimeout(()=>{
  window.location.href = 'https://mymiix.com/chatroom/'+roomId
 },800)

}


//begin broadcast stream
const beginLive = (roomId,displayName,Localstream) =>{
  
 

}


//join broadcasters stream 
const join = (roomId, displayName) => {

  socket.emit('join-server',
  { 
    roomId, 
    displayName: Utills.getUserNameId(),
    profileImg: Utills.getUserProfile(),
    stream: Utils.getLocalStream()

  },data  => {
   
    //console.log('join-serverrr', data);
  
   
  })
  emitJoinRoomPeer(Utills.getStreamKey(),Utills.getUserIddd(),Utills.getUserProfile(),Utils.getLocalStream())
};

const leave = socketId => {
  //console.log('leave', socketId);
  const container = Utils.getContainer();
  const pcPeers = PeerConnectionUtils.getPeers();
  const pc = pcPeers[socketId];
  if (pc !== undefined) {
    const viewIndex = pc.viewIndex;
    pc.close();
    delete pcPeers[socketId];

    const remoteList = container.state.otherStreams;
    delete remoteList[socketId];
    container.setState({ otherStreams: remoteList });
    
    container.setState({ info: 'One peer leave!' });
  }
};

const emitFinishbroadcast = ()=>{

  socket.emit('finish-live',{
    roomId: Utills.getStreamKey(),
    userId: Utills.getUserIddd(),
    displayName: Utills.getUserNameId(),
    socketId: '',
    profileImg: Utills.getUserProfile(),
    status: Utills.getUserName()+' has ended their broadcast',
    

  })


  if(Utils.getLocalStream() != null){
  Utils.getLocalStream().getTracks().forEach(function(track) {
    if (track.readyState == 'live' && track.kind === 'audio') {
      track.stop();
  }
  });
}

} 


const emitPinnedComments = async(
  roomId,
  pinnedData

  
) => {


  
  socket.emit('PinnedComments', {
    roomId: Utills.getStreamKey(),
    pinnedData
  });


};

const handlePinnedComments = () => {
  socket.on('PinnedComments', (data) => {
    const {roomId, pinnedData} = data;

    Utils.getContainer().state.pinnedMessages.pop();

    if(pinnedData != null){    
      Utils.getContainer().setState({pinnedMessages:  Utils.getContainer().state.pinnedMessages.concat(pinnedData),
      
    
    
    });

  }else{
    Utils.getContainer().setState({pinnedMessages:[]});

  }
  });
};


const handleJoinClientPinnedComments = () => {
  
  socket.on('PinnedClientJoinedComments', (data) => {
    const {roomId, pinnedData} = data;

    Utils.getContainer().state.pinnedMessages.pop();

    if(pinnedData != null){    
      Utils.getContainer().setState({pinnedMessages:  Utils.getContainer().state.pinnedMessages.concat(pinnedData),
      
    
    
    });

  }else{
    Utils.getContainer().setState({pinnedMessages:[]});

  }
  });
};



const handleOnLeaveall = (data) =>{
socket.on('leaveall-client',(data)=>{

  if(peers[Utills.getUserIddd()]) peers[Utills.getUserIddd()].close();

  peers = {};
  Utils.getContainer().setState({
remoteList:[],
requestList:[],
otherStreams:[],
countViewer:0,
LiveHasEnded: true

  })




  


})


}

const handleOnExchange = () => {
  socket.on('exchange-client', data => {
    //console.log('exchange-client ', data);
    PeerConnectionUtils.exchange(data);

  });
};

const handleOnLeave = () => {
  socket.on('leavve-client', data => {
const {socketId,userId,profileImg,count,displayName} = data;

  

peers[userId].close();
var indexx = Utils.getContainer().state.otherStreams.findIndex((fa)=>{return fa.displayName === displayName})   
  




if(indexx == -1)
console.log('user not found')
else
Utils.getContainer().state.otherStreams.splice(indexx,1);



    leave(socketId);
    
  });
};

const handleOnConnect = () => {
  socket.on('connect', data => {
    //console.log(data);
   
  });
};

const emitExchangeServerSdp = (to, sdp,roomId) => {
  socket.emit('exchange-server', {
    to,
    sdp,
    roomId
  });
};

const emitExchangeServerCandidate = (to, candidate) => {
  socket.emit('exchange-server', {
    to,
    candidate,
    roomId: Utills.getStreamKey(),
  });
};





const emitLeaveServer = () =>{
socket.emit('leave-server',{roomId: Utills.getStreamKey(),userId:Utills.getUserIddd(),profileImg: Utills.getUserProfile(),displayName:Utills.getUserNameId()})


if(thisPeer != null){
 

    thisPeer.send("end");
 
    if(peers[Utills.getUserIddd()]) peers[Utills.getUserIddd()].close();
    
    if(Utils.getLocalStream() != null){
      Utils.getLocalStream().getAudioTracks()[0].stop();
    
  }
  //peers[Utills.getUserIddd()].close();

  thisPeer.close();
}


}

const handleOnJoinClient = () => {
  socket.on('join-client', friend => {
    

    
    
    Utils.getContainer().setState({
      countViewer: friend.count
    });

    if(Utils.getListContainer() != null){
     let index = Utils.getListContainer().state.dataSource.findIndex(data => data.name == friend.roomId )

if(index === -1){

}else{
  Utils.getListContainer().state.dataSource[index].participant = friend.participant;
  Utils.getListContainer().setState({
    dataSource:Utils.getListContainer().state.dataSource
  })
}

    }

   

      friends.push(friend.participant);
   
    



    //console.log('join-server', friend);

    
    

   
    if (friend.participant.displayName == Utills.getUserNameId()) 
    {
      const friendd = friend.participant;
      const socketId = friendd.socketId;
      Utils.setStreamerSocketId(socketId);
      
      

  
    

      

    
    }



  });
};

const handleOnLeaveClient = participant => {
  socket.on('leave-client', participant => {
    //console.log('leave-client :', participant);
    const socketId = participant.room.socketId;
    if (PeerConnectionUtils.getPeers(socketId)) {
      let pc = PeerConnectionUtils.getPeers[socketId];
      if (pc !== null && pc !== undefined) {
        pc.close();
        delete PeerConnectionUtils.getPeers[socketId];
      }
      if (!Utils.isNullOrUndefined(Utils.getContainer())) {
        const newCountViewer = participant.count - 1;
        Utils.getContainer().setState({
          countViewer: newCountViewer
        });

        const index = Utils.getContainer().state.otherStreams.findIndex(datta=>datta.displayName === participant.room.displayName)
        if(index == -1){

        }else{
          Utils.getContainer().state.otherStreams.splice(index,1)
          Utils.getContainer().setState({
            otherStreams:  Utils.getContainer().state.otherStreams
          })
        }


        

      }
    }
  });
};

const handleOnAdminMute = () => {
socket.on('remove-broadcaster',data=>{

  Utils.getLocalStream().getAudioTracks()[0].enabled = false;
  //Utils.getLocalStream().getVideoTracks()[0].enabled = false;
  Utils.getContainer().setState({
    viewersmute: true,
  })
})

}


const handleOnLeaveClientt = () => {
  socket.on('leavve-client', (data) => {
    //console.log('leave-client :', data);
    const socketId = data.socketId;

    
        const newCountViewer = data.count;
        Utils.getContainer().setState({
          countViewer: newCountViewer
        });

       const index = Utils.getContainer().state.otherStreams.findIndex(datta=>datta.displayName === data.displayName)
        if(index == -1){

        }else{
          Utils.getContainer().state.otherStreams.splice(index,1)
          Utils.getContainer().setState({
            otherStreams:  Utils.getContainer().state.otherStreams
          })
        }

        if(peers[data.userId]) peers[data.userId].close();
    
  });
};



const handleDisconnect = () =>{
  socket.on('user-disconnected', (data)=>{

    const {userId} = data;
    
    if(peers[userId]) peers[userId].close();
    
    
    
    
    
    
    
    })


}
const emitSendMessage = (roomId, displayName, message,avatar,isMod) => {
  socket.emit(
    'send-message',
    {
      roomId,
      displayName,
      message,
      avatar,
      ismod:isMod
    },
    data => {


    }
  );
};

const handleOnMessage = () => {
  socket.on('send-message', data => {
    if (data.message === '#<3') {
      const { countHeart } = Utils.getContainer().state;
      Utils.getContainer().setState({ countHeart: countHeart + 1 });
    } else {
      const { listMessages } = Utils.getContainer().state;
    
      const newListMessages = listMessages.slice();
      newListMessages.push(data);
      Utils.getContainer().setState({ listMessages: newListMessages });
    
     
      
    
    
      if(Utils.getContainer().isMessaging){
    setTimeout(()=>{
      
      var objDiv = Utils.getContainer().myScrolable.current;
      objDiv.scrollTop = objDiv.scrollHeight;
      
      },100);
    }

    }
  
  
  
  });



};


const SocketUtils = {
  getSocket,
  connect,
  join,
  leave,
  handleOnConnect,
  handleOnExchange,
  handleOnLeave,
  handleOnJoinClient,
  handleOnLeaveClient,
  handleDisconnect,
  emitExchangeServerSdp,
  emitExchangeServerCandidate,
  emitListServer,
  getListServer,
  handleOnMessage,
  handleOnLeaveClientt,
  emitLeaveServer,
  emitSendMessage,
  beginLive,
  requestLive,
  handleOnAdminMute,
  emitFinishbroadcast,
  handleOnLeaveall,
  requestClient,
  emitPinnedComments,
  handlePinnedComments,
  handleJoinClientPinnedComments,
  emitJoinRoomPeer,
  emitPushToBan,
  emitUnBan,
  handleBanList,
  handleBanListClient,
  handleModListClient,
 handleModList,
 emitPushToMod,
 emitMute,
 emit_Un_Mute,
 EmitRoomList,
 handleRoomList,
 handleUnMute,
 handleMute,
 emitUnMod,
 emitStreamPushMute,
 handleStreamPushMute,
 emitCreateRoom,
 emitJoinRoomPeers, 
 handlePassword,
};
export default SocketUtils;