import * as React from 'react';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {InMemoryCache} from "apollo-cache-inmemory";

import { ResultPage } from "./ResultPage";
import { SearchBar } from "./SearchBar";
import {SearchHistory} from "./SearchHistory";

// UI
import {ImageDialog} from "./ImageDialog";

import "../styles/peng.scss";
import {FlexContainer} from "./core/FlexContainer";

const client = new ApolloClient({
    clientState: {
        cache: new InMemoryCache(),
        defaults: {
            products: [],
            dialogImage: "",
            isProductDialogOpen: false,
            imageSize: 1,
            search: [],
            loading: false,
            error: false
        },
        resolvers: {}
    },
    uri: '/api/graphql'
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