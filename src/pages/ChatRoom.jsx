import React, { Component } from 'react';
import Utils from '../Utility/UtilsChat';
import Utills from '../Utility/Utils';
import '../components/styless.css';
import 'font-awesome/css/font-awesome.min.css';
import  'bootstrap/dist/css/bootstrap.css';
import {Button,Badge,Modal} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../components/Feed.css';
import SocketUtills from '../Utility/SocketUtillsChat';
import PreviewLive from '../preview-url/src/previewLive';
import Player from 'react-player';
import Previeww from '../preview-url/src/previeww';
import DialogUnite from '../components/DialogInviteChatroom';
import { OpenUrl,OpenAboutMeUrl,UrlForMedia } from '../Utility/GetUrl'; 

import { UpdatedPinnedMessage,userData,finduserData } from '../API/API';








class NewLiveStreamScreen extends Component {

 constructor(props) {
 super(props);
 const isSelf = Utils.getisSelf()

 this.otherRef = React.createRef()
 this.myRef = React.createRef()
 this.myScrolable = React.createRef()
 this.state = {
 isSelf,
 UserType: "VIEWER",
 countViewer:0,
 Donation: "$0.00",
 otherStreams: [],
 remoteList: [],
 requestList: [],
 requests:false,
 selfSrc: null,
 RoomMute:false,
 localStream:null,
 otherViewSrc: [],
 countHeart: 0,
 listMessages: [],
 LiveHasEnded: this.props.dataIstream,
 inRemote:false,
 banList:[],
 modList:[],
 ShowBanList:false,
 isOnBanList:true,
 pinnedMessages: [
 //Message pinned
 // {
 // userId: 'user1',
 // message: 'Link for info about product 1',
 // }

 ],
 message: '',
 streamId:"",
 muted:false,
 isShowPassword:false,
 heightKeyboard:820,
 maxUsers: 10,
 viewersmute: true,
 startedLive: false,
 visiblePrompt: false,
 visibleListMessages:true,
 modalPaymentVisible: false,
 isMessaging: false,
 isBio: false,
 isBioData: [],
 username: "",
 Admin:[],
 type:"",
 userId:"",
 isLogin:false,
 isdisabled:false,
 isSent:false,
 isLinkTrue:false,
 isMod:false,
 isBanned:false,
 streamerMute:false,
 isStreamer: "null",
 isAdmin:false,
 password:''
 
 };
 }


 hex2bin(input) {
    return decodeURIComponent(input.replace(/(.{1,2})/g, "%$1"));
  }

  

  bin2hex(input) {
    
    return encodeURIComponent(input.replace(/(.{1,2})/g, "%$1"));
  }

 componentDidMount = async() => {

 //console.log('componentDidMount');
 Utils.setContainer(this);
 Utills.setContainer(this);
 const roomName = this.props.streamRooms;





   const localsStream = await  navigator.mediaDevices.getUserMedia({audio:true,video:false})
   Utils.setLocalStream(localsStream);
   this.setState({
    localStream: localsStream
   })

  

    await SocketUtills.emitJoinRoomPeer(this.props.streamRooms,Utills.getUserId(),Utills.getUserProfile(),localsStream,'');


 
    if(this.state.Admin.length > 0){
      if(this.state.Admin[0].userId == Utills.getUserId()){
        this.setState({
          isAdmin:true
        })
      }
    }

 


 };

 onFinishInputRoomName = roomName => {
 
 this.setState({ visiblePrompt: false, startedLive: true, });

 SocketUtills.join(this.props.streamRooms, Utills.getUserNameId());
 
 };

 onCancelInput = () => {
 this.setState({ visiblePrompt: false, });
 };



