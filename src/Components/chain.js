import React from "react";
import network_img from '../images/network.svg'
import './chain.css'
const Chain = () =>{
    window.ethereum.on('accountsChanged', (accounts) => {
        // connectWallet();
        console.log('famfam')
        if(accounts.length > 0){
            window.location.reload()
            }
            else{
              window.location.href='/';
            }
      })
      window.ethereum.on('chainChanged', async() =>{
        const chainId = await window.ethereum.request({ method: 'eth_chainId'});
        if(chainId === '0x3'){
window.location.href='/';            
        }
      })
      const switchNetwork = async() =>{
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x3' }],
          })}
    return(
        <div>
            <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <img src={network_img} className="img-responsive center-block d-block mx-auto" alt="Sample"/>
                <h2 className="text-center">Wrong Network!</h2>
                <p className="text-center">Looks like you're connected to unsupported network</p>
                <div className="text-center">
                <button onClick={switchNetwork} id='chainbtn'>Connect to Ropsten Testnet</button>
                </div>
            </div>
        </div>
    </div>
   
        </div>
    )
}

export default Chain