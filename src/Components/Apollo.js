import { ApolloClient , ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

const APIURL = 'https://api-mumbai.lens.dev/';

const httpLink = new HttpLink({uri :'https://api-mumbai.lens.dev/' });

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('access_token');

    // operation.setContext({
    //     headers :{ 'x-access-token' : token ? `Bearer ${token}` : "" }
    // });
    operation.setContext({
        headers: {
          'x-access-token': token ? `Bearer ${token}` : ''
        }
      });
console.log(token)
    return forward(operation)
})
export const authenticatedApolloClient = new ApolloClient({
    link : authLink.concat(httpLink),
    cache : new InMemoryCache()
})

/// This ApolloClient is made without a Header or Authentication Token
export const apolloClient = new ApolloClient({
    uri : APIURL,
    cache : new InMemoryCache(),
})