 setisLinkTrue = (value) =>{
  this.setState({
    isLinkTrue:value
  })
 }

getPinnedStat = () =>{

 
  UpdatedPinnedMessage()
 .then((responseJSON)=> {
 
 this.setState({
 
 pinnedMessages: []
 
 });
 
 this.setState({
 
 pinnedMessages: responseJSON
 
 });
 
 
 }).catch((error) =>{
 

 });


}


pinnedMessagge = (index) =>{
 
 const {listMessages, pinnedMessages} = this.state;
 
 
 pinnedMessages.pop();
 
 
 this.setState({
 pinnedMessages: pinnedMessages.concat({
 roomId: listMessages[index].roomId,
 message: listMessages[index].message,
 displayName: listMessages[index].displayName,
 avatar: listMessages[index].avatar
 
 })
 });
 
 
 
 SocketUtills.emitPinnedComments(this.props.streamRooms,{
 roomId: this.props.streamRooms,
 message: listMessages[index].message,
 displayName: listMessages[index].displayName,
 avatar: listMessages[index].avatar})
 
 



 
 }


 UnpinnedMessagge = () =>{
 const {listMessages, pinnedMessages} = this.state;
 
 


 SocketUtills.emitPinnedComments(this.props.streamRooms,null);

 this.setState({
 pinnedMessages: []
 });
 
 
 
 
 
 
 
 
 }



 onMute = ()=>{

  SocketUtills.emitMute(this.props.streamRooms,Utills.getUserId())
}

onUnMute = ()=>{

  SocketUtills.emit_Un_Mute(this.props.streamRooms,Utills.getUserId())
}










setShowStripe=()=>{
  this.setState({
    dialogUniteshow:false
  })
}  






closeDonationForm = () => {
 this.setState({
 modalPaymentVisible: false,

 })
 }



 renderDonatedp = () => {
 
 return (
 <div style={{alignSelf: 'flex-start', marginTop: 0, marginLeft: 0}}>
 <p >
 <b>Dontated:</b> {this.state.Donation}
 </p>
 </div>
 );
 };










 onClickSend = () => {
 const roomId = this.props.streamRooms;
 const { message, listMessages } = this.state;

 
 if (message === '') {
 return;
 }else{




  SocketUtills.emitSendMessage(this.props.streamRooms, Utills.getUserNameId(), message,Utills.getUserProfile(),this.state.isMod);
 const data = {
 roomId:this.props.streamRooms,
 displayName: Utills.getUserNameId(),
 message,
 avatar: Utills.getUserProfile(),
 ismod:this.state.isMod
 };
 const newListMessages = listMessages.slice();
 newListMessages.push(data);
 this.setState({
 message: '',
 listMessages: newListMessages
 });
 
 


this.setState({message:""});

setTimeout(()=>{
  var objDiv = document.getElementById("scrollable");
  objDiv.scrollTop = objDiv.scrollHeight;
  },100)

}


};

 onClickHeart = () => {
 const { countHeart } = this.state;
 const roomName = this.props.streamRooms;
 SocketUtills.emitSendMessage(this.props.streamRooms, Utills.getUserNameId(), '#<3');
 this.setState({
 countHeart: countHeart + 1
 });




 };





