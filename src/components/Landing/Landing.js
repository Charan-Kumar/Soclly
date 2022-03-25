import React from 'react'
import logo from '../../assets/images/logo.svg'
import { useEthers } from '@usedapp/core'

export default function Landing() {

  const { account, activateBrowserWallet } = useEthers();
  const connectWallet = async() => {
    activateBrowserWallet()
  }

  return (
    <>
      { ! account ?
        <div id="banner_0" className="home-page-wrapper banner">
          <div className="home-page banner-page">
            <div className="banner-title-wrapper" data-edit="childWrapper">
              <div name="title" className="banner-title">
                <img src={logo} height={100} />
              </div>
              <div name="explain" className="banner-explain">
                <span>Decentralized Social Network</span>
              </div>
              <div name="content" className="banner-content">
                <span><font><font>Detailed description of the product, text such as what is it</font></font></span>
              </div>
              <div name="button" className="banner-button-wrapper"  onClick={() =>  connectWallet()}>
                <a href="#" data-edit="link,text" className="ant-btn banner-button ant-btn-primary">Connect Wallet</a>
              </div>
            </div>
            <div className="banner-image">
              <img src="https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*-wAhRYnWQscAAAAAAAAAAABkARQnAQ" width="100%" alt="img" />
            </div>
          </div>
        </div>
        :
        <></>
      }
    </>
  )
}
