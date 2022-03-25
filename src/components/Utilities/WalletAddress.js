import { shortenAddress } from '@usedapp/core';
import React, { useState } from 'react'
import EthereumSvg from '../../assets/images/ethereum.svg';

export default function WalletAddress(props) {
  const { address, displayCenter } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) =>{
    navigator.clipboard.writeText(text)
  }
  
  return (
    <div className="walletAddress" onClick={() => {
        setCopied(true)
        handleCopy(address)
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
      style={ displayCenter ? { margin: '10px auto' } : { margin: '5px 0'} }
      >
      <img src={EthereumSvg} height="16" width="16" alt="Ethereum Logo" />
      <span className="has-text-weight-bold">{ copied ? "Copied !" : address ? shortenAddress(address) : "" }</span>
    </div>
  )
}
