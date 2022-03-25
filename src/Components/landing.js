// import { ethers } from 'ethers';
import React,{useEffect} from 'react';
import './landing.css'
import {login} from'./testing';
var walletAddress ='' 
export const connectWallet = async () => {
    if(window.ethereum.isMetaMask) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId'});
      // const provider = new ethers.providers.Web3Provider(window.ethereum)
  // console.log(accounts)
      
      // else {
        let wallet = accounts[0];
        // console.log(wallet)
        walletAddress = wallet
        if(walletAddress !== ''){
          //  console.log(walletAddress)
          document.getElementById('connectbtn').innerHTML = wallet.substring(0,8) + "...." + wallet.substring(38,42)
          document.getElementById('connectbtn').classList.value = "nav-item address"
       login();
        // }
        
    return walletAddress
     }
    
    } else {
      alert('Please Install Metamask')
      document.location='https://metamask.io/download'
    }
  
  }

  
const Landing = () => {
useEffect(() =>{
  if(walletAddress !==''){
    window.location.href='/register';
  }
    // connectWallet()
})

return(
    <>
    <nav className='navbar navbar-dark bg-dark'>
    <div className="container-fluid justify-content-end">
        <div className="">
            <ul>
        <li onClick={connectWallet} className='btn btn-primary' id='connectbtn'>Connect</li>
        </ul>
        </div>
    </div>    
    </nav>
    <div>
          <h1 style={{"color":"blue"}}>  This is Decentralized Space!</h1>
    </div>
    </>
)
}

export default Landing;