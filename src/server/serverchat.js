var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const {bannedList,connectedUsers,ModList}= require('./models/Room');
const dotenv = require('dotenv')
const { ExpressPeerServer } = require("peer");

dotenv.config({path: './.env'});

var httpsOptions = {
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./cert.pem')
};




var isLocal = process.env.PORT === null;
var serverPort = process.env.PORT || 49848;
var server = null;
let sendStream;
  server = require('https').createServer(httpsOptions,app);

var io = require('socket.io')(server);

var pinnedLiveComments = {};
var roomList = {};

var templateList = {};
var StreamMute = {};

const saltRounds = 10;
 const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);
 
 const peerServer = ExpressPeerServer(server, {
  proxied:true,
  path: "/chat",
  generateClientId: customGenerationFunction,
  ssl:httpsOptions
});
 

 
 
 app.use("/", peerServer);

 
 
 

app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/script', express.static(path.join(__dirname, 'script')));
app.use('/image', express.static(path.join(__dirname, 'image')));

app.use(
  '/testdatachannel',
  express.static(path.join(__dirname, 'testdatachannel'))
);



server.listen(serverPort, function() {
  console.log('Rewebrtc-server is up and running at %s port', serverPort);
 
});

function socketIdsInRoom(roomId) {
  var socketIds = io.nsps['/'].adapter.rooms[roomId];
  if (socketIds) {
    var collection = [];
    for (var key in socketIds) {
      collection.push(key);
    }
    return collection;
  } else {
    return [];
  }
}

async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
	
}
 
// compare password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}



function findParticipant(socketId) {
  for (let roomId in roomList) {
    for (let i = 0; i < roomList[roomId].participant.length; i++) {
      if (roomList[roomId].participant[i].socketId == socketId) {
        console.log(
          'roomList[roomId].participant[i]: ',
          roomList[roomId].participant[i]
        );
        return roomList[roomId].participant[i];
      }
    }
  }
  return null;
}


function setHashPassword(myPlaintextPassword){
	bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    
	return hash;
	
});
}



async function createNewRoom(room, error) {
	
	try{
	
  if (roomList.hasOwnProperty(room.id)) {
    if (error) error('Room already used.');
  } else {
	  
	  
	  
	  
	  if(room.password != ""){
		  
		 const hash = await bcrypt.hash(room.password,10);
			
		
   roomList[room.id] = {
      name: room.id,
      image: room.image,
      token: room.token,
	  admin:[{
		userId:room.userId,
		userName:room.userName,
		userProfile:room.userProfile,
		badge:'https://mymiix.com/public/assets/img/adminBadge.png'
					}],
      participant: [],
	  password:hash,
	  isProtected:true,
	  count:0,
	  muteStreams:[]
	  
    };
	
	
	
	  }else{
		  
	  roomList[room.id] = {
      name: room.id,
      image: room.image,
      token: room.token,
	   admin:[{
		userId:room.userId,
		userName:room.userName,
		userProfile:room.userProfile,
		badge:'https://mymiix.com/public/assets/img/adminBadge.png'
			}],
      participant: [],
	  password:"",
	  isProtected:false,
	  count:0,
	  muteStreams:[]
	  
    }; 
	
	
	  }

   console.log('Room: ', room);
    io.emit('newroom-client', room);
	io.to(socket.id).emit('list-server-client',{roomList:roomList})
	io.to(socket.id).emit('Push-To-Mod-List', {roomName:room.id,userId:room.userId,userName:room.userName,userProfile:room.userProfile});
  }
  
 
	}
  catch{
	  
	  
  }
  
  
}











