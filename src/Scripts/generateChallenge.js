import { gql } from "@apollo/client";
import { ethers } from "ethers";
import { apolloClient, authenticatedApolloClient} from "./Apollo";

export const login = async () => {
    const address = await getAddress()

    const challenge = await generateChallenge(address);

    const signature = await signText(challenge.data.challenge.text)
    
    const accessToken = await authenticate(address, signature)
    console.log(accessToken);
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
    return ethersProvider.signMessage(data);
}