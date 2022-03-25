import { ApolloClient , ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

const APIURL = 'https://api-mumbai.lens.dev/';



/// This ApolloClient is made without a Header or Authentication Token
export const apolloClient = new ApolloClient({
    uri : APIURL,
    cache : new InMemoryCache(),
})


/// This ApolloClient is made using the local storage authToken 
/// What is this authToken how do we get it before making the profile for a given user


const httpLink = new HttpLink({uri :'https://api-mumbai.lens.dev/' });

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('auth_token');

    operation.setContext({
        headers :{ 'x-access-token' : token ? `Bearer ${token}` : "" }
    });

    return forward(operation)
})

export const authenticatedApolloClient = new ApolloClient({
    link : authLink.concat(httpLink),
    cache : new InMemoryCache()
})