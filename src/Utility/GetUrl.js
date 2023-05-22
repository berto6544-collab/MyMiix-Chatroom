

export function OpenAboutMeUrl(url){
       

        
    if(url != undefined){
    
    if (typeof(url === 'string')) {
    
      // Split the content on space characters
      var words = url.toString().split(/\s/);
    
      // Loop through the words
      var contents = words.map(function(word, i) {
    
        // Space if the word isn't the very last in the set, thus not requiring a space after it
        var separator = i < (words.length - 1) ? ' ' : '';
    
        // The word is a URL, return the URL wrapped in a custom <Link> component
        if (word.match(/^https?\:\//)) {
    //  return <Text style={{color:'blue'}} onPress={()=>handlePress(word)} >{word}{separator}</Text>;
        // The word is not a URL, return the word as-is
        } 
        
        
        
        else {
  
          return word+separator;
        }
      });
  
      
  
    
      
      
    
    // The nested content was something else than a plain string
    // Return the original content wrapped in a <Text> component
    } else {
      return url.toString();
    }
    
    
    return (
      
        <div style={{alignItems:'center'}}>
          <p style={{width:'100%',textAlign:'center',marginBottom:10}}>{contents}</p>
         
          </div>
          
      
    );
  
    }
    
    
    }


export function OpenUrl(url,isTrue,setisTrue){
       

        
    if(url.length > 0){
    
    
    
      // Split the content on space characters
     

      






      var contentss = url.map(function(word, i) {
    
        
        
        
        if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/)) {
          return <a href={word.Link} style={{flexDirection:'row',width:'100%',position:'relative',textDecoration:'none',padding:10,borderRadius:10,marginBottom:10,backgroundColor:'lightgrey',display:'flex',alignItems:'center'}}>
           <img width={30} height={30} style={{marginRight:5,objectFit:'contain'}} src={'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'} />
             {word.LinkText}
             <i style={{position:'absolute',right:10}} class="fa fa-chevron-right"></i>

             </a>
            ;

          // The word is not a URL, return the word as-is
          } 
  
          else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?twitch\.tv\/([a-zA-Z0-9_]+)/)) {
            return <a href={word.Link} style={{flexDirection:'row',width:'100%',width:'100%',position:'relative',overflow:'hidden',width:'100%',display:'flex',textDecoration:'none',padding:10,borderRadius:10,marginBottom:10,backgroundColor:'lightgrey',display:'flex',alignItems:'center'}}>
              <img width={30} height={30} style={{marginRight:5,objectFit:'contain'}} src={'https://assets.stickpng.com/images/580b57fcd9996e24bc43c540.png'} />
              {word.LinkText}
              <i style={{position:'absolute',right:10}} class="fa fa-chevron-right"></i>

              </a>
              
               ;
            // The word is not a URL, return the word as-is
            } 
  
            else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?youtube\.com\/([a-zA-Z0-9_]+)/)) {
                return <a href={word.Link} style={{flexDirection:'row',width:'100%',position:'relative',textDecoration:'none',padding:10,borderRadius:10,marginBottom:10,backgroundColor:'lightgrey',display:'flex',alignItems:'center'}}>
                  <img width={30} height={30} style={{marginRight:5,objectFit:'contain'}} src={'https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png'} />
                  {word.LinkText}
                  <i style={{position:'absolute',right:10}} class="fa fa-chevron-right"></i>
                  </a>;
                // The word is not a URL, return the word as-is
              } 
  
              else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/)) {
                return <a href={word.Link} style={{flexDirection:'row',width:'100%',position:'relative',textDecoration:'none',padding:10,borderRadius:10,marginBottom:10,backgroundColor:'lightgrey',display:'flex',alignItems:'center'}}>
                  <img width={30} height={30} style={{marginRight:5,objectFit:'contain'}} src={'https://cdn-icons-png.flaticon.com/512/3621/3621435.png'} />
                  {word.LinkText}
                  <i style={{position:'absolute',right:10}} class="fa fa-chevron-right"></i>
                  </a>
                  ;
               
                } 
  
                else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9_]+)/)) {
                    return <a href={word.Link} style={{flexDirection:'row',width:'100%',position:'relative',textDecoration:'none',padding:10,borderRadius:10,marginBottom:10,backgroundColor:'lightgrey',display:'flex',alignItems:'center'}}>
                      <img width={30} height={30} style={{marginRight:5,objectFit:'contain'}} src={'https://cdn-icons-png.flaticon.com/512/124/124010.png'} />
                      {word.LinkText}
                      <i style={{position:'absolute',right:10}} class="fa fa-chevron-right"></i>
                      </a>
                      ;
                    
                  } 
                  else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?onlyfans\.com\/([a-zA-Z0-9_]+)/)) {
                    return <a href={word.Link} style={{flexDirection:'row',width:'100%',position:'relative',textDecoration:'none',padding:10,borderRadius:10,marginBottom:10,backgroundColor:'lightgrey',display:'flex',alignItems:'center'}}>
                      <img width={30} height={30} style={{marginRight:5,objectFit:'contain'}} src={'https://www.edigitalagency.com.au/wp-content/uploads/OnlyFans-logo-symbol-icon-png-blue-background.png'} />
                       {word.LinkText}
                       <i style={{position:'absolute',right:10}} class="fa fa-chevron-right"></i>
                       </a>
                       ;
                    // The word is not a URL, return the word as-is
                    } 
                    else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)|(?:open\.)?spotify\.com\/([a-zA-Z0-9_]+)/)) {
                        return <a href={word.Link} style={{flexDirection:'row',width:'100%',position:'relative',textDecoration:'none',padding:10,borderRadius:10,marginBottom:10,backgroundColor:'lightgrey',display:'flex',alignItems:'center'}}>
                          <img width={30} height={30} style={{marginRight:5,objectFit:'contain'}} src={'https://www.edigitalagency.com.au/wp-content/uploads/Spotify-Icon-png-rgb-black.png'} />
                          {word.LinkText}
                          <i style={{position:'absolute',right:10,top:0}} class="fa fa-chevron-right"></i>
                          </a>
                          ;
                        // The word is not a URL, return the word as-is
                      } 
  
                      else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?soundcloud\.com\/([a-zA-Z0-9_]+)/)) {
                      
                        return <a href={word.Link} style={{flexDirection:'row',width:'100%',position:'relative',textDecoration:'none',padding:10,borderRadius:10,marginBottom:10,backgroundColor:'lightgrey',display:'flex',alignItems:'center'}}>
                          <img width={30} height={30} style={{marginRight:5,objectFit:'contain'}} src={'https://e1.pngegg.com/pngimages/1001/845/png-clipart-somacro-45-300dpi-social-media-icons-soundcloud-soundcloud-logo-thumbnail.png'} />
                          {word.LinkText}
                          <i style={{position:'absolute',right:10}} class="fa fa-chevron-right"></i>
                          </a>
                         
                          ;                            
                          // The word is not a URL, return the word as-is
                        } 
  
                        else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?artstation\.com\/([a-zA-Z0-9_]+)/)) {
                            return <a href={word.Link} style={{flexDirection:'row',width:'100%',position:'relative',textDecoration:'none',padding:10,borderRadius:10,marginBottom:10,backgroundColor:'lightgrey',display:'flex',alignItems:'center'}}>
                              <img width={30} height={30} style={{marginRight:5,objectFit:'contain'}} src={'https://cdn-icons-png.flaticon.com/512/5968/5968654.png'} />
                              {word.LinkText}
                              <i style={{position:'absolute',right:10}} class="fa fa-chevron-right"></i>
                              </a>
                              
                             ;                            
                                // The word is not a URL, return the word as-is
                          } 
        
                          else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?github\.com\/([a-zA-Z0-9_]+)/)) {
                            return <a href={word.Link} style={{flexDirection:'row',width:'100%',position:'relative',textDecoration:'none',padding:10,borderRadius:10,marginBottom:10,backgroundColor:'lightgrey',display:'flex',alignItems:'center'}}>
                              <img width={30} height={30} style={{marginRight:5,objectFit:'contain'}} src={'https://cdn-icons-png.flaticon.com/512/25/25231.png'} />
                              {word.LinkText}
                              <i style={{position:'absolute',right:10}} class="fa fa-chevron-right"></i>
                              </a>
                             
                              ;                              
                                // The word is not a URL, return the word as-is
                            }
                            else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?cash\.app\/([a-zA-Z0-9_]+)/)) {
                              return <></>;
                              // The word is not a URL, return the word as-is
                              }
                              else if (word.Link.match(/http(?:s)?:\/\/(?:www\.)?mymiix\.com\/@([a-zA-Z0-9_]+)/)) {
                                return <a href={word.Link} style={{flexDirection:'row',width:'100%',position:'relative',textDecoration:'none',padding:10,borderRadius:10,marginBottom:10,backgroundColor:'lightgrey',display:'flex',alignItems:'center'}}>
                                  <img width={30} height={30} style={{marginRight:5,objectFit:'contain'}} src={'https://image.winudf.com/v2/image1/Y29tLm1pbmdsZW1paXhfaWNvbl8xNjQ4ODU4NzUwXzA2MA/icon.png?w=184&fakeurl=1'} />
                                  {word.LinkText}
                                  <i style={{position:'absolute',right:10}} class="fa fa-chevron-right"></i>
                                  </a>
                                  
                                  ;                               
                                  
                                  // The word is not a URL, return the word as-is
                                } 
  
                  
      
      });
  
    
      
      
    
    // The nested content was something else than a plain string
    // Return the original content wrapped in a <Text> component
    
    
    
    return (
      
        <div style={{width:'100%',textAlign:'center',marginBottom:10,padding:30}}>
          
          {url.length > 0 ?<div style={{width:'100%'}}>
            {isTrue == false ?<div style={{width:'100%',display:'flex',flexDirection:'column',position:'relative',alignItems:'center'}}>{contentss[0]}<i style={{cursor:'pointer'}} onClick={()=>{setisTrue(true)}} class="fa fa-chevron-down"></i></div>:<div style={{width:'100%',display:'flex',flexDirection:'column',position:'relative',alignItems:'center'}}>{contentss}<i style={{cursor:'pointer'}} onClick={()=>{setisTrue(false)}} class="fa fa-chevron-up"></i></div>}
  
          </div>:null}
          </div>
          
      
    );
  
    }
    
    
    }

export function UrlForMedia(dataBody,postimage) {

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