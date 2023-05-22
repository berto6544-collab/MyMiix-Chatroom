
import React from 'react';

import './App.css';
import { BrowserRouter as Router, Redirect, Route,Switch } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';

import AuthApi from "./components/AuthApi";
import Cookies from 'js-cookie';
import Utils from './Utility/AuthUtils';
import Utills from './Utility/Utils';
import SocketUtillss from './Utility/SocketUtillsChat';
import * as Themes from './Utility/Theme';
import { userData } from './API/API';


const Chatroom = React.lazy(() =>  import( "./pages/ChatRoomStart"));
const ChatroomList = React.lazy(() =>  import( "./pages/ChatRoomList"));
let themme = "light";



Utills.setUserId(Cookies.get('userId'));




//ChatRoom
SocketUtillss.handleBanList();
SocketUtillss.handleBanListClient();
SocketUtillss.handleDisconnect();
SocketUtillss.handleJoinClientPinnedComments();
SocketUtillss.handleModList();
SocketUtillss.handleModListClient();
SocketUtillss.handleMute();
SocketUtillss.handleOnAdminMute();
SocketUtillss.handleOnExchange();
SocketUtillss.handleOnJoinClient();
SocketUtillss.handleOnLeave();
SocketUtillss.handleOnLeaveClient();
SocketUtillss.handleOnLeaveClientt();
SocketUtillss.handleOnLeaveall();
SocketUtillss.handleOnMessage();
SocketUtillss.handlePinnedComments();
SocketUtillss.handleStreamPushMute();
SocketUtillss.handleUnMute();
SocketUtillss.handleRoomList();
SocketUtillss.handlePassword();









const readTheme = () =>{
    themme =  reactLocalStorage.get('theme')
   
    if(themme){
     Utils.setThemeMode(themme)
     document.body.style.backgroundColor = Themes[themme].BackgroundColor;
     document.body.style.color = Themes[themme].Color;
    }else{
    Utils.setThemeMode('light');
    document.body.style.backgroundColor = Themes['light'].BackgroundColor;
    document.body.style.color = Themes['light'].Color;
     
    }
 
    return themme;
  }



function App() {
const [auth, setAuth] = React.useState("");
const [userid,setuserId] = React.useState(0);
const [loading,setloading] = React.useState(false);
const [dataSource,setDataSource] = React.useState([]);
const [theme,setTheme] = React.useState(Utils.getThemeMode());
const [name, setName] = React.useState('');
const [username, setUserName] = React.useState('');
const [profile, setProfile] = React.useState('');
const [verification, setVerification] = React.useState(0);
const [StripeAccount, setStripeAccount] = React.useState('');
const[userType,setuserType] = React.useState("");







const readCookie = () =>{
  const token =  Cookies.get('SCOM');
  const userId = Cookies.get('userId');
  if(Cookies.get('SCOM')){
    
    setAuth(token);
    setuserId(userId);

    userData()
    .then((responseJSON)=> {
       
      reactLocalStorage.setObject('user',responseJSON);
      
      setDataSource(responseJSON);
      reactLocalStorage.setObject('user',responseJSON);
      setName(responseJSON[0].Name)
      setProfile(responseJSON[0].ProfileImage)
      setUserName(responseJSON[0].UserName)
      setuserType(responseJSON[0].UserType);
      setStripeAccount(responseJSON[0].AccountToken)
      Utils.setAccountPayment(responseJSON[0].AccountToken)
      setVerification(responseJSON[0].VerificationFollowers)
      Utills.setUserProfile(responseJSON[0].ProfileImage)
      Utills.setUserId(Cookies.get('userId'))
      Utills.setUserNameId(responseJSON[0].UserName)
      Utills.setPlanType(responseJSON[0].UsersStat)

    
    })
    
    
  
      
  
    

    

 
  

    

  }else{
    setAuth("");
    setDataSource([])
   
  }
}




document.addEventListener('DOMContentLoaded',function(event){
    setloading(true)


})


React.useEffect(() =>{
    readCookie();
    readTheme();
    
  
    
    
},[])

    return (
        
        <AuthApi.Provider value={{auth,setAuth,userid,setuserId,dataSource,setDataSource,theme,setTheme,username,name,profile,StripeAccount,verification}}>
        
        
        <Router   >
         <React.Suspense fallback={<div></div>}>
             <Routes dataSource={dataSource.length > 0 ? dataSource :[]} />
         
         
         </React.Suspense>
         </Router>
         
        
         
        </AuthApi.Provider>
        
        
    );
}


const Routes = ({dataSource}) =>{
    const Auth = React.useContext(AuthApi);

    return(

        <Switch>
            
            
            
            
            
            
            <Route path={"/chatroom/:room"} exact  auth={Auth.auth} component={Chatroom}  />
            <Route path={"/chatroom"} exact  auth={Auth.auth} component={ChatroomList}  />
            
            <ProtectedRoute path={"/"} exact dataSourcce={dataSource} auth={Auth.auth} component={ChatroomList}  />
            
            
            
            
            
          


            
           
        </Switch>
    )
}


const ProtectedRoute = ({auth, component:Component,dataSourcce})=>{
    return(

        
        <Route 
        exact
        
        
        render={()=>auth != ""?(
            <div>
           
            <Component dataSource={dataSourcce} />
            
            </div>
        ):(
            
            <Component dataSource={dataSourcce} />
            
            
        )}
        />

        
    )

}



const ProtectedRoutte = ({auth,dataSourcce, component:Component,...rest})=>{
    return(
        <Route 
        exact
        
        {...rest}
        render={()=>Cookies.get('SCOM')?(
         
            <Component dataSource={dataSourcce} />
        ):(
            
          
             <Redirect to="/" />
            
         
        )}
        />
    )

}

const ProtectedAcountRoute = ({auth, component:Component,...rest})=>{
    return(
        <Route 
        exact
      
        {...rest}
        render={()=>auth !== ""?(
         
           
            <Component/>
            
           
        ):(
            <Redirect to="/" />
        )}
        />
    )

}



const ProtectingRoutte = ({path:Patth, component:Component,...rest})=>{
    return(
        <Route 
        path={Patth}
        exact
      
        {...rest}
        render={()=>(<Component/>)}
            
            
       
        />
    )

}



const ProtectedLogin = ({auth, component:Component,...rest})=>{
    return(
        <Route 
        exact
       
        {...rest}
        render={()=>Cookies.get('SCOM')?(
           <Component/>
        ):(
            <Redirect to="/" />
        )}

        />
    )

}


export default App;