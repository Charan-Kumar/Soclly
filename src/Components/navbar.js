import React,{useEffect} from 'react';
import './navbar.css'

var walletAddress ='' 
export const connectWallet = async () => {
    if(window.ethereum.isMetaMask) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId'});
  // console.log(accounts)
      if(chainId !== '0x3') {
        window.location.href='/chain';
      } 
      else {
        let wallet = accounts[0];
        // console.log(wallet)
        walletAddress = wallet
        if(walletAddress !== ''){
          //  console.log(walletAddress)
          document.getElementById('connectbtn').innerHTML = wallet.substring(0,8) + "...." + wallet.substring(38,42)
          document.getElementById('connectbtn').classList.value = "nav-item address"
        }
        
    return walletAddress
     }
    
    } else {
      alert('Please Install Metamask')
      document.location='https://metamask.io/download'
    }
  
  }
const Navbar = () => {
useEffect(() =>{
    connectWallet()
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
    </>
)
}

export default Navbar;