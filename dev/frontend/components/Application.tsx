import * as React from 'react';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {InMemoryCache} from "apollo-cache-inmemory";

import { ResultPage } from "./ResultPage";
import { SearchBar } from "./SearchBar";

const client = new ApolloClient({
    clientState: {
        cache: new InMemoryCache(),
        defaults: {
            products: [],
            loading: false,
            error: null
        },
        resolvers: {}
    },
    uri: 'http://react.local/api/graphql',
});

export class Application extends React.Component {
    render() {
        return <ApolloProvider client={client}>
            <React.Fragment>
                <h1>PENG Prototype with react, typescript and apollo</h1>
                <SearchBar/>
                <ResultPage/>
            </React.Fragment>
        </ApolloProvider>
    }
}