 renderingItem = (item,index)=>{
 return(
 <div key={index} style={{width:'100%',flexDirection:'column',display:'flex',alignItems:'center'}}>
 <div style={{width:'100%'}}>
 <div style={{flexDirection:'row',alignItems:'center',display:'flex',padding:20}}>
 <img style={{width:60,height:60,borderRadius:100}} src={item.Profileimg} />
 <p onClick={()=>{


this.setState({
 isBio: false
 })
 }} style={{fontSize:16,fontWeight:'800'}}>{item.Name}</p></div>
 <button
 class={'buttonCloseModal'}
 onClick={()=> this.setState({isBio: false})}>
 <img
 src={'./assets/ico_cancel.png'}
 class={'iconCancel'}
 />

 </button>
 
 </div>
 <div style={{width:'100%',flexDirection:'column',display:'flex',alignItems:'center'}}>
 <p style={{fontSize:20,fontWeight:'800'}}>About Me</p>
 {OpenAboutMeUrl(item.AboutMe.replaceAll("[nl]",'\n'))}
 {OpenUrl(item.LinksArray,this.state.isLinkTrue,this.setisLinkTrue)}

 </div>

 <div style={{flexDirection: "row", marginVertical: 20,display:'flex', marginHorizontal:10}}>
<div style={{flexDirection: "column", alignItems: 'center',display:'flex', marginHorizontal:10}}>

<p style={{marginHorizontal: 10}}>Posts:</p>
<p style={{marginHorizontal: 10, fontWeight: '800'}}>{formatToUnits(item.PostStat)}</p>
</div>

<div style={{flexDirection: "column",alignItems: 'center',display:'flex', marginHorizontal:10}}>
<p style={{marginHorizontal: 10}}>Followers:</p>
<p style={{marginHorizontal: 10, fontWeight: '800'}}>{formatToUnits(item.FollowersStat)}</p>
</div>


<div style={{flexDirection: "column",alignItems: 'center',display:'flex', marginHorizontal:10}}>
<p style={{marginHorizontal: 10}}>following:</p>
<p style={{marginHorizontal: 10, fontWeight: '800'}}>{formatToUnits(item.FollowingStat)}</p>
</div>


</div>

<div style={{width:'100%',flexDirection:'column',display:'flex',alignItems:'center'}}>


 {this.state.isMod == true && Utils.getCurrentType() == "STREAMER" ||this.state.isAdmin == true || this.state.isMod == true?<button onClick={async()=>{
 SocketUtills.emitPushToBan(this.props.streamRooms,this.state.userId,item.UserName,item.ProfileImage);
 
} } style={{width:'50%',borderRadius:9, padding:10,marginRight:5,alignItems:'center',display:'flex',justifyContent:'center',marginBottom:20}}>
 <p style={{fontWeight:'800'}}>Ban</p>
 </button>:<></>}

 {this.state.isMod == true && Utils.getCurrentType() == "STREAMER" ||this.state.isAdmin == true || this.state.isMod == true?<button onClick={async()=>{
 SocketUtills.emitUnBan(this.props.streamRooms,this.state.userId,item.UserName,item.ProfileImage);
 
} } style={{width:'50%', borderRadius:9, padding:10,marginRight:5,alignItems:'center',display:'flex',justifyContent:'center',marginBottom:20}}>
 <p style={{fontWeight:'800'}}>UnBan</p>
 </button>:<></>}
 

</div>

<div style={{width:'100%',flexDirection:'column',display:'flex',alignItems:'center'}}>


 {this.state.isMod == true && Utils.getCurrentType() == "STREAMER" ||this.state.isAdmin == true ||  this.state.isMod == true?<button onClick={async()=>{
 SocketUtills.emitStreamPushMute(this.props.streamRooms,item.UserName,this.state.userId,true);
 
} } style={{width:'50%',borderRadius:9, padding:10,marginRight:5,alignItems:'center',display:'flex',justifyContent:'center',marginBottom:20}}>
 <p style={{fontWeight:'800'}}>Mute</p>
 </button>:<></>}

 {this.state.isMod == true && Utils.getCurrentType() == "STREAMER" ||this.state.isAdmin == true || this.state.isMod == true?<button onClick={async()=>{
 SocketUtills.emitStreamPushMute(this.props.streamRooms,item.UserName,this.state.userId,false);
 
} } style={{width:'50%', borderRadius:9, padding:10,marginRight:5,alignItems:'center',display:'flex',justifyContent:'center',marginBottom:20}}>
 <p style={{fontWeight:'800'}}>UnMute</p>
 </button>:<></>}
 

</div>



 </div>

 )
 }




 onChangeMessagep = (e) => {
 this.setState({ message: e.target.value});


 };

