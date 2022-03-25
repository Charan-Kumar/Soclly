import './App.css';
import { Layout, Menu, Button, Row, Col, Avatar } from 'antd';
import Sidebar from './components/Layout/Sidebar';
import Routes from './routes/Routes';
import WalletAddress from './components/Utilities/WalletAddress';
import logo from './assets/images/logo.svg'
import { login, getProfilesRequest } from '../src/lens/Api'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEthers } from '@usedapp/core'
import { UserOutlined } from '@ant-design/icons';


function App() {
  const { Header, Footer, Content } = Layout;
  const {  account } = useEthers();
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


  return (
    <Layout>
      { account && <Header className="site-layout-sub-header-background" style={{ padding: '0 20px' }} >
          <Row gutter={[16, 24]}>
            <Col flex={1} className="gutter-row">
              <div className="logo">
                <img src={logo} height={50} />
              </div>
            </Col>
            <Col flex={3} className="gutter-row">
            </Col>
            <Col flex={1} className="gutter-row" style={{ alignSelf: 'center', display: 'flex', justifyContent: 'flex-end'}}>
              { account ? 
                <>
                  <WalletAddress address={account} /> 
                </>
                : 
                <Button type="primary" size="large" shape="round">Connect</Button>
              }
            </Col>
          </Row>
        </Header>
      }
      
      <Layout>
        { account && <Sidebar /> }
        <Content>
          <div className="site-layout-background">
            <Routes />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
