import * as React from 'react';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {InMemoryCache} from "apollo-cache-inmemory";

import { ResultPage } from "./ResultPage";
import { SearchBar } from "./SearchBar";
import {SearchHistory} from "./SearchHistory";

// UI
import AppBar from '@material-ui/core/AppBar';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";

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
                <AppBar position={"fixed"}>
                    <Toolbar>
                        <Typography color={"inherit"} variant={"subtitle1"}>
                            PENG with react, typescript and apollo
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid direction="row" container spacing={8} xs={12} className={"main-container no-scroll"}>
                    <Grid item xs={3}>
                        <SearchBar/>
                        <SearchHistory/>
                    </Grid>
                    <Grid item xs={9} className={"scroll-pane"}>
                        <ResultPage/>
                    </Grid>
                </Grid>
            </React.Fragment>
        </ApolloProvider>
    }
}