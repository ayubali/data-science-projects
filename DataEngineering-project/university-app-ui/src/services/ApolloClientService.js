import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

//graphql
//const URI = 'https://desolate-sands-94252.herokuapp.com/graphql'; // tony

const URI = 'https://boiling-headland-90798.herokuapp.com/graphql';

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(
        {
            headers: {
                authorization: localStorage.getItem('id_token'),
            }
        }
    )
    return forward(operation);
})

const httpLink = new HttpLink({ uri: URI});
const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
    },
};

// Create the apollo client
export const APPLLO_CLIENT = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});


export default APPLLO_CLIENT;

