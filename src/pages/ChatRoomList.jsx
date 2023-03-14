import React, { Component } from 'react';

import SocketUtils from '../components/SocketUtil';


import Utils from '../Utility/UtilsChat';
import Utills from '../Utility/Utils';

import '../components/styless.css';

import 'font-awesome/css/font-awesome.min.css';
import  'bootstrap/dist/css/bootstrap.css';
import {button,Container,Card,Carousel,Badge,Modal, Button} from 'react-bootstrap';
import AuthApi from "../components/AuthApi";
import Cookies from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';

import '../components/Feed.css';
import SocketUtills from '../Utility/SocketUtillsChat';
import Preview from '../preview-url/src/preview';
import PreviewLive from '../preview-url/src/previewLive';
import Player from 'react-player';
import Previeww from '../preview-url/src/previeww';
import DialogUnite from '../components/DialogInviteChatroom';
import Dialogg from '../components/DialogFull';









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
 roomName:'',
 otherStreams: [],
 remoteList: [],
 dataSource:[],
 requestList: [],
 requests:false,
 selfSrc: null,
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
 muted:false,
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
 type:"",
 isLogin:false,
 isdisabled:false,
 isSent:false,
 isMod:false,
 isBanned:false,
 password:'',
 streamerMute:false,
 isStreamer: "null",
 
 };
 }




 componentDidMount = async() => {

 //console.log('componentDidMount');
 
 Utils.setListContainer(this)

 if(Cookies.get('SCOM')){

 }else{
 Utills.setUserNameId("user-"+(Math.random() + 1).toString(10).substring(7));
 Utills.setUserProfile('https://mymiix.com/public/assets/img/no-avatar.jpg');
 }
SocketUtills.emitListServer();



 


 };

 














 
 render() {
 const { countdiver, countHeart, listMessages,pinnedMessages } = this.state;


 
 return (
 <div style={{width:'100%', height:'100%'}}>
<div style={{width:'100%',display:'flex',alignItems:'center',padding:10,justifyContent:'space-between',borderBottom:'1px solid lightgrey'}}>
 <div style={{width:'100%'}}><h2>ChatRooms</h2></div>

 <Button onClick={()=>{

this.setState({isLogin:true})

 }}>Create Room</Button>
 </div>
<InfiniteScroll 
    dataLength={this.state.dataSource.length}
    
    style={{ display: 'flex', width:"100%", flexDirection: 'column',paddingBottom:20 }} //To put endMessage and loader to the top.
    
   

   
    //scrollableTarget="scrollableDiv"
    >
    
    
   {this.state.dataSource.length > 0 && this.state.dataSource.map((post,index)=>{


return(
<div onClick={()=>{
   window.location.href = 'https://mymiix.com/chatroom/'+post.name; 
}}  style={{width:'100%',position:'relative',cursor:'pointer',padding:20,borderBottom:'1px solid lightgrey'}}>
 <div style={{width:'100%',position:'relative',alignItems:'center',display:'flex',justifyContent:'space-between'}}>
<div style={{display:'flex',flexDirection:'column',alignItems:'left'}}>
<a href={'https://mymiix.com/chatroom/'+post.name}><h4>{post.name}</h4></a>
{post.isProtected == true ?<p>password protected</p>:null}
</div>
<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
<i className="fa fa-users"></i>
    <p>{post.participant.length}</p>
    
    </div>
</div>
</div>

)

   })
   
   }

    

    </InfiniteScroll>




<Modal
 
 show={this.state.isLogin}

 onHide={() => {
  this.setState({isLogin:false})



}}
   
 
 
 
 >

<Modal.Header>

<div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'space-between'}}>
<h4 style={{color:'black'}}>Create Room</h4>
<button
 
 onClick={ ()=>{this.setState({isLogin:false})}}>
 <img
 src={'https://mymiix.com/assets/ico_cancel.png'}
 class={'iconCancel'}
 />
 </button>
 </div>
</Modal.Header>
    <Modal.Body  style={{padding:0, margin:0,position:'relative',width:'100%',height:'100%',}}>
    
 <div
 style={{
 display:'flex',
 justifyContent: 'center',
 flexDirection:'column',
 padding:10
 }}>



