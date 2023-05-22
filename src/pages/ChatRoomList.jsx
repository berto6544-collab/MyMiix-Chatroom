import React, { Component } from 'react';
import Utils from '../Utility/UtilsChat';
import Utills from '../Utility/Utils';
import '../components/styless.css';
import 'font-awesome/css/font-awesome.min.css';
import  'bootstrap/dist/css/bootstrap.css';
import {Modal, Button} from 'react-bootstrap';
import Cookies from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../components/Feed.css';
import SocketUtills from '../Utility/SocketUtillsChat';











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


