import * as React from 'react';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {InMemoryCache} from "apollo-cache-inmemory";

import { ResultPage } from "./ResultPage";
import { SearchBar } from "./SearchBar";
import {SearchHistory} from "./SearchHistory";

const client = new ApolloClient({
    clientState: {
        cache: new InMemoryCache(),
        defaults: {
            products: [],
            search: [],
            loading: false,
            error: false
        },
        resolvers: {}
    },
    uri: 'http://react.local/api/graphql'
});

export class Application extends React.Component {
    render() {
        return <ApolloProvider client={client}>
            <React.Fragment>
                <h1>Prototype with react, typescript and apollo</h1>
                <div className={"flex flex-horizontal"}>
                    <div>
                        <SearchBar/>
                        <SearchHistory/>
                    </div>
                    <div>
                        <ResultPage/>
                    </div>
                </div>
            </React.Fragment>
        </ApolloProvider>
    }
}