<input value={this.state.roomName} placeholder={'Room Name'} onChange={(e)=>{
this.setState({
roomName: e.target.value
})

}} style={{width:'100%',padding:10,color:'black',border:'1px solid black'}} />
<input value={this.state.password} type={'password'}  placeholder={'password'} onChange={(e)=>{
this.setState({
password: e.target.value
})

}} style={{width:'100%',padding:10,color:'black',border:'1px solid black',marginTop:10}} />


 </div>
 </Modal.Body>
<Modal.Footer>

<div style={{width:'100%',display:'flex',alignItems:'center',marginTop:10,justifyContent:'end'}}>

<Button onClick={ ()=>{this.setState({isLogin:false})}}>Close</Button>

<Button style={{marginLeft:10}} onClick={ ()=>{
    
    if(this.state.roomName == ""){

    }else{
   
        SocketUtills.emitCreateRoom(this.state.roomName,this.state.password,null);
   
        this.setState({isLogin:false})
}
    }}>Create</Button>
</div>
</Modal.Footer>

 </Modal>

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



function UrlForMedia(dataBody,postimage) {

    if(dataBody != undefined){
          
    if (typeof(dataBody === 'string')) {
  
  const datapast = dataBody.split(/\s/);
  
  const content = datapast.map(function(word,i) {
    var separator = i < (datapast.length - 1) ? ' ' : '';
  
    if (word.match(/^https?\:\//)) {
      
      if(postimage == ""){
      if (word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?youtube\.com\/([a-zA-Z0-9_]+)/)){
        //console.log(word);
        return(<div  class={'VideoTube'}><Player controls={true} light={true} autoplay={true} playing={true} style={{height:200,backgroundColor:'black'}} width={'100%'} height={'200px'}  className={'react-player'} url={word} ></Player></div>)
      }
      
      else if(word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?soundcloud\.com\/([a-zA-Z0-9_]+)/)) {
      
        return(<div class={'VideoTube'} ><Player controls={true} style={{width:'100%', height:85,backgroundColor:'black'}} width={'100%'} height={'85px'}  className={'react-player'} url={word} ></Player></div>)
      }
      
      else if(word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?twitch\.tv\/([a-zA-Z0-9_]+)/)) {
      
        return(<div class={'VideoTube'}><Player controls={true} style={{width:'100%', height:200,backgroundColor:'black'}} width={'100%'} height={'200px'}  className={'react-player'} url={word} ></Player></div>)
      }
  
     else if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?track\/([a-zA-Z0-9_]+)/)) {
  
              
        if(postimage == ""){
      
          var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?track\//,'');
        return <div class={'VideoTube'} ><iframe 
        style={{width:'100%',height:85,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/track/'+U+''} ></iframe></div>
        }
      
      }
      
      if(word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?discord\.com\/widget/)) {
        return <div class={'VideoTube'} ><iframe style={{width:'100%',height:160}} allowTransparency={true} sandbox={"allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"} frameBorder="0" src={word} ></iframe></div>
        
      }
      
      if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?track\/([a-zA-Z0-9_]+)/)) {
  
              
        if(postimage == ""){
      
          var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?track\//,'');
        return <div class={'VideoTube'} ><iframe 
        style={{width:'100%',height:85,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/track/'+U+''} ></iframe></div>
        }
      
      }
  
  
      if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?episode\/([a-zA-Z0-9_]+)/)) {
  
              
        if(postimage == ""){
  
          var U =word.replace('https://open.spotify.com/episode/','');
        return <div class={'VideoTube'} ><iframe 
        style={{width:'100%',height:85,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed-podcast/episode/'+U+''} ></iframe></div>
        }
  
      }
  
      if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed-podcast\/?episode\/([a-zA-Z0-9_]+)/)) {
  
        
        if(postimage == ""){
  
          var U =word.replace('https://open.spotify.com/embed-podcast/episode/','');
        return <div class={'VideoTube'} ><iframe 
        style={{width:'100%',height:85,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed-podcast/episode/'+U+''} ></iframe></div>
        }
  
      }
  
  
      if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?album\/([a-zA-Z0-9_]+)/)) {
      
        
        if(postimage == ""){
      
          var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?album\//,'');
        return <div class={'VideoTube'} ><iframe 
        style={{width:'100%',height:200,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/album/'+U+''} ></iframe></div>
        }
      
      }
  
      if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?album\/([a-zA-Z0-9_]+)/)) {
  
              
        if(postimage == ""){
      
          var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?album\//,'');
        return <div class={'VideoTube'} ><iframe 
        style={{width:'100%',height:200,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/album/'+U+''} ></iframe></div>
        }
      
      }
      
      if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?playlist\/([a-zA-Z0-9_]+)/)) {
      
        
        if(postimage == ""){
      
          var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?playlist\//,'');
        return <div class={'VideoTube'} ><iframe 
         style={{width:'100%',height:200,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/playlist/'+U+''} ></iframe></div>
        }
      
      }
  
  
      if (word.match(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?playlist\/([a-zA-Z0-9_]+)/)) {
  
              
        if(postimage == ""){
      
          var U =word.replace(/http(?:s)?:\/\/(?:open\.)?spotify\.com\/?embed\/?playlist\//,'');
        return <div class={'VideoTube'} ><iframe 
        style={{width:'100%',height:200,borderRadius:10}} frameBorder="0" src={'https://open.spotify.com/embed/playlist/'+U+''} ></iframe></div>
        }
      
      }
      
      else if(word.match(/(http(?:s)?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/i)){

        return(<div  class={'VideoTube'}>

          <Previeww img={word} title={""} url={''}  />

        </div>)
      }

      else if(word.match(/http(?:s)?:\/\/?([a-zA-Z0-9_]+)\.?([a-zA-Z0-9_]+)/)){
      
      
      return(<div class={'VideoTube'} style={{justifyContent:'center',marginBlock:10,display:'flex',flexDirection:'column',alignItems:'center',alignContent:'center'}}>
      
  
  
   <PreviewLive url={word} />
  
   
            
            </div>)
      
  /*return(<a style={{paddingLeft:5,marginBottom:0}} href={word} >{word}</a>)*/
  
      }
      
      }
      
        }
  else{
  //return(<p>{separator + word}</p>)
  }
  
  
  })
  
  
  const contents = datapast.map(function(word,i) {
    var separator = i < (datapast.length - 1) ? ' ' : '';
  
  
    if (word.match(/^https?\:\//)) {
  
  if(postimage == ""){
  if (word.match(/http(?:s)?:\/\/(?:www\.)?youtube\.com\/([a-zA-Z0-9_]+)/)){
    
  }
  
  else if(word.match(/http(?:s)?:\/\/(?:www\.)?soundcloud\.com\/([a-zA-Z0-9_]+)/)) {
  
  }
  else if(word.match(/http(?:s)?:\/\/(?:www\.)?(?:m\.)?twitch\.tv\/([a-zA-Z0-9_]+)/)) {
  
  }
  
  }
  
  else{
    return(<a style={{paddingLeft:5,marginBottom:0,flexWrap:'wrap'}} href={word} >{word.length > 40 ? word.substring(0,40)+'...' : word }</a>)
   }
  
    }
  else{
  
  if (word.match(/#(\w+)/g)) {
  
  }
  else  if (word.match(/@(\w+)/g)) {
    return(<a href={word} style={{}}>{separator}{word}</a>);
  }
  else{
  
    return(word+separator)
  }
  
  }
  
  
  })
  
  
  const contentss = datapast.map(function(word,i) {
    var separator = i < (datapast.length - 1) ? ' ' : '';
  
    if (word.match(/#(\w+)/g)) {
  
  return(<Badge href={word} style={{padding:10, marginBottom:5}} pill variant="light"><a href={word}>{word}</a></Badge>);
    }
    else if (word.match(/@(\w+)/g)){
      
    }
  
  
  
  })
  
  
  return(
    <div style={{flexDirection:'row',width:'100%',flexWrap:'wrap',marginBottom:20}}>
  <div style={{flexDirection:'row', width:'100%', display:'flex',flexWrap:'wrap'}}>{contents}</div>
  <div style={{flexDirection:'row', display:'flex',flexWrap:'wrap'}}>{contentss}</div>
  {content}
  </div>
  
  )
      }
    }
  
  
  }


