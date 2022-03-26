import React, {  useState } from 'react'
import { JVB_JWT_ISS, JVB_SERVER } from '../../consts';
import loadScript from "./LoadExternalApiJS";
import { useEthers } from '@usedapp/core';
import Progress from '../Utilities/Progress'
import { JVB_JWT_APP_SECRET, JVB_JWT_AUD, JITSI_SERVER_DOMAIN , RTMP_URL } from '../../consts';
import { useNavigate } from 'react-router-dom'

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default function Meet(props) {
  const [loading, setLoading] = useState(true);
  const { chainId } = useEthers()
  const roomName =  uuidv4()
  const navigate = useNavigate();

  React.useEffect(async() => {
    let jwt = generateJwt()
    console.log(jwt)
    startMeeting(jwt)
  }, []);

  const generateJwt = () => {
    const sign = require('jwt-encode');
    const data = {
      context: {
        user: {
          avatar: null,
          name: "Shawn",
          email: "shawn@gmail.com",
          affiliation: "owner"
        }
      },
      aud: JVB_JWT_AUD,
      iss: JVB_JWT_ISS,
      sub: JITSI_SERVER_DOMAIN,
      room: roomName
    }
    const jwt = sign(data, JVB_JWT_APP_SECRET );
    return jwt;
  }

  const startMeeting = (jwt) => {
    if (window.JitsiMeetExternalAPI) startConference(jwt);
    else{
      loadScript(() => {
        startMeeting(jwt);
      });
    }
  }

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const jitsiContainerStyle = {
    display: (loading ? 'none' : 'block'),
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 999909999,
    backgroundColor: '#0d0415',
    color: '#fff'
  }

  function startConference(jwt) {

    try {
        const domain = JVB_SERVER;
        setLoading(false);
        var options = {
            width: '100%',
            roomName: roomName,
            parentNode: document.getElementById('jitsi-container'),
            interfaceConfigOverwrite: {
              SHOW_JITSI_WATERMARK: false,
              filmStripOnly: false,
            },
            configOverwrite: {
                disableSimulcast: false,
                dynamicBrandingUrl: 'https://raw.githubusercontent.com/prayagsingh/mockserver/main/bloquelabs/jitsibrand.json',
            },
            jwt: jwt
        }
        const api = new window.JitsiMeetExternalAPI(domain, options);
        api.addEventListener('videoConferenceJoined', () => {
          setLoading(false);
          api.startRecording({
            mode: 'stream', //recording mode, either `file` or `stream`.
            rtmpStreamKey: RTMP_URL, //the RTMP stream key.
          });
        });
        api.addEventListener('videoConferenceLeft', () => {
          navigate('/home')
        })
    } catch (error) {
        console.error('Failed to load Video API', error);
    }
  }
  
  return (
    <div style={containerStyle}>
      { loading && <Progress message="Please wait while we are connecting you to your meeting" active={loading}/> }
      <div id="jitsi-container" style={jitsiContainerStyle}>
      </div>
    </div>
  )
}
