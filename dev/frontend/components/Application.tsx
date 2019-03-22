import * as React from 'react';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {InMemoryCache} from "apollo-cache-inmemory";

import { ResultPage } from "./ResultPage";
import { SearchBar } from "./SearchBar";
import {SearchHistory} from "./SearchHistory";

// UI
import {grey} from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {ImageDialog} from "./ImageDialog";

import "../styles/peng.scss";

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
                <AppBar position={"fixed"} style={{backgroundColor:grey[50],color: grey[600]}}>
                    <Toolbar>
                        <Typography color={"inherit"} variant={"subtitle1"}>
                            PENG with react, typescript, apollo and material-ui
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid direction="row" container spacing={8} xs={12} className={"main-container no-scroll"}>
                    <Grid item xs={2}>
                        <Grid container direction="column" alignContent={"stretch"}>
                            <Grid item>
                                <SearchBar/>
                            </Grid>
                            <Grid item>
                                <SearchHistory/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={10} style={{overflow:'auto', height: '88vh'}}>
                        <ResultPage/>
                    </Grid>
                </Grid>
                <ImageDialog/>
            </React.Fragment>
        </ApolloProvider>
    }
}