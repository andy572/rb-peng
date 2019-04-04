import * as React from 'react';
import {ApolloProvider} from "react-apollo";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import {ApolloLink} from "apollo-link";
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';

// UI
import {ImageDialog} from "./ImageDialog";
import { ResultPage } from "./ResultPage";
import { SearchBar } from "./SearchBar";
import {SearchHistory} from "./SearchHistory";
import {FlexContainer} from "./core/FlexContainer";

import "../styles/peng.scss";

const cache = new InMemoryCache();
const client = new ApolloClient({
    link: ApolloLink.from([
        new HttpLink({
            uri: '/api/graphql'
        }),
        withClientState({
            defaults: {
                products: [],
                dialogImage: "",
                isProductDialogOpen: false,
                imageSize: 1,
                search: [],
                loading: false,
                error: false
            },
            resolvers: {},
            cache
        })
    ]),
    cache
});

export class Application extends React.Component {
    render() {

        return <ApolloProvider client={client}>
            <React.Fragment>
                <FlexContainer direction="row" className={"main-container no-scroll"}>
                    <FlexContainer direction="column" className={"rb-left-panel"}>
                        <SearchBar/>
                        <SearchHistory/>
                    </FlexContainer>
                    <ResultPage/>
                </FlexContainer>
                <ImageDialog/>
            </React.Fragment>
        </ApolloProvider>
    }
}