 renderWrapBottom = () => {
 const { message } = this.state;

 return(
 <div
 class={'wrapBotttomm'}
 

 >
 
 <textarea 
 class={'beginLiveStreampt'}
 placeholder="Comment input"
 rows={3}
 onChange={(e)=>{this.onChangeMessagep(e)}}
style={{width:'90%',resize:'none',color:'black',padding:10,border:'1px solid black'}}
 value={message}
 />
 <button
 class={'wrapIconnSenddd'}
 onClick={this.onClickSend}
 activeOpacity={0.6}
 disabled={this.state.message != ""? false : true }
 >
 <img
 src={'https://mymiix.com/assets/ico_send.png'}
 class={'iconSend'}
 />
 </button>

 
 
 </div>
 
 
 );
 
 };

 
 render() {
 const {pinnedMessages } = this.state;


 
 return (
 <div  style={{backgroundColor:'white',color:'black',width:'100%', height:'100%'}}>



<div style={{width:'100%',flexDirection:'row',display:'flex',alignItems:'center'}}>


<img style={{width:140,alignSelf:'start',alignContent:'start'}} src="https://mymiix.com/public/assets/img/mymiix-dark1.png" />

 <div style={{position:'absolute',right:40}} class={'wrapIconView'}>
 <img
 src={'https://mymiix.com/assets/ico_view.png'}
 class={'iconView'}
 />
 <div class={'wrapTextViewer'}>
 <p >{this.state.countViewer}</p>
 </div>
 </div>

 <button onClick={()=>{
 //SocketUtils.emitLeaveServer();
 //this.props.closeM();
 setTimeout(() => {
 window.location.href = "https://mymiix.com";    
 }, 900);
 
 }} class={'buttonColor'} style={{position:'absolute',right:0,zIndex:100}}>
 <img
 src={'/assets/ico_cancel.png'}
 class={'iconView'}
 />
 </button>

 
 

 </div>
 <h2 >{this.props.streamRooms}</h2>
 {this.state.isMod == true?<b>You are mod</b>:null}
 {this.state.isAdmin == true?<b>You are Admin</b>:null}
 
 <div style={{width:'100%'}}>
 
 <div  style={{width:'100%',flexDirection:'row'}}>
 
 {
 
 <InfiniteScroll
 dataLength={this.state.otherStreams.length}
 hasMore={true}
 style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}
  
 >

{this.state.otherStreams.map((item, index) => (
    <div style={{zIndex:1,display:'flex',flexDirection:'column',padding:10}} class={'buttonColor'}  key={index}>
<div onClick={()=>{


finduserData(item.displayName)
.then(responseJSON =>{

this.setState({
isBioData:responseJSON,
username:item.displayName,
userId:item.userId,
streamId:''+item.streamObject,
isBio: true,
inRemote:true

})





})




}} style={{flexDirection:'column',display:'flex',alignItems:'center',position:'relative'}}>
<img style={{width:50,height:50,borderRadius:50,objectFit:'cover'}} src={item.profileImg} />

{item.muted == true? <div style={{position:'absolute',bottom:0,right:0,alignItems:'center',justifyContent:'center',backgroundColor:'orange',display:'flex',padding:2,borderRadius:30, width:25,height:25}}><i class="fa fa-microphone-slash"></i></div> : null}
</div>

</div>

))}
 </InfiniteScroll>
 
 }
 </div>
 
 </div>

 
 


 <div class={'containerr'}>
 
 
 <div style={{width:'100%',flexDirection:'row'}}>
 

 
 
 

 </div>
 
 
 
 
 </div>
 
 
 
 

 <div class={'wrapBottomm'}>
 
 <button
 class={'wrapIconnSend'}
 style={{position:'relative'}}
 onClick={()=>this.setState({isMessaging:true})}

 >
 <img
 src={'https://mymiix.com/assets/ico_send.png'}
 style={{position:'absolute'}}
 class={'iconSend'}
 />
 <p style={{fontWeight:'800',zIndex:40}}>{formatToUnits(this.state.listMessages.length)}</p>
 </button>
 
 <button
 class={'wrapIconnSend'}
 style={{position:'relative'}}
 onClick={()=>{
  this.setState({
    dialogUniteshow:true
  })  
  //navigator.clipboard.writeText('https://mymiix.com/view/unite/'+btoa(Utills.getStreamKey()));
 }}
 activeOpacity={0.6}
 >
<i style={{}} fontSize={24} class="fa fa-clipboard"></i>

 </button>

{this.state.streamerMute == false ?<div>
{this.state.isdisabled == false ?<div class={'wrapIconnSend'}>
 {this.state.muted == false? <button disabled={this.state.isdisabled?true: false}  onClick={()=>{
 
 this.setState({
    viewersmute: !this.state.viewersmute,
    muted: !this.state.muted
    })
    this.state.localStream.getAudioTracks()[0].enabled = this.state.viewersmute
    this.onUnMute();
 
 }} class={'wrapIconnSend'}><i class="fa fa-microphone-slash"></i></button> : <button  onClick={()=>{
 
    this.setState({
        viewersmute: !this.state.viewersmute,
        muted: !this.state.muted
        })
        this.state.localStream.getAudioTracks()[0].enabled = this.state.viewersmute
        this.onMute();
 
 }} class={'wrapIconnSend'}><i class="fa fa-microphone"></i></button>
 
 }
 </div>:null}
 </div>:null}
 



 
 
 </div>

 <DialogUnite  showStripe={this.setShowStripe} stream={this.props.streamRooms} username={Utills.getUserNameId()}  open={this.state.dialogUniteshow}  />


 <Modal
 
 show={this.state.isLogin}

 onHide={() => this.setState({isLogin:false})}
   
 dialogClassName="modal-90w modal-90h my-modal"
 contentClassName="my-modall"
 
 
 >


    <Modal.Body  style={{padding:0, margin:0,position:'relative',width:'100%',height:'100%',}}>
 <div
 style={{
 display:'flex',
 justifyContent: 'center',
 }}>
 <button
 class={'buttonCloseModal'}
 onClick={ ()=>{this.setState({isLogin:false})}}>
 <img
 src={'https://mymiix.com/assets/ico_cancel.png'}
 class={'iconCancel'}
 />
 </button>
 {<iframe style={{width:'95%',height:'90%',position:'absolute',border:0}}  src={"https://mymiix.com/signin/"+this.props.userName} frameBorder={0} allowFullScreen={true} />}

 </div>
 </Modal.Body>
 </Modal>


 <Modal
 
 show={this.state.modalPaymentVisible}

 onHide={() => this.setState({modalPaymentVisible:false})}
   
 dialogClassName="modal-90w modal-90h my-modal"
 contentClassName="my-modall"

 
 >


    <Modal.Body  style={{padding:0, margin:0,position:'relative',width:'100%',height:'100%',}}>
 <div
 style={{
 display:'flex',
 justifyContent: 'center',
 }}>
 <button
 class={'buttonCloseModal'}
 onClick={ this.closeDonationForm}>
 <img
 src={'https://mymiix.com/assets/ico_cancel.png'}
 class={'iconCancel'}
 />
 </button>

 </div>
 </Modal.Body>
 </Modal>

 
 <Modal
 
 show={this.state.isShowPassword}

 onHide={() => {
  this.setState({isShowPassword:false})
  window.location.href = 'https://mymiix.com/chatroom';



}}
   


 
 >

<Modal.Header>
<Modal.Title id="contained-modal-title-vcenter">
          Password
        </Modal.Title>
</Modal.Header>

    <Modal.Body  style={{padding:0, margin:0,position:'relative',width:'100%',height:'100%',}}>
 <div
 style={{
 display:'flex',
 justifyContent: 'center',
 flexDirection:'column',
 padding:10
}}>

<b>password</b>
<input value={this.state.password} type={'password'}  placeholder={'password'} onChange={(e)=>{
this.setState({
password: e.target.value
})

}} style={{width:'100%',padding:10,color:'black',border:'1px solid black',marginTop:10}} />


 
 
 
 </div>
 </Modal.Body>
 <Modal.Footer>

 <div style={{width:'100%',display:'flex',alignItems:'center',marginTop:10,justifyContent:'end'}}>

<Button onClick={ ()=>{
  this.setState({isShowPassword:false})
  
  window.location.href = 'https://mymiix.com/chatroom';
  }}>Close</Button>

<Button style={{marginLeft:10}} onClick={ ()=>{
    
   
        //SocketUtills.emitCreateRoom(this.state.roomName,this.state.password,null);
        SocketUtills.emitJoinRoomPeers(this.props.streamRooms,Utills.getUserId(),Utills.getUserProfile(),this.state.localStream,this.state.password);

        this.setState({isShowPassword:false})

    }}>Submit</Button>
</div>

 </Modal.Footer>
 </Modal>


 
 <video style={{display:'none'}} playsInline={true} webkit-playsinline={true}   ref={this.myRef} />
{/*<video style={{display:'none'}}  ref={this.otherRef} />*/}


 <Modal
 show={this.state.isMessaging}

 onHide={() => this.setState({isMessaging:false})}
   
 dialogClassName="modal-90w modal-90h my-modal"
 contentClassName="my-modall"
 
>

    <Modal.Body class={'d-flex flex-column align-items-stretch flex-shrink-0 PanelVideo'} style={{padding:0, margin:0,width:'100%',height:'100%',position:'relative'}}>
 

 <div class={'d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none'}  style={{width:'100%'}}>

 <button onClick={()=> this.setState({isMessaging: false})}
 class="close" data-dismiss="modal" 
 style={{position:'absolute',right:10,top:10}}
 aria-label="Close"><span aria-hidden="true">&times;</span></button>
 </div>
 <div class={'d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none'} style={{}}>
 

 {pinnedMessages.length > 0 &&
 pinnedMessages.map(item => {
 return (
 <div class={'list-group-item-action py-3 lh-tight'} >
 
 
 
 <div class={'chatItem'}>
 <div >
 </div>
 <div  style={{width:'100%'}}>
 <p>Pinned to Top</p>
 <div style={{display:'flex',alignItems:'center'}}>
 <img src={item.avatar} class={'iconAvatar'} />
 <b>{item.displayName}</b>
 </div>
 {UrlForMedia(item.message,"")}
 </div>
 
 
 </div>
 
 
 </div>
 ); })}
 </div>

<div id={'scrollable'} ref={this.myScrolable}  style={{width:'100%',height:'100%',position:'relative',overflow: 'auto',flexDirection: 'column-reverse', }}>
<div  class={'list-group list-group-flush scrollarea'}   >
{this.state.listMessages.length > 0 && this.state.listMessages.map((item, index) => (
 <div key={index} class={'list-group-item-action py-3 lh-tight'} >




 <div style={{width:'100%'}} >
 <div style={{display:'flex',alignItems:'center'}}>
 <img src={item.avatar} class={'iconAvatar'} />
 <a href={'https://mymiix.com/@'+item.displayName} target={'_blank'}><b>{item.displayName}</b></a>
 {item.ismod == true ?<img src={'https://mymiix.com/public/assets/img/mod-badge.png'} style={{width:15,height:15,borderRadius:100}} />:null}

 </div>
 {UrlForMedia(item.message,"")}
 
 </div>
 
 </div>

))}
</div>
</div>


 


 
 

 
 


<div class={'d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none'} >
{this.state.isBanned == false && this.state.RoomMute == false ?this.renderWrapBottom(): <div class={'d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom'} style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>

<p >You have been banned.</p>
    
</div>}
</div>

 </Modal.Body>
 </Modal>


 
 <Modal
 
 show={this.state.isBio}

 onHide={() => this.setState({isBio: false })}
   
 dialogClassName="modal-90w modal-90h my-modal"
 contentClassName="my-modall"
 
 
 >
 
 
 <Modal.Body style={{padding:0,margin:0,overflowY:'scroll'}}>
 <div >

{this.state.isBioData.length > 0 && this.state.isBioData.map((item, index) => (

<div key={index} style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
 <div style={{width:'100%'}}>
 <div style={{flexDirection:'column',display:'flex',alignItems:'center',padding:20}}>
 <img style={{width:60,height:60,borderRadius:100,objectFit:'cover'}} src={item.ProfileImage != "" ?item.ProfileImage:"https://mymiix.com/public/assets/img/no-avatar.jpg"} />
 <p onClick={()=>{
 //location.href = "https://minglemiix.com/@"+item.UserName
 this.setState({
 isBio: false
 })
 }} style={{fontSize:16,fontWeight:'800'}}>{item.Name != "" ? item.Name : this.state.username}</p></div>
 <button
 class={'buttonCloseModal'}
 onClick={()=> this.setState({isBio: false})}>
 <img
 src={'https://mymiix.com/assets/ico_cancel.png'}
 class={'iconCancel'}
 />

 </button>
 
 </div>
 <div style={{width:'100%',display:'flex', marginBottom:40,flexDirection:'column',alignItems:'center'}}>
 <p style={{fontSize:20,fontWeight:'800'}}>About Me</p>
 {OpenAboutMeUrl(item.AboutMe.replaceAll("[nl]",'\n'))}
 {OpenUrl(item.LinksArray,this.state.isLinkTrue,this.setisLinkTrue)}

 </div>

 <div style={{flexDirection: "row",width:'80%',display:'flex',justifyContent:'space-around', marginBottom:40, marginHorizontal:10}}>
<div style={{flexDirection: "column",display:'flex', alignItems: 'center', marginHorizontal:10}}>

<p style={{marginHorizontal: 10}}>Posts:</p>
<p style={{marginHorizontal: 10, fontWeight: '800'}}>{formatToUnits(item.PostStat)}</p>
</div>

<div style={{flexDirection: "column",display:'flex',alignItems: 'center', marginHorizontal:10}}>
<p style={{marginHorizontal: 10}}>Followers:</p>
<p style={{marginHorizontal: 10, fontWeight: '800'}}>{formatToUnits(item.FollowersStat)}</p>
</div>


<div style={{flexDirection: "column",display:'flex',alignItems: 'center', marginHorizontal:10}}>
<p style={{marginHorizontal: 10}}>following:</p>
<p style={{marginHorizontal: 10, fontWeight: '800'}}>{formatToUnits(item.FollowingStat)}</p>
</div>


</div>

<div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>


 
 {this.state.banList.length > 0 && this.state.isOnBanList == true && this.state.banList.map((posts, index) => (
 
   
 <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:10 }} key={index}>
 <img src={posts.userProfile}  style={{width:40,height:40,borderRadius:100,objectFit:'cover'}}/>
  <b>{posts.userName}</b>
  <button onClick={()=>{
 
  SocketUtills.emitUnBan(this.props.streamRooms,posts.userId,posts.userName,posts.userProfile)
  

  

  }} class={'btn btn-primary'} style={{zIndex:500}} type={'button'}>UnBan</button>
  </div>




)) }

{this.state.modList.length > 0 && this.state.isOnBanList == false && this.state.modList.map((posts, index) => (

 
  <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:10 }} key={index}>
  <img src={posts.userProfile}  style={{width:40,height:40,borderRadius:100,objectFit:'cover'}}/>
   <b>{posts.userName}</b>
   <button onClick={()=>{
  
   SocketUtills.emitUnMod(this.props.streamRooms,posts.userId,posts.userName,posts.userProfile)
  

   

   }} class={'btn btn-primary'} style={{zIndex:500}} type={'button'}>UnMod</button>
   </div>
 



))
}




{this.props.UserLevel == "1" || this.state.isAdmin == true?<Button onClick={()=>{
  
  SocketUtills.emitPushToMod(this.props.streamRooms,this.state.userId,this.state.username,item.ProfileImage)
 

  

  }} class={'btn btn-primary'} style={{width:'50%', borderRadius:9, padding:10,alignItems:'center',display:'flex',justifyContent:'center',marginBottom:20}} type={'button'}>Mod</Button>:null}

