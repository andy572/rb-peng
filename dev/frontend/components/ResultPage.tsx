import * as React from 'react';
import {gql} from "apollo-boost";
import {ApolloConsumer, graphql} from "react-apollo";
import {ResultProps} from "./PropDefs";

// UI
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {CircularProgress, Paper} from '@material-ui/core';
import {ResultSelectionView} from "./ResultSelectionView";
import {ResultSizeSelectionView} from "./ResultSizeSelectionView";
import {ProductView} from "./ProductView";

const styles = {
    root: {
        padding: 15
    },
    error: {
        padding: 15,
        backgroundColor: '#FFEBEE',
        border: '1px solid #EF9A9A'
    },
    font: {
        color: '#D32F2F'
    }
};

class ResultPageComp extends React.Component<ResultProps> {
    render() {
        const {loading, products, search} = this.props.data;

        if (loading) {
            return <Grid container direction={"row"} spacing={24} alignItems={"center"}>
                <Grid item>
                    <CircularProgress color="secondary" size={24} />
                </Grid>
                <Grid item>
                    <Typography>Loading...</Typography>
                </Grid>
            </Grid>
        }

        if (!products || products.length === 0) {
            if (search.length == 0) {
                return <Paper style={styles.root}><Typography>Geben Sie eine oder mehrere Artikelnummern ein, um zu beginnen</Typography></Paper>
            } else {
                return <Paper style={styles.error}><Typography style={styles.font}>Es konnten keine Produkte gefunden werden</Typography></Paper>
            }
        }

        // TODO display error: article number(s) where not found

        return <ApolloConsumer>
            {client => (
                <Grid direction="column" container spacing={8}>
                    <Grid item>
                        <Grid container direction={"row"} spacing={8} alignItems={"center"}>
                            <ResultSelectionView client={client}/>
                            <Grid item style={{flexGrow: 1}}>
                                <Grid container direction={"row"} alignItems={"center"}>
                                    <Grid item style={{flexGrow: 1}}/>
                                    <ResultSizeSelectionView data={null} client={client} imageSize={this.props.data.imageSize}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {
                        products.map(item => {
                            return <ProductView product={item}/>
                        })
                    }
                </Grid>
            )}
        </ApolloConsumer>
    }
}

const GET_PRODUCTS_QUERY = gql`
query ProductList {
    products @client {
        displayName, 
        articleNumber,
        catalogEntryId,
        longDescription,
        shortDescription,
        onlineStatus,
        rating,
        salesPrice,
        shipping,
        assets {
            doi,
            id,
            checked
        }
    },
    search @client,
    loading @client,
    error @client,
    imageSize @client
}
`;

export const ResultPage = graphql<any, ResultProps>(GET_PRODUCTS_QUERY)(ResultPageComp);
