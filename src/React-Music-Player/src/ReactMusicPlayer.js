import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import shuffle from 'shuffle-array';

import { Waypoint } from 'react-waypoint';


class ReactMusicPlayer extends Component {
    constructor(props){

        super(props);
        this.player = React.createRef()
        this.state = {
            active: this.props.songs[0],
            current: 0,
            progress: 0,
            random: false,
            repeat: false,
            mute: false,
            play: false,
            songs: this.props.songs,
            showList:false
        }

    

    }
   

    componentDidMount = () => {
        let playerElement = this.player;
        playerElement.addEventListener('timeupdate', this.updateProgress);
        playerElement.addEventListener('ended', this.end);
        playerElement.addEventListener('error', this.next);
    }

    componentWillUnmount = () => {
        let playerElement = this.player;
        playerElement.removeEventListener('timeupdate', this.updateProgress);
        playerElement.removeEventListener('ended', this.end);
        playerElement.removeEventListener('error', this.next);
    }

    setProgress = (e) => {
        let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
        let width = target.clientWidth;
        let rect = target.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let duration = this.player.duration;
        let currentTime = (duration * offsetX) / width;
        let progress = (currentTime * 100) / duration;

        this.player.currentTime = currentTime;
        this.setState({ progress: progress });
        this.play();
    }

    updateProgress = () => {
        let duration = this.player.duration;
        let currentTime = this.player.currentTime;
        let progress = (currentTime * 100) / duration;

        this.setState({ progress: progress });
    }

    play = () => {
        this.setState({ play: true });
        this.player.play();
        //this.props.dataPress();
    }

    pause = () => {
        this.setState({ play: false });
        this.player.pause();
        //this.props.dataPress();
    }

    toggle = () => {
        this.state.play ? this.pause() : this.play();
    }

    end = () => {

        
        var total = this.state.songs.length;
        if(this.state.current < total){
        var current = (this.state.repeat) ? this.state.current : (this.state.current < total - 1) ? this.state.current + 1 : total - 1;
        var active = this.state.songs[current];

        this.setState({ 
            current: current, 
            active: active,
            progress: 0 
            
            });

        this.player.src = active.url;
        this.play();
        }else{
            (this.state.repeat) ? this.play() : this.setState({ play: false });

        }

    }

    next = () => {
        var total = this.state.songs.length;
        var current = (this.state.repeat) ? this.state.current : (this.state.current < total - 1) ? this.state.current + 1 : 0;
        var active = this.state.songs[current];

        this.setState({ 
            current: current, 
            active: active,
            progress: 0 
            
            });

        this.player.src = active.url;
        this.play();
    }

    previous = () => {
        var total = this.state.songs.length;
        var current = (this.state.current > 0) ? this.state.current - 1 : total - 1;
        var active = this.state.songs[current];

        this.setState({ current: current, active: active, progress: 0 });

        this.player.src = active.url;
        this.play();
    }

    randomize = () => {
      //  var s = shuffle(this.state.songs.slice());

      //  this.setState({ songs: (!this.state.random) ? s : this.state.songs, random: !this.state.random });
    }

    repeat = () => {
       // this.setState({ repeat: !this.state.repeat });
    }

    toggleMute = () => {
        let mute = this.state.mute;

        this.setState({ mute: !this.state.mute });
        this.player.volume = (mute) ? 1 : 0;
    }

    render () {

        const { active, play, progress } = this.state;

        let coverClass = classnames('player-cover', {'': !!!active.cover });
        let playPauseClass = classnames('fa', {'fa-pause': play}, {'fa-play': !play});
        let volumeClass = classnames('fa', {'fa-volume-up': !this.state.mute}, {'fa-volume-off': this.state.mute});
        let repeatClass = classnames('player-btn big repeat', {'active': this.state.repeat});
        let randomClass = classnames('player-btn big random', {'active': this.state.random });

        return (

            <Waypoint
    scrollableAncestor={window}
    //onEnter={this.play} 
    onLeave={this.pause}
     >
            <div className="player-container">

            {this.state.showList == true ?
                <div style={{position:'absolute',zIndex:20,backgroundColor:'black',width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div style={{width:'100%',padding:10}}>
                <span onClick={()=>{

this.setState({
    showList:false
})
                }} style={{position:'absolute',left:10,fontWeight:'bold'}}><i style={{color:'white'}} class="fa fa-times"></i></span>

                </div>
                
                {
                <div style={{overflowY:'scroll',height:'100%',width:'100%'}}>{    
                this.state.songs.length > 0 ?
                this.state.songs.map((posts,index)=>{
                    return(
                    <div onClick={()=>{

                        var active = this.state.songs[index];

                        this.setState({ current: index, active: active, progress: 0
                         });
                
                        this.player.src = active.url;
                        this.play();
                        this.setState({
                            showList: false
                        })

                    }} style={{width:'100%',height:50,padding:10,display:'flex',alignItems:'center'}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <p style={{color:'white'}}>Track {index+1}</p>
                    
                    </div>
                    </div>
                    )
                })
                
                :<></>
                } 
                </div>}

                </div>:<></>}

                <audio src={active.url}
                 onPlay={this.play} onPause={this.pause} 
                 autoPlay={this.state.play}
                  preload="auto" 
                //onEnded={this.end}
                  ref={c=> this.player = c}></audio>

                <img className={coverClass}  src={active.cover} style={{objectFit:'cover',backgroundColor:'black'}}></img>



                <div className="player-progress-container" onClick={this.setProgress}>
                    <span className="player-progress-value" style={{width: progress + '%'}}></span>
                    <span className="player-progress-end" ></span>
                </div>

                
                <div className="artist-info">
                    <h2 className="artist-name">{active.artist.name}</h2>
                    <h3 className="artist-song-name">{active.artist.song}</h3>
                </div>

                


                <div className="player-options">
                    <div style={{width:280}} className="player-buttons player-controls">
                        <button onClick={this.toggle} className="player-btn big" title="Play/Pause">
                            <i className={playPauseClass} />
                        </button>

                        <button className={repeatClass} onClick={this.repeat} title="Repeat">
                            <i className="fa fa-repeat" />
                        </button>

                        <button className={randomClass} onClick={this.randomize} title="Shuffle">
                            <i className="fa fa-random" />
                        </button>

                        <button className="player-btn big" onClick={this.previous} title="Previous Song">
                            <i className="fa fa-backward" />
                        </button>

                        <button  className="player-btn big" onClick={this.next} title="Next Song">
                            <i className="fa fa-forward" />
                        </button>
                        <button  className="player-btn big" onClick={()=>{this.setState({
                            showList:true
                        })
                        }} title="Next Song">
                        <i class="fa fa-list"></i>
                        </button>
                    </div>

                    <div className="player-buttons">
                        {/*<button className="player-btn big volume" onClick={this.toggleMute} title="Mute/Unmute">
                            <i className={volumeClass} />
                        </button>

                        <button className={repeatClass} onClick={this.repeat} title="Repeat">
                            <i className="fa fa-repeat" />
                        </button>

                        <button className={randomClass} onClick={this.randomize} title="Shuffle">
                            <i className="fa fa-random" />
                        </button>*/}
                    </div>

                </div>
                
            </div>
            </Waypoint>
        );
    }
}

ReactMusicPlayer.propTypes = {
    autoplay: PropTypes.bool,
    songs: PropTypes.array.isRequired
};

export default ReactMusicPlayer;