 {this.props.UserLevel == "1" ||this.state.isAdmin == true?<Button onClick={()=>{
  
  SocketUtills.emitUnMod(this.props.streamRooms,this.state.userId,this.state.username,item.ProfileImage)
 

  

  }} class={'btn btn-primary'} style={{width:'50%', borderRadius:9, padding:10,alignItems:'center',display:'flex',justifyContent:'center',marginBottom:60}} type={'button'}>UnMod</Button>:null}

 



 {this.props.UserLevel == "1" || this.state.isMod == true ||this.state.isAdmin == true?<Button onClick={async()=>{
 SocketUtills.emitPushToBan(this.props.streamRooms,this.state.userId,this.state.username,item.ProfileImage);
 //console.log(this.state.userId)
 
} } style={{width:'50%', borderRadius:9, padding:10,alignItems:'center',display:'flex',justifyContent:'center',marginBottom:20}}>
 <p style={{fontWeight:'800'}}>Ban</p>
 </Button>:null}

 {this.props.UserLevel == "1" || this.state.isMod == true ||this.state.isAdmin == true?<Button onClick={async()=>{
 SocketUtills.emitUnBan(this.props.streamRooms,this.state.userId,this.state.username,item.ProfileImage);
 //console.log(this.state.userId)
 
} } style={{width:'50%',borderRadius:9, padding:10,alignItems:'center',display:'flex',justifyContent:'center',marginBottom:60}}>
 <p style={{fontWeight:'800'}}>UnBan</p>
 </Button>:null}



