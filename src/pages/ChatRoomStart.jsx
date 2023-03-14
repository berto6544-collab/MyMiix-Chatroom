import React from 'react';
import  'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import {Button,Container,Card,Carousel,Badge,Modal} from 'react-bootstrap';
import AuthApi from "../components/AuthApi";
import '../components/Feed.css';
import Player from 'react-player';
import { BrowserRouter as Router, Link, Redirect, Route,Switch } from 'react-router-dom';
import {FavoriteBorder,Favorite,ChatBubble} from '@material-ui/icons';
import Paymentss from '@material-ui/icons/Payment';
import Utils from '../Utility/AuthUtils';
import Dialogg from '../components/DialogFull';
import Unite from './ChatRoom';
import Cookies from 'js-cookie';
import Utills from '../Utility/Utils';
import Utilss from '../Utility/Utills';
import UtilsChat from '../Utility/UtilsChat';
import SocketUtils from '../components/SocketUtil';




function Profile(props) {

    const [dataSource,setDataSource] = React.useState([]);
    const [show,setShow] = React.useState(false);
    const [payment,setPayment] = React.useState("");
    const [streamKey,setstreamkey] = React.useState("");
    const [Profile,setProfile] = React.useState("");
    const Auth = React.useContext(AuthApi);

  



   React.useEffect(()=>{

 
    Utills.setUserType('VIEWER');
    Utilss.setCurrentType('VIEWER');
    UtilsChat.setCurrentType('VIEWER');

    
    if(Cookies.get('SCOM')){
    fetch(process.env.REACT_APP_API+'/userData',{method:'GET'})
    .then(response => response.json())
    .then(async(posts) => {
      //  const localsStream = await  navigator.mediaDevices.getUserMedia({audio:true,video:false})

        setDataSource(posts)
       
    if(Cookies.get('SCOM')){
        Utills.setStreamKey(props.match.params.room);
        //Utilss.setStreamKey(props.match.params.stream);
        
        setPayment("");
        Utills.setUserId(posts[0].UserId);
       
        Utills.setUserNameId(posts[0].UserName);

        Utills.setUserProfile(posts[0].ProfileImage);
       
    

    }

    
    
    else{
    if(Cookies.get('userId')){
    Utills.setStreamKey(props.match.params.room);

    setPayment("");
    setstreamkey(props.match.params.room);
    setProfile('https://mymiix.com/public/assets/img/no-avatar.jpg');
    Utills.setUserId(Cookies.get('userId'));
    Utills.setUserNameId("user-"+(Math.random() + 1).toString(10).substring(7));
    Utills.setUserProfile('https://mymiix.com/public/assets/img/no-avatar.jpg');
    
    }
    else{
    Utills.setStreamKey(props.match.params.room);
    let userid = (Math.random() + 1).toString(10).substring(7);
    Cookies.set('userId',userid);
    Utills.setUserId(userid);
    setPayment("");
    Utills.setUserNameId("user-"+(Math.random() + 1).toString(10).substring(7));
    setstreamkey(props.match.params.room);
    setProfile('https://mymiix.com/public/assets/img/no-avatar.jpg');
    Utills.setUserProfile('https://mymiix.com/public/assets/img/no-avatar.jpg');
    

    }
}
        

        
    });

}else{

    if(Cookies.get('userId')){
        Utills.setStreamKey(props.match.params.room);
    
        setPayment("");
        setstreamkey(props.match.params.room);
        setProfile('https://mymiix.com/public/assets/img/no-avatar.jpg');
        Utills.setUserId(Cookies.get('userId'));
        Utills.setUserNameId("user-"+(Math.random() + 1).toString(10).substring(7));
        Utills.setUserProfile('https://mymiix.com/public/assets/img/no-avatar.jpg');
        
        }
        else{
        Utills.setStreamKey(props.match.params.room);
        let userid = (Math.random() + 1).toString(10).substring(7);
        Cookies.set('userId',userid);
        Utills.setUserId(userid);
        setPayment("");
        Utills.setUserNameId("user-"+(Math.random() + 1).toString(10).substring(7));
        setstreamkey(props.match.params.room);
        setProfile('https://mymiix.com/public/assets/img/no-avatar.jpg');
        Utills.setUserProfile('https://mymiix.com/public/assets/img/no-avatar.jpg');
        
    
        }

}

},[])



    return ( 
        
    <div style={{width:'100%',display:'flex',height:'100%',flexDirection:'column',backgroundColor:'white',color:'black',  position:'absolute', margin: 0, padding:0 }} > 
    
    {dataSource.length > 0 && Cookies.get('SCOM') ?<Unite streamKeys={props.match.params.room} UserLevel={dataSource.length > 0 && dataSource[0].UserLevel == "1"? "1":""} streamRooms={props.match.params.room}  userName={Utills.getUserNameId()} profile={Profile} streamId={props.match.params.room}  Counter={0} FollowedData={0} SubsData={0}  userId={Utills.getUserId()}  MyuserName={Utills.getUserNameId()}  />: !Cookies.get('SCOM') ?<Unite streamKeys={props.match.params.room} UserLevel={""} streamRooms={props.match.params.room}  userName={Utills.getUserNameId()} profile={Profile} streamId={props.match.params.room}  Counter={0} FollowedData={0} SubsData={0}  userId={Utills.getUserId()}  MyuserName={Utills.getUserNameId()}  />:null}
    
    
    </div>
    
    )
}

export default Profile;