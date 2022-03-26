import { gql } from "@apollo/client";
import { ethers } from "ethers";
import { GENERATE_CHALLENGE, AUTHENTICATE, GET_PROFILES, CREATE_PROFILE, RECOMMENDED_PROFILES  } from './Queries';
import { authenticatedApolloClient, apolloClient } from './Apollo'

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