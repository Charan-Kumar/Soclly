import { gql } from "@apollo/client";
import { ethers } from "ethers";
import { GENERATE_CHALLENGE,
      AUTHENTICATE, GET_PROFILES, 
      CREATE_PROFILE, 
      RECOMMENDED_PROFILES ,
      GET_FOLLOWERS, 
      GET_FOLLOWING, 
      GET_USERS_NFTS, 
      CREATE_FOLLOW_TYPED_DATA,
      CREATE_UNFOLLOW_TYPED_DATA, 
      DOES_FOLLOW, SEARCH,
      GET_PUBLICATIONS,
      EXPLORE_PUBLICATIONS,
      GET_TIMELINE } from './Queries';
import { authenticatedApolloClient, apolloClient } from './Apollo'
import omitDeep from 'omit-deep';
import lensHubArtifact from "../assets/abi/LensHub.json";
import followNFTArtifact from "../assets/abi/followNFT.json";


const provider = new ethers.providers.Web3Provider(window.ethereum);

const getAddress=async() =>{
  var add= await  provider.listAccounts();
  console.log(add[0])
  return add[0]; 
}

export const getProfilesRequest = (request) => {
  return authenticatedApolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request,
    },
  })
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

export const generateChallenge = async (address) => {
  return apolloClient.query({
      query : gql(GENERATE_CHALLENGE),
      variables : {
          request: {address}
      }
  })
}

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

export const createProfile = (createProfileRequest) => {
  return authenticatedApolloClient.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: createProfileRequest
    },
  })
}

export const signText = async (data) => {
  
  const signer = provider.getSigner();
  console.log(signer)
  
  return await signer.signMessage(data);
}

export const getRecommendedProfilesRequest = () => {
  return apolloClient.query({
    query: gql(RECOMMENDED_PROFILES),
  });
};

/// @dev the get Followers Query needs to be based the unique profile ID
export const getFollowerRequest = (profileId) => {
  return apolloClient.query({
    query : gql(GET_FOLLOWERS),
    variables : {
      request : {
      profileId,
      limit : 10
      }
    }
  })
}

/// @dev the get Followings Query needs to be based the wallaet Address
export const getFollowingRequest = (walletAddress) => {
  return apolloClient.query({
    query : gql(GET_FOLLOWING),
    variables : {
      request : {
        address: walletAddress,
        limit : 10
      }
    }
  })
}

export const getUsersNfts = ( ownerAddress, chainIds= [ 80001 ], contractAddress="0x54be3a794282c030b15e43ae2bb182e14c409c5e") => {
  return apolloClient.query({
    query: gql(GET_USERS_NFTS),
    variables: {
      request: {
        ownerAddress,
        contractAddress,
        chainIds,
        limit: 10,
      },
    },
  });
};


// @dev Helper function to sign the typed data generated through Lens API query
const signTypedData = (domain, types, values) => {
  const signer = provider.getSigner();
  return signer._signTypedData(
    omitDeep(domain, '__typename'),
    omitDeep(types, '__typename'),
    omitDeep(values, '__typename'),
  );
}

//@dev helper function to split any signature into {v,r,s} 
const splitSignature = (signature) => {
  return ethers.utils.splitSignature(signature);
}


// @dev This is the Function to be called when the follow data has been finalized 
// the followRequestInfo here will be an array of [{}] according to https://docs.lens.dev/docs/create-follow-typed-data
export const follow = async (followRequestInfo) => {

  const result = await createFollowTypedData(followRequestInfo);
  console.log(result.data.createFollowTypedData.typedData);
  const typedData = result.data.createFollowTypedData.typedData;
  
  const signature = await signTypedData (typedData.domain , typedData.types, typedData.value);
  const {v,r,s} = splitSignature(signature);
  const lensHub =await getLensHub()
  const tx = await lensHub.followWithSig({
    follower : getAddress(),
    profileIds : typedData.value.profileIds,
    datas : typedData.value.datas,
    sig : {
      v,
      r,
      s,
      deadline : typedData.value.deadline,
    },
  });

}

export const unfollow = async(profileId) => {
  
  const result = await createUnfollowTypedData(profileId);
   
  const typedData = result.data.createUnfollowTypedData.typedData;
  
  const signature = await signTypedData(typedData.domain, typedData.types, typedData.value);
  const { v, r, s } = splitSignature(signature);
  
  // load up the follower nft contract
  const followNftContract = new ethers.Contract(
    typedData.domain.verifyingContract,
    followNFTArtifact,
    provider.getSigner()
  );
  
  const sig = {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
   }
  
  const tx = await followNftContract.burnWithSig(typedData.value.tokenId, sig);
  console.log(tx.hash);
}

const createUnfollowTypedData = async (profileId) =>{
  return authenticatedApolloClient.mutate({
    mutation : gql(CREATE_UNFOLLOW_TYPED_DATA),
    variables : {request : {profile : profileId}}
  })
}

// @dev Helper Function to intiate the LensHub Contract
const getLensHub = async () => {
  const lensHubAddress = "0xd7B3481De00995046C7850bCe9a5196B7605c367"
  const signer = provider.getSigner();
  return await new ethers.Contract(lensHubAddress , lensHubArtifact, signer);
}

/// @dev the createFollowTypedData Mutation to create EIP 712 Typed Data
// Implicitly Called in the follow function
export const createFollowTypedData = async (followRequestInfo) => {
   return authenticatedApolloClient.mutate(
    {
      mutation : gql(CREATE_FOLLOW_TYPED_DATA),
      variables : {request: {follow : followRequestInfo,}}
    }
   )
}

export const doesFollowRequest = (followInfos) => {
  debugger;
  return apolloClient.query({
    query: gql(DOES_FOLLOW),
    variables: {
      request: {
        followInfos,
      },
    },
  });
};

export const searchRequest = (request) => {
  return apolloClient.query({
    query: gql(SEARCH),
    variables: {
      request,
    },
  });
};

// @dev getPublicationQuery Structure : 
// {
  // profileId : "0x..",
  // publicationType : ["POST","COMMENT","MIRROR"]
// }
export const getPublications = (getPublicationQuery) => {
  return apolloClient.query({
    query : gql(GET_PUBLICATIONS),
    variables : {
      request : getPublicationQuery
    }
  })
}

// @dev the structure for explorePublicationQueryRequest 
// {
//  sortCriteria : "TOP_COLLECTED"/"TOP_COMMENTED"
//  limit :
// }
export const explorePublications = () => {
  const explorePublicationQueryRequest = {
    sortCriteria : "TOP_COLLECTED",
    limt : 10
  }
  return apolloClient.query({
    query : gql(EXPLORE_PUBLICATIONS),
    variables : {
      request : explorePublicationQueryRequest
    }
  })
}

// @dev Pass the Profile Id you need the timeline for
export const getTimeline = (profileId) => {
  return apolloClient.query({
    query : gql(GET_TIMELINE),
    variables : {
      request : {
        profileId,
        limit : 10
      }
    }
  })
}
