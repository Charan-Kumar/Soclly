import React, {  useState } from 'react'
import { JVB_SERVER } from '../../consts';
import loadScript from "./LoadExternalApiJS";
import { useEthers } from '@usedapp/core';
import Progress from '../Utilities/Progress'
import { JVB_JWT_APP_SECRET, JVB_JWT_AUD, JVB_JWT_APP_ID,  JITSI_SERVER_DOMAIN } from '../../consts'


export default function Meet(props) {
  const [loading, setLoading] = useState(true);
  const { chainId } = useEthers()

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
            avatar: "",
            name: "",
            affiliation: "moderator"
        }
      },
      aud: JVB_JWT_AUD,
      iss: JVB_JWT_APP_ID,
      sub: JITSI_SERVER_DOMAIN
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
            roomName: "JitsiLivePeer",
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
        };
        const api = new window.JitsiMeetExternalAPI(domain, options);
        api.addEventListener('videoConferenceJoined', () => {
          setLoading(false);
        });


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