 <div style={{width:'100%',flexDirection:'column',display:'flex',alignItems:'center'}}>


{this.props.UserLevel == "1" || this.state.isMod == true && Utils.getCurrentType() == "STREAMER" ||this.state.isAdmin == true || this.state.isMod == true?<Button onClick={async()=>{
SocketUtills.emitStreamPushMute(this.props.streamRooms,this.state.username,this.state.userId,true);

} } style={{width:'50%',borderRadius:9, padding:10,marginRight:5,alignItems:'center',display:'flex',justifyContent:'center',marginBottom:20}}>
<p style={{fontWeight:'800'}}>Mute user from everyone</p>
</Button>:null}

{this.props.UserLevel == "1" || this.state.isMod == true && Utils.getCurrentType() == "STREAMER" ||this.state.isAdmin == true || this.state.isMod == true?<Button onClick={async()=>{
SocketUtills.emitStreamPushMute(this.props.streamRooms,this.state.username,this.state.userId,false);

} } style={{width:'50%', borderRadius:9, padding:10,marginRight:5,alignItems:'center',display:'flex',justifyContent:'center',marginBottom:20}}>
<p style={{fontWeight:'800'}}>UnMute user from everyone</p>
</Button>:null}


</div>

  

 
 {document.getElementById(this.state.streamId) != null  ?<Button onClick={()=>{
 
 
 
var video = document.getElementById(this.state.streamId);
 
video.muted = !video.muted;

  

}} class={'btn btn-primary'} style={{width:'50%', borderRadius:9, padding:10,alignItems:'center',display:'flex',justifyContent:'center',marginBottom:20}} type={'button'}>{document.getElementById(this.state.streamId).muted == true?"UnMute":"Mute"}</Button>:null}
 


</div>