io.on('connection', function(socket) {
  console.log('Connection: ', socket.id);

  socket.on('disconnect', function(data) {
    console.log('Disconnect');

    for (let roomId in roomList) {
      for (let i = 0; i < roomList[roomId].participant.length; i++) {
        if (roomList[roomId].participant[i].socketId == socket.id) {
          io.emit('leave-client', {room:roomList[roomId].participant[i],count: roomList[roomId].participant.length});
          roomList[roomId].participant.splice(i, 1);
          break;
        }
      }
      // setTimeout(function() {
      if (
        roomList.hasOwnProperty(roomId) &&
        roomList[roomId].participant.length === 0
      ) {
       
      }
      // }, 30000);
    }
    if (socket.room) {
      socket.leave(socket.room);
    }
  });

  
  
  
  socket.on('join-room',async(data,error) =>{
		
		const {roomId,userId,userName,profileImg,badge} = data;
		
		
		
			 if (roomList.hasOwnProperty(roomId)) {
				 
			 }else{
				 roomList[roomId] = {
					name: roomId,
					image: '',
					token: '',
					admin:[{
						userId,
						userName,
						userProfile:profileImg,
						badge:'https://mymiix.com/public/assets/img/adminBadge.png'
					}],
					participant: [],
					password:'',
					isProtected:false,
					count:0,
					muteStreams:[]
    };
	
	
			 }
				
		
			connectedUsers[userId] = socket;
			connectedUsers[userId].join(socket.id);
			socket.join(userId);
			socket.join(roomId);
		
		var room = io.sockets.adapter.rooms[roomId];
		
		
		
		
		var item = {
				socketId: socket.id,
				userId,
				displayName:userName,
				profileImg,
				stream:data.stream,
				streamObject: data.stream,
				muted:true,
				type:"",
				userType:'',
				badge:"",
				
				};
		
	if(roomList[roomId] == null){

	}
	else{
		

		
		var index= roomList[roomId].participant.findIndex(it => it.userId === userId);
		
		if (index === -1) {
		roomList[roomId].participant.push(item);
		} else {
			
		//roomList[roomId].participant[index] = item;
		
		
		}	
	

	
	}
	
	
	
	try{
	const passwordData = await bcrypt.compare(data.password, roomList[roomId].password);
	
	
	
	

	
	
	      if(passwordData == true || roomList[roomId].password == ""){
	   
	   
	   
	   
	
	
	var indexss = roomList[roomId].participant.findIndex(it => it.userId === userId);
	
	

	
	
		
	
		
			
	

	//console.log(data);
	
		
		
		socket.broadcast.to(roomId).emit('send-message', {message: "has joined ",userId:userId,displayName: userName,avatar: profileImg,ismod:false});
		io.to(socket.id).emit('user-connectedd',{roomId,userId,userName,userId, participant:roomList[roomId].participant,admin:roomList[roomId].admin,broadcasters:roomList[roomId].broadcasters,requesting:roomList[roomId].requesting,count:room.length,userItem:item});
		socket.broadcast.to(roomId).emit('user-connected',{roomId,userId,userName,userId, participant:roomList[roomId].participant,admin:roomList[roomId].admin,broadcasters:roomList[roomId].broadcasters,requesting:roomList[roomId].requesting,count:room.length,userItem:item});
		
		io.in(roomId).emit('join-client',{roomId,userId,userName,userId, participant:roomList[roomId].participant[indexss],admin:roomList[roomId].admin,count:room.length});
		
		  
		  
		  var indexing= roomList[roomId].muteStreams.findIndex(it => it.userId === userId);
		
		if (indexing === -1) {
	
		} else {
			
		//roomList[roomId].muteStreams[index] = item;
		
		io.to(socket.id).emit('Stream_Mute', {roomId,displayName:userName,userId,isMuted:true});
		
		}
		
		
		  }else{
			  
			  
			   io.to(socket.id).emit('password',{roomId: roomId});
		  }
	
	}
	catch{
		
		
		
	}
	
	
	})
  


   socket.on('finish-live',(data)=>{
	   const {roomId,userId,displayName,socketId,profileImg,status} = data;
	   
	   
	   console.log(data);
	    io.in(roomId).emit('leaveall-client', data);
        socket.leave(roomId);
		//delete roomList[roomId];
	  
	   
	   
   })
  


 socket.on('requesting-live',(data)=>{
	
	const {roomId,displayName,profileImg,socketId,status,type,badge} = data;
	
	console.log(data);

  var item = {
				socketId,
				displayName,
				profileImg,
				type,
				badge:'',
				
				muted:true,
				stream:data.streamObject,
				streamObject:data.streamObject
				};
  if(status == "request"){
		
		

		
				
		
	
		var index = roomList[roomId].requesting.findIndex((fr)=>fr.displayName === displayName);
		var indexx = roomList[roomId].participant.findIndex((fr)=>fr.displayName === displayName);
		
		if(index == -1){
		roomList[roomId].requesting.push(item);
		}
		else{
			roomList[roomId].requesting[index] = item;
			
			
		}
		
		if(indexx == -1){
			
		}else{
			roomList[roomId].participant.splice(indexx,1);
		}
		
		console.log(roomList[roomId].requesting)
		
	
	
	  
	  
  }else if(status == "answer"){
	  
	
	 
		
				
	
		var index = roomList[roomId].broadcasters.findIndex((fr)=>fr.displayName === displayName);
		var indexx = roomList[roomId].requesting.findIndex((fr)=>fr.displayName === displayName);
		
		if(index == -1){
		roomList[roomId].broadcasters.push(item);
		
		}
		else{
			roomList[roomId].broadcasters[index] = item;
		}
		
		if(indexx == -1){
			
		}else{
			roomList[roomId].requesting.splice(indexx,1);
		}
		
		
		
	
	  
	  
	  
	  
  }
  
  
  else if(status == "close"){
	  
	   
	  	var index = roomList[roomId].broadcasters.findIndex((fr)=>fr.displayName === displayName);
		var indexx = roomList[roomId].requesting.findIndex((fr)=>fr.displayName === displayName);
		var indexxx = roomList[roomId].participant.findIndex((fr)=>fr.displayName === displayName);
		if(index == -1){
		
		}
		else{
			roomList[roomId].broadcasters.splice(index,1);
			socket.to(socketId).emit('remove-broadcaster',data);
			
		}
		
		if(indexx == -1){
			
		}else{
			roomList[roomId].requesting.splice(indexx,1);
		}
		
		if(indexxx == -1){
			roomList[roomId].participant.push(item);
		}else{
			roomList[roomId].participant[index] = item;
		}
		
	  
	  
  }
  
   
     socket.broadcast.to(roomId).emit('request-client',{roomId,displayName,profileImg,socketId,status,type,streamObject:data.streamObject});
   
   

	
  })
  
  
  
  
  socket.on('begin-live',(data)=>{
	
	const {roomId,displayName,profileImg,stream} = data;
	
	//console.log(data);
	 socket.join(roomId);
	  
 var streamId = Math.random().toString(36).substring(2, 15);
	roomList[roomId] = {
      id: roomId,
      name: displayName,
      image: null,
      token: socket.id,
	  admin: [{
		roomId,
		socketId: socket.id,
		displayName,
		profileImg,
		stream: stream,
		streamObject: stream,
		muted:false,
		type:"",
		userType:'streamer',
		badge:""
	  }],
	  participant:[],
	  requesting:[],
	  broadcasters:[{
		roomId,
		socketId: socket.id,
		displayName,
		profileImg,
		muted:false,
		stream: stream,
		streamObject: stream,
		userType:'streamer',
		type:"",
		badge:""
	  }]
 


  
 
  }
  
   
   
     io.in(roomId).emit('join-client', {
	   roomId,
       participant:[],
	   
	   admin:[{
	   socketId: socket.id,
	   displayName,
	   profileImg,
	   stream: stream,
	   streamObject: stream,
	   muted:false,
	   badge:"",
	   userType:'streamer'
	   }],
		count: roomList[roomId].participant.length + roomList[roomId].requesting.length + roomList[roomId].broadcasters.length,
		
		
		
      });
	  
	  io.in(roomId).emit('PinnedComments', {roomId: roomId, pinnedData: pinnedLiveComments[roomId]});
	   // if(pinnedLiveComments[roomName] != undefined){
	 io.to(socket.id).emit('PinnedClientJoinedComments',{roomId: roomId, pinnedData: pinnedLiveComments[roomId]});
   
     //fetch('https://mymiix.com/public/api/LivevideoViewersStart?streamid='+streamId+'&roomid='+roomId+"status=LiveP2P",{"method":"POST"})

	 
	 if (bannedList.hasOwnProperty(roomId)) {
			io.to(roomList[roomId].token).emit('bannedListItems', {"data":bannedList[roomId].banned});
			console.log(bannedList[roomId])
		}
	   
      if (ModList.hasOwnProperty(roomId)) {
			io.to(roomList[roomId].token).emit('modListItems', {"data":ModList[roomId].mod});
			console.log(ModList[roomId])
		}
	 
	
  })
  
   socket.on('Stream_Mute',(data) => {
		
		
		
		

		
		
		
		console.log(data);
			var index = roomList[data.roomId].participant.findIndex(it => it.userId === data.userId);
		
		if (index === -1) {
		
		} else {
		

		
		roomList[data.roomId].participant[index].mute = true;
		
		
		}	
		
		
		 
		
			
		
		
				
				var indexing= roomList[data.roomId].muteStreams.findIndex(it => it.userId === data.userId);
				if(indexing == -1){
					
					
					
					if(data.isMuted == true){
						
						var item={
						roomId:data.roomId,
						displayName:data.displayName,
						userId:data.userId,
						isMuted:data.isMuted
					};
						
						 roomList[data.roomId].muteStreams.push(item);
						
					}
					
				}else{
					
					if(data.isMuted == false){
						
						roomList[data.roomId].muteStreams.splice(indexing,1)
						
					}
					
					
				}
				
				
			
			  
		  
		
		
		io.in(data.roomId).emit('Mute',{roomId:data.roomId, displayName:data.userId});
		if(connectedUsers[data.userId]){
		io.to(connectedUsers[data.userId].id).emit('Stream_Mute', data);
		
		
		
		}
		
		
		
		
		
	 });
  
    socket.on('Mute',(data) => {
		const {roomId,displayName } = data;
		
		
		

		
		
		
		console.log(data);
			var index = roomList[roomId].participant.findIndex(it => it.userId === displayName);
		
		if (index === -1) {
		
		} else {
			
		roomList[roomId].participant[index].muted = true;
		}	
		
		
		io.in(roomId).emit('Mute', data);
		
	 });
   socket.on('UN_Mute',(data) => {
		const {roomId,displayName} = data;

		
	
		
		
		console.log(data);
		
		
		var index = roomList[roomId].participant.findIndex(it => it.userId == displayName);
		
		if (index === -1) {
		
		} else {
			
		roomList[roomId].participant[index].muted = false;
		
		
		}
		
		
		io.in(roomId).emit('UN_Mute', data);
		
	 });
  
  socket.on('PinnedComments',(data) => {
		const {roomId,pinnedData } = data;
		
		
		
		if (!roomId) return;
		//pinnedLiveComments[roomName] = socket;
		pinnedLiveComments[roomId] = pinnedData;
		
		
		//console.log(data);
		//console.log(pinnedLiveComments);
		io.in(roomId).emit('PinnedComments', data);
		
	 });
	 
		socket.on('PinnedClientJoinedComments',(data) => {
		const {roomId,pinnedData } = data;
		
		
		
		if (!roomId) return;
		//pinnedLiveComments[roomName] = socket;
		pinnedLiveComments[roomId] = pinnedData;
		
		
		//console.log(data);
		//console.log(pinnedLiveComments);
		io.to(socket.id).emit('PinnedClientJoinedComments',data);
		
		//io.in(roomName).emit('PinnedComments', data);
		
	 })
  
  
  socket.on('join-server', function(joinData) {
    console.log('join-server ', joinData);
    //Join room
    let roomId = joinData.roomId;
    let displayName = joinData.displayName;
	let profileImg = joinData.profileImg;
	let stream = joinData.stream;
	let badge = joinData.badge;
	
    socket.join(roomId);
    socket.room = roomId;
    //console.log('joinData: ', joinData);
	var room = io.sockets.adapter.rooms[roomId];

	//console.log(roomList[roomId]);
	
 if (roomList.hasOwnProperty(roomId)) {
	 
	 
	 
				 
			 }else{
				 roomList[roomId] = {
					name: roomId,
					image: '',
					token: '',
					admin:[{
						userId:joinData.userId,
						userName:displayName,
						userProfile:profileImg,
						badge:'https://mymiix.com/public/assets/img/adminBadge.png'
					}],
					participant: [],
					count: room.length,
					password:'',
					count:0,
					muteStreams:[]
    };
	
	
	io.to(socket.id).emit('Push-To-Mod-List', {roomName:roomId,userId:joinData.userId,userName:displayName,userProfile:profileImg});
	
			 }


	var item = {
				roomId,
				socketId: socket.id,
				displayName,
				profileImg,
				stream: stream,
				muted:true,
				userType:'',
				streamObject: stream,
				badge
				};
	
	
	if(roomList[roomId] == null){

	}
	else{
		

		
		var index = roomList[roomId].participant.findIndex(it => it.displayName === displayName);
		
		if (index === -1) {
		roomList[roomId].participant.push(item);
		} else {
			
		roomList[roomId].participant[index] = item;
		RoomList[roomId].count = room.length;
		}	
	
  

	
	
	}
	
	
	
	   
	   
	   if(joinData.password == roomList[roomId].password || roomList[roomId].password == ""){
	   
	
	
	
    //broadcast
  
 	io.in(roomId).emit('PinnedComments', {roomId: roomId, pinnedData: pinnedLiveComments[roomId]});
	   // if(pinnedLiveComments[roomName] != undefined){


	   io.to(socket.id).emit('PinnedClientJoinedComments',{roomId: roomId, pinnedData: pinnedLiveComments[roomId]});
 
     io.in(roomId).emit('join-client', {
	   roomId,
       participant:{ 
	   roomId,
	   socketId: socket.id,
	   displayName,
	   profileImg,
	   stream,
	   streamObject: stream,
	   userType:'',
	   muted:true,
	   badge
	   
	   },
		admin:roomList[roomId].admin,
		count: room.length
		
	
		
      });
   
   
		  
    io.in(roomId).emit('notify-client', {
      id: roomId,
      name: roomList[roomId].name,
      image: roomList[roomId].image,
      participant: roomList[roomId].participant,
      token: roomList[roomId].token
    });
 
	   }else{
		   
		   io.to(socket.id).emit('password',{roomId: roomId}); 
	   }
	   
	   
	   
	   
	  
		  
		   var indexing= roomList[roomId].muteStreams.findIndex(it => it.userId === userId);
		
		if (indexing === -1) {
	
		} else {
			
		//roomList[roomId].muteStreams[index] = item;
		
		io.to(socket.id).emit('Stream_Mute', {roomId,displayName:userName,userId,isMuted:true});
		
		}
	   
	   
	
	   
	   
	   
  });
  
  
  
  
   socket.on('Push-To-Mod-List', (data) => {
		  const {roomName,userId} = data;
	var item = {
				userId: data.userId,
				userName: data.userName,
				userProfile: data.userProfile,
				
				};
				
				

				
		if (ModList[roomName]) {
		
		
		
		var index = ModList[roomName].mod.findIndex(it => it.userId === data.userId);
		
		
		if (index === -1) {
		ModList[roomName].mod.push(item);
	
		} else {
			
		ModList[roomName].mod[index] = item;
		
		}

			io.to(roomList[roomName].token).emit('modListItems', {"data":ModList[roomName].mod});
			
		console.log(ModList[roomName]);			
			
		
		
		
		
		
		
		
		}else{
				
	
		
		
		}
				
		if(connectedUsers[data.userId]){
		    io.to(connectedUsers[data.userId].id).emit('modList-client', {
				
				userId: data.userId,
				userName: data.userName,
				userProfile: data.userProfile,
				mod:true
				});
			}

	
	
	
		  
	  });
	 
	 
	 
	   socket.on('UnMod-List', (data) => {
		  const {roomName} = data;
	
				
				console.log('data test',data);
				
		if (bannedList[roomName]) {
		
		
		
		var index = ModList[roomName].mod.findIndex(it => it.userId === data.userId);
		
		
		if (index === -1) {
		
	
		} else {
			
		ModList[roomName].mod.splice(index,1);
		
		io.to(roomList[roomName].token).emit('modListItems', {"data":ModList[roomName].mod});
		
		
		
		if(connectedUsers[data.userId]){
		    io.to(connectedUsers[data.userId].id).emit('modList-client', {
				
				userId: data.userId,
				userName: data.userName,
				userProfile: data.userProfile,
				mod:false
				});
			}
		
					
		
		}

			
			
		
			
		
		
		console.log(ModList[roomName].banned);
		
		
		
		
		}
				
		

	
	
	
		  
	  });
	 
	 
	 
	 socket.on('modList-client', (data) => {
		  const {roomName} = data;
	
		item = {
			
			userId: data.userId,
			userName:data.userName,
			userProfile:data.userProfile,
			
			
		}

	if(ModList[roomName]){
		
			var index = ModList[roomName].mods.findIndex(it => it.userId === data.userId);
		
		
		if (index === -1) {
		
		if(connectedUsers[data.userId]){
		    io.to(connectedUsers[data.userId].id).emit('modList-client', {
				
				userId: data.userId,
				userName: data.userName,
				userProfile: data.userProfile,
				mod:false
				});
			}
		
	
		} else {
			
		if(connectedUsers[data.userId]){
		    io.to(connectedUsers[data.userId].id).emit('modList-client', {
				
				userId: data.userId,
				userName: data.userName,
				userProfile: data.userProfile,
				mod:true
				});
			}
		
		}
		
	}
		
		
		

	

		
		  
	  });
	  
	  
	 
	 	 socket.on('modListItems', (data) => {
		  
	
		


		io.to(socket.id).emit('modListItems', data);
		console.log(data);

	

		
		  
	  });
  
  
    socket.on('Push-To-Ban-List', (data) => {
		  const {roomName,userId} = data;
	var item = {
				userId: data.userId,
				userName: data.userName,
				userProfile: data.userProfile,
				
				};
				
				

				
		if (bannedList[roomName]) {
		
		
		
		var index = bannedList[roomName].banned.findIndex(it => it.userId === data.userId);
		
		
		if (index === -1) {
		bannedList[roomName].banned.push(item);
	
		} else {
			
		bannedList[roomName].banned[index] = item;
		
		}

			io.to(socket.id).emit('bannedListItems', {"data":bannedList[roomName].banned});
			
		console.log(bannedList[roomName]);			
			
		
		
		
		
		
		
		
		}else{
				
	
		
		
		}
				
		if(connectedUsers[data.userId]){
		    io.to(connectedUsers[data.userId].id).emit('bannedList-client', {
				
				userId: data.userId,
				userName: data.userName,
				userProfile: data.userProfile,
				banned:true
				});
			}

	
	
	
		  
	  });
	 
	 
	 
	   socket.on('UnBan-List', (data) => {
		  const {roomName} = data;
	
				
				console.log('data test',data);
				
		if (bannedList[roomName]) {
		
		
		
		var index = bannedList[roomName].banned.findIndex(it => it.userId === data.userId);
		
		
		if (index === -1) {
		
	
		} else {
			
		bannedList[roomName].banned.splice(index,1);
		
		io.to(socket.id).emit('bannedListItems', {"data":bannedList[roomName].banned});
		
		if(connectedUsers[data.userId]){
		    io.to(connectedUsers[data.userId].id).emit('bannedList-client', {
				
				userId: data.userId,
				userName: data.userName,
				userProfile: data.userProfile,
				banned:false
				});
			}
		
					
		
		}

			
			
		
			
		
		
		console.log(bannedList[roomName].banned);
		
		
		
		
		}
				
		

	
	
	
		  
	  });
	 
	 
	 
	 socket.on('bannedList-client', (data) => {
		  const {roomName} = data;
	
		item = {
			
			userId: data.userId,
			userName:data.userName,
			userProfile:data.userProfile,
			
			
		}

	if(bannedList[roomName]){
		
			var index = bannedList[roomName].banned.findIndex(it => it.userId === data.userId);
		
		
		if (index === -1) {
		
		if(connectedUsers[data.userId]){
		    io.to(connectedUsers[data.userId].id).emit('bannedList-client', {
				
				userId: data.userId,
				userName: data.userName,
				userProfile: data.userProfile,
				banned:false
				});
			}
		
	
		} else {
			
		if(connectedUsers[data.userId]){
		    io.to(connectedUsers[data.userId].id).emit('bannedList-client', {
				
				userId: data.userId,
				userName: data.userName,
				userProfile: data.userProfile,
				banned:true
				});
			}
		
		}
		
	}
		
		
		

	

		
		  
	  });
	  
	  
	 
	 	 socket.on('bannedListItems', (data) => {
		  
	
		


		io.to(socket.id).emit('bannedListItems', data);
		console.log(data);

	

		
		  
	  });
  
  
  
socket.on('leave-server',(data) =>{
	const {roomId,userId,profileImg,displayName} = data;
	
	
	 if (!roomId) return;
	
	
      
	socket.leave(roomId);
	
	   const index  =  roomList[roomId].participant.findIndex( e => e.displayName === displayName)
	   if (index !== undefined) roomList[roomId].participant.splice(index, 1);
		var room = io.sockets.adapter.rooms[roomId];
		roomList[roomId].count = room.length;
	    

	    io.in(roomId).emit('leavve-client',{roomId,socketId:socket.id,profileImg,displayName,userId,count:roomList[roomId].participant.length});
	   	io.in(roomId).emit('user-disconnected',{roomId,userId,socketId:socket.id,profileImg,displayName,count:roomList[roomId].participant.length});
		

	
})


socket.on('leavve-client',(data)=>{
	
	//console.log(data);
	
})


 socket.on('donate', async(data) => {
      console.log('donate',data);
	  
      var { roomId = '',userId,donation, message, displayName,avatar} = data;
	console.log(data);
        //io.in(roomName).emit('send-message', data);
  

 
	


		
		socket.to(roomName).emit('donate', data);
		socket.to(roomName).emit('send-message',{roomId,userId, message, displayName,avatar,"bandWords":"",isMod:false});
	
    
	

  
  
	
	
	
	
    });

  socket.on('send-message', (data) => {
    const roomId = data.roomId;
    const displayName = data.displayName;
    const message = data.message;
	 const avatar = data.avatar;
   // var socketIds = socketIdsInRoom(roomId);
    
		//console.log(data);
      socket.broadcast.to(roomId).emit('send-message',data);

   
  });

  socket.on('exchange-server', function(data) {
   // console.log('exchange', data);
    data.from = socket.id;
    var to = io.sockets.connected[data.to];
   io.in(data.roomId).emit('exchange-client', data);
  });

  socket.on('count-server', function(roomId, callback) {
   // console.log('count-server ', roomId);
    var socketIds = socketIdsInRoom(roomId);
    callback(socketIds.length);
  });

  socket.on('list-server-client', function(data) {
    console.log(data.roomList);
   
	
  });
  
  socket.on('list-server', function(data, callback) {
    console.log(roomList);
    callback(roomList);
	
	
  });

  socket.on('newroom-server', function(room, error) {
    createNewRoom(room, error);
  });

  socket.on('template-server', function(request, error) {
    try {
      let action = request.action;
      let template = request.template;
      if (action == 'put') {
        templateList[template.roomId] = template;
        io.emit('template-client', {
          roomId: template.roomId,
          template: template
        });
      } else if (action == 'get') {
        if (templateList.hasOwnProperty(template.roomId)) {
          socket.emit('template-client', {
            roomId: template.roomId,
            template: templateList[template.roomId]
          });
        } else {
          if (error) error('Template not found.');
        }
      }
    } catch (e) {
      if (error) error('Error: ' + e);
    }
  });

  socket.on('remove-server', function(room, callback) {
    if (roomList.hasOwnProperty(room.id)) {
      if (room.name && roomList[room.id].name == room.id) {
        delete roomList[room.id];
        callback(true, 'Succeed');
      } else {
        callback(false, 'Token is not found');
      }
    } else {
      callback(false, 'Room is not exist');
    }
  });
});