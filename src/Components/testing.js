<<<<<<< HEAD
import React from "react";
import network_img from '../images/network.svg'
import {apolloClient} from "../Scripts/Apollo";
import { gql } from "@apollo/client";
import { GET_PROFILE, CREATE_PROFILE, CREATE_FOLLOW_TYPED_DATA } from "../Scripts/Query";
import './testing.css'



const Testing = () =>{
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
window.location.href='/home';            
        }
      })
      const switchNetwork = async() =>{
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x3' }],
          })}

      const createProfile = async (createProfileRequest) => {
          return apolloClient.mutate({
              mutation : gql(CREATE_PROFILE),
              variables : {
                  request : createProfileRequest
              }
          })
      }

      const getProfile = async (getProfileRequest) => {
          return apolloClient.query({
              query : gql(GET_PROFILE),
              variables : {
                  request : getProfileRequest
              }
          })
      }

      const createTypedFollowData = async (createTypedFollowData) => {
          return apolloClient.mutation({
              mutation : gql(CREATE_FOLLOW_TYPED_DATA),
              variables :{request :  createTypedFollowData}
          })
      }

    return(
        <div>
            <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <img src={network_img} className="img-responsive center-block d-block mx-auto" alt="Sample"/>
                <h2 className="text-center">Wrong Network!</h2>
                <div className="text-center">
                <button onClick={createProfile} id='chainbtn'>Create Test Profile</button>
                </div>
            </div>
        </div>
    </div>
   
        </div>
    )
}

export default Testing
=======
import { gql } from "@apollo/client";
import { ethers } from "ethers";
// import { getAddress } from "ethers/lib/utils";
import { apolloClient} from "./Apollo";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const getAddress=async() =>{
   var add= await  provider.listAccounts();
   console.log(add[0])
   return add[0]; 
}
export const login = async () => {
    const address = await getAddress()
    
    const challenge = await generateChallenge(address);
    console.log(challenge)
    const signature = await signText(challenge.data.challenge.text)
    
    const accessToken = await authenticate(address, signature)
    console.log(accessToken);
    localStorage.setItem('access_token',accessToken.data.authenticate.accessToken);
    localStorage.setItem('refresh_token',accessToken.data.authenticate.refreshToken);
}
const GENERATE_CHALLENGE = `
query($request: ChallengeRequest!){
    challenge(request : $request) {text}
}
`


export const generateChallenge = async (address) => {
    return apolloClient.query({
        query : gql(GENERATE_CHALLENGE),
        variables : {
            request: {address}
        }
    })
}
const AUTHENTICATE = `
mutation($request : SignedAuthChallenge!){
    authenticate(request : $request)
    {
        accessToken
        refreshToken
    }
}
`
export const authenticate = async (address , signature) => {
    return apolloClient.mutate({
        mutation : gql(AUTHENTICATE),
        variables : {
            request  :{
                address,
                signature
            } 
        }
    })
}
export const signText = async (data) => {
    
    const signer = provider.getSigner();
    console.log(signer)
    
    return await signer.signMessage(data);
}







>>>>>>> 318b3ec67d8f503e6e796e3eed87ddb5a22c03e1