 </div>
))}

 

 </div>
 </Modal.Body>
 </Modal>
 
 {this.state.otherViewSrc.length > 0 ?  
<div style={{display:'none'}}>
{
this.state.otherViewSrc.map((item,index) => (<div><Video stream={item} /></div>))
}
</div>:<></>
}
 

{this.state.LiveHasEnded? 
<div style={{width:'100%',display:'flex',height:'50%',alignItems:'center',flexDirection:'column',justifyContent:'center',alignSelf:'center',position:'absolute',zIndex:0,padding:50}}>


<p style={{fontSize:20}}>Speaker Has Ended</p>


</div> : null}

{this.state.RoomMute && this.state.isBanned == false? 
<div style={{width:'100%',display:'flex',height:'50%',alignItems:'center',flexDirection:'column',justifyContent:'center',alignSelf:'center',position:'absolute',zIndex:0,padding:50}}>


<p style={{fontSize:20}}>You have been Muted</p>


</div> : null}


{this.state.isBanned? 
<div style={{width:'100%',display:'flex',height:'50%',alignItems:'center',flexDirection:'column',justifyContent:'center',alignSelf:'center',position:'absolute',zIndex:0,padding:50}}>


<p style={{fontSize:20}}>You have been Banned</p>


</div> : null}

 </div>
 );

 
 }
}



export default NewLiveStreamScreen;


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





const Video = ({ stream }) => {
    const localVideo = React.createRef();
  
    // localVideo.current is null on first render
    // localVideo.current.srcObject = stream;
  
    React.useEffect(() => {
      // Let's update the srcObject only after the ref has been set
      // and then every time the stream prop updates
      if (localVideo.current) {
          localVideo.current.srcObject = stream;
          localVideo.current.play();
          
    }

    }, []);
  
    return (<video playsInline={true} id={stream.id} src={stream} playing webkit-playsinline={true}  ref={localVideo} autoplay={true} />);
  };