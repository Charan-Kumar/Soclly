import './App.css';
import { Layout, Button, Row, Col } from 'antd';
import Sidebar from './components/Layout/Sidebar';
import Routes from './routes/Routes';
import WalletAddress from './components/Utilities/WalletAddress';
import logo from './assets/images/logo.svg'
import { login, getProfilesRequest } from '../src/lens/Api'
import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useEthers } from '@usedapp/core'


function App() {
  const { Header, Content } = Layout;
  const {  account } = useEthers();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(async() => {
    if( account ){
      await login()
      const { data } = await getProfilesRequest({ ownedBy: account })
      if( data.profiles.items.length === 0 ){
        navigate('/new_profile')
      }else{
        localStorage.setItem('profile_id', data.profiles.items[0].id)
        localStorage.setItem('wallet', data.profiles.items[0].ownedBy)
        navigate('/home')
      }
    }
  }, [account]);


  return (
    <Layout>
      { pathname !== '/stream' ?
        <>
          { localStorage.getItem('access_token') && <Header className="site-layout-sub-header-background" style={{ padding: '0 20px' }} >
              <Row gutter={[16, 24]}>
                <Col flex={1} className="gutter-row">
                  <div className="logo">
                    <img src={logo} height={50} />
                  </div>
                </Col>
                <Col flex={3} className="gutter-row">
                </Col>
                <Col flex={1} className="gutter-row" style={{ alignSelf: 'center', display: 'flex', justifyContent: 'flex-end'}}>
                  { localStorage.getItem('wallet') ? 
                    <>
                      <WalletAddress address={localStorage.getItem('wallet')} /> 
                    </>
                    : 
                    <Button type="primary" size="large" shape="round">Connect</Button>
                  }
                </Col>
              </Row>
            </Header>
          }
          
          <Layout>
            { localStorage.getItem('access_token') && <Sidebar /> }
            <Content>
              <div className={`${localStorage.getItem('access_token') !== null ? 'content-container': ''}`}>
                <Routes />
              </div>
            </Content>
          </Layout>
        </>
        :
        <Routes />
      }
    </Layout>
  );
}

export default App;
