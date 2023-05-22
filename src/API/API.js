
export async function userData(){

   const data = fetch(process.env.REACT_APP_API+'/userData',{method:'GET'})
    .then(response => response.json())

    return data;
}

export async function finduserData(displayName){
   const data =  fetch(process.env.REACT_APP_API+'/userDatta?id='+displayName,{method:'GET'})
.then(res=> res.json())
return data;
}



export async function UpdatedPinnedMessage(streamRooms){

   const data = await fetch(process.env.REACT_APP_API+'/UpdatePinnedLivecommenttsReactNative?streamkey='+streamRooms,{
        method: 'GET',
        headers:{
        'Accept':'json/application',
        'content-type':'json/application'
        }
        
        }).then((resp) =>resp.json())

        return data
}


