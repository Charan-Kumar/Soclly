import React,{useState} from 'react';
import './form.css'
import {CREATE_PROFILE} from "./Query";
import { gql } from "@apollo/client";
import {authenticatedApolloClient} from "./Apollo";
const Form = () =>{
    let [usernameState,setusernameState] = useState("");
    let [profilepicState,setProfilepicState] = useState("");
    let [followNFTState,setFollowNFTState] = useState("");
    let [currAddressState,setcurrAddressState] = useState("");
    let [feesState,setFeesState] = useState("");
    let [checkState,setCheckState] = useState(false);
    const CreateProfileRequest = [
        {
            // # User Name for the Profile must be unique
            handle : usernameState,
            // # IPFS link to the Profile Picture can be null
            profilePictureUri :profilepicState===""?null:profilepicState,
            // # Follow Module Metadata Can be null
            followModuleURI:followNFTState===""?null:followNFTState,
            // # Follow Module Params : 
            followModule : 
            {
                feeFollowModule: 
                {
                    amount : {
                        currency : currAddressState,
                        value : feesState===""?null:feesState // will be in eth
                    },
                    recipient : "0x536B0E7a5c571C71650c28142752E685F333c880" // ETH address of the receiver
                }
                ,
                emptyFollowModule: !checkState
            }   
        }]
    const handleUsername=(e) => {
 setusernameState(e.target.value);
    }
    const handleProfilepic=(e) => {
    setProfilepicState(e.target.value);
    }
    const handleFollowNFt=(e) => {
    setFollowNFTState(e.target.value);
    }
    const handleCurrAddress=(e) => {
    setcurrAddressState(e.target.value);
    }
    const handleFees=(e) => {
    setFeesState(e.target.value);
    }

    const handleCheck=(e) => {
        setCheckState(e.target.checked);
        }
    const showFees =(e)=>{
if(e.target.checked){
    document.getElementById('feesfield').style.display="block"
}
else{
    document.getElementById('feesfield').style.display="none"
}
    }
    return(
        <>
        <div className="container h-100 mt-3">
        <div className="row align-items-center h-100">
        <div className="col-6 mx-auto">
                <div className="card text-white justify-content-center bg-dark" id='cardcontainer'>
                    <div className='card-body'>
                    <h3 className="card-title text-center">Create Your Account</h3>
        <form>
    <div className="mb-3">
        <label className="form-label" htmlFor="inputUserName">Username*</label>
        <input type="text" onChange={handleUsername} className="form-control" id="inputUserName" placeholder="Username" required/>
        
    </div>
    <div className="mb-3">
        <label className="form-label" htmlFor="inputProfilePic">Profile Picture URI</label>
        <input type="text" onChange={handleProfilepic} className="form-control" id="inputProfilePic" placeholder="Profile Picture URI"/>
    </div>
    <div className="mb-3">
        <label className="form-label" htmlFor="inputProfilePic">Follow NFT URI</label>
        <input type="text" onChange={handleFollowNFt} className="form-control" id="followNFTURI" placeholder="Follow NFT URI"/>
    </div>
    <div>
        <input type="checkbox" id='feescheckbox' onChange={handleCheck} onClick={showFees}/>
        <label className="form-label" htmlFor="feescheckbox">Add fee module</label>
    </div>
    <div className="mb-3" id='feesfield'>
    <label className="form-label" htmlFor="inputCurrAddress">Currency Address</label>
        <input type="text" onChange={handleCurrAddress} className="form-control" id="inputCurrAddress" placeholder="Enter address"/>
        <label className="form-label" htmlFor="inputFees">Fees</label>
        <input type="text" onChange={handleFees} className="form-control" id="inputFees" placeholder="Enter amount"/>
        <small id="inputFees" className="form-text text-muted">
  Want to add fees for users who want to follow you?
</small>
    </div>
    <div className='justify-content-center'>
    <button className="btn btn-primary" 
    onClick={(e)=>{e.preventDefault(); 
    console.log(CreateProfileRequest);
    createProfile(CreateProfileRequest)}}>Register</button>
    </div>
</form>
</div>
</div>
</div>
</div>
</div>
        </>
    )
}

export default Form;
export const createProfile = async (CreateProfileRequest) => {
    // console.log('running')
    const testy = [
        {
            handle:"alalala",
            profilePictureUri:null
        }
    ]
    console.log(authenticatedApolloClient);
    console.log(localStorage.getItem("access_token"))
    return authenticatedApolloClient.mutate({
        mutation : gql(CREATE_PROFILE),
        variables : {
            request : {testy}
        }
    })
}