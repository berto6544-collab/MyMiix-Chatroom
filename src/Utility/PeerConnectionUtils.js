import {
    RTCPeerConnection,
    //RTCIceCandidate,
    //RTCSessionDescription
  } from 'rtcmulticonnection-react-js';
  import Utils from './Utills';
  import Utills from './Utils';
  import SocketUtils from '../components/SocketUtil';
  const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };

  const peers = {};
  const container = Utils.getContainer();
  const getPeers = () => {
    return peers;
  };
  
  
  
  
  
  
  
  
  
  
  
  
  const createPC = (socketId, isOffer) => {
    const pc = new RTCPeerConnection(configuration);
    const container = Utils.getContainer();
    const localStream = Utils.getLocalStream();
    peers[socketId] = pc;
  
  
  
    if (Utils.getCurrentType() === 'STREAMER') {
      Utils.getLocalStream().getAudioTracks()[0].enabled = true;
      Utils.getLocalStream().getVideoTracks()[0].enabled = false;
    }
    if (Utils.getCurrentType() === 'VIEWER') {
      //console.log('Localstream: ',Utils.getLocalStream())
      Utils.getLocalStream().getAudioTracks()[0].enabled = false;
      Utils.getLocalStream().getVideoTracks()[0].enabled = false;
      
  
    }
  
    pc.addStream(localStream);
    pc.onicecandidate = function(event) {
      console.log('onicecandidate', event.candidate);
      
      if (event.candidate) {
        SocketUtils.emitExchangeServerCandidate(socketId, event.candidate,Utills.getStreamKey());
        
  
        // All ICE candidates have been sent
      }
    }
  
  
    pc.onicecandidate = function (event) {
      console.log('onicecandidate', event.candidate);
      if (event.candidate) {
        SocketUtils.emitExchangeServerCandidate(socketId, event.candidate,Utills.getStreamKey());
        broadcastMessage({
          type: 'candidate',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
      });
      }
    };
   
    pc.onicecandidate = (event) => {
      console.log('onicecandidate', event.candidate);
      if (event.candidate) {
        SocketUtils.emitExchangeServerCandidate(socketId, event.candidate,Utills.getStreamKey());
        broadcastMessage({
          type: 'candidate',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
      });
      }
    };
  
    const createOffer = () => {
      
      pc.createOffer(
        desc => {
          console.log('createOffer', desc);
          pc.setLocalDescription(
            desc,
            (event) => {
              console.log('setLocalDescription', pc.localDescription);
              SocketUtils.emitExchangeServerSdp(socketId, pc.localDescription,Utills.getStreamKey());
              broadcastMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            });
            },
            error => console.log('error : ' + error)
          );
        },
        error => console.log('error : ' + error)
      );
    };
  
    pc.onnegotiationneeded = () => {
      console.log('onnegotiationneeded');
      if (isOffer) {
        pc.createOffer().then(function(offer) {
          pc.setLocalDescription(
            offer,
            () => {
              console.log('setLocalDescription', pc.localDescription);
              SocketUtils.emitExchangeServerSdp(socketId, pc.localDescription,Utills.getStreamKey());
            },
            error => console.log('error : ' + error)
          );
        })
        .then(function() {
          // Send the offer to the remote peer through the signaling server
          //SocketUtils.emitExchangeServerSdp(socketId, pc.localDescription);
          createOffer();
         
          pc.onaddstream = event => {
            console.log('onaddstream', event.stream);
        
            container.setState({
            otherViewSrc: event.stream.toURL()
            
            });
          };
          pc.onremovestream = event => {
            console.log('onremovestream', event.stream);
          };
        
               // SocketUtils.emitExchangeServerSdp(socketId, pc.localDescription,Utills.getStreamKey());
            
  
        });
      
      }
    };
  
  
  
    pc.oniceconnectionstatechange = event => {
      console.log('oniceconnectionstatechange', event.target.iceConnectionState);
      if (event.target.iceConnectionState === 'completed') {
        setTimeout(() => {
          getStats();
        }, 1000);
      }
      if (event.target.iceConnectionState === 'connected') {
       // createDataChannel();
      }
    };
    pc.onsignalingstatechange = event => {
      console.log('onsignalingstatechange', event.target.signalingState);
    };
  
    
  
    return pc;
  };
  
  
  
  
  
  
  const exchange = data => {
    const pcPeers = PeerConnectionUtils.getPeers();
    const fromId = data.from;
    const localStream = Utils.getLocalStream();
    let pc;
    if (
      fromId === Utils.getStreamerSocketId() ||
      Utils.getStreamerSocketId() === null
    ) {
      if (fromId in pcPeers) {
        pc = pcPeers[fromId];
      } else {
        pc = createPC(fromId, false);
      }
      if (data.sdp) {
        console.log('exchange sdp', data);
        pc.setRemoteDescription(
         data.sdp,
          () => {
            if (pc.remoteDescription.type == 'offer')
              pc.createAnswer(
                desc => {
                  console.log('createAnswer', desc);
                  pc.setLocalDescription(
                    desc,
                    () => {
                      console.log('setLocalDescription', pc.localDescription);
                      SocketUtils.emitExchangeServerSdp(
                        fromId,
                        pc.localDescription,
                        Utills.getStreamKey()
  
                      );
  
                    
                      pc.onaddstream = (event) => {
                        console.log('onaddstream', event.stream);
                    
                        container.setState({
                        otherViewSrc: event.stream.toURL()
                        
                        });
                      };
                      pc.onremovestream = event => {
                        console.log('onremovestream', event.stream);
                      };
  
  
                    },
                    error => console.log('error : ' + error)
                  );
                },
                error => console.log('error : ' + error)
              );
          },
          error => console.log('error : ' + error)
        );
      } else {
        console.log('exchange candidate', data);
        pc.addIceCandidate(data.candidate);
      }
    }
  };
  
  const getStats = () => {
    const pcPeers = PeerConnectionUtils.getPeers();
    const pc = pcPeers[Object.keys(pcPeers)[0]];
    if (
      pc.getRemoteStreams()[0] &&
      pc.getRemoteStreams()[0].getAudioTracks()[0]
    ) {
      const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
      console.log('track', track);
      pc.getStats(
        track,
        function(report) {
          console.log('getStats report', report);
        },
        error => console.log('error : ', error)
      );
    }
  };
  
  const broadcastMessage = message => {
    for (let key in peers) {
      let pc = peers[key];
      if (!Utils.isNullOrUndefined(pc)) {
        if (pc.textDataChannel !== undefined && pc.textDataChannel !== null) {
          pc.textDataChannel.send(JSON.stringify(message));
        }
      }
    }
  };
  
  const PeerConnectionUtils = {
    getPeers,
    exchange,
    createPC,
    broadcastMessage,
    getStats,
   
  };
  
  export default PeerConnectionUtils;