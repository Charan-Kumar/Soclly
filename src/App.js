import './App.css';
import { Layout, Menu, Button, Row, Col } from 'antd';
import Sidebar from './components/Layout/Sidebar';
import Routes from './routes/Routes';
import { useEthers } from '@usedapp/core'
import WalletAddress from './components/Utilities/WalletAddress';
import logo from './assets/images/logo_symbol.svg'
import { login, getProfilesRequest } from '../src/lens/Api'
import React from 'react'
import { useNavigate } from "react-router-dom";


function App() {
  const { Header, Footer, Content } = Layout;
  const {  account, activateBrowserWallet,  deactivate, chainId } = useEthers();
  const navigate = useNavigate();

  React.useEffect(async() => {
    if( account ){
      await login()
      const { data } = await getProfilesRequest({ ownedBy: account })
      if( data.profiles.items.length === 0 ){
        navigate('/new_profile')
      }else{
        navigate('/home')
      }
    }
  }, [account]);


  const connectWallet = async() => {
    activateBrowserWallet()
  }

  return (
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: '0 20px' }} >
          <Row gutter={[16, 24]}>
            <Col flex={1} className="gutter-row">
              <div className="logo">
                <img src={logo} height={64} />
              </div>
            </Col>
            <Col flex={3} className="gutter-row">
            </Col>
            <Col flex={1} className="gutter-row" style={{ alignSelf: 'center'}}>
              { account ? 
                <WalletAddress address={account} /> : 
                <Button type="primary" size="large" shape="round" onClick={() =>  connectWallet()}>Connect</Button>
              }
            </Col>
          </Row>
        </Header>
      
      <Layout>
        { account && <Sidebar /> }
        <Content style={{ padding: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Routes />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
