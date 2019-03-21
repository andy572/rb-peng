import * as React from 'react';
import {gql} from "apollo-boost";
import {ApolloConsumer, ChildDataProps, graphql} from "react-apollo";
import {DataProps} from "./PropDefs";

// UI
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import {ResultSelectionView} from "./ResultSelectionView";
import {ResultSizeSelectionView} from "./ResultSizeSelectionView";
import {ProductView} from "./ProductView";

type ResultProps = DataProps & ChildDataProps;

class ResultPageComp extends React.Component<ResultProps> {
    render() {
        const {loading, products} = this.props.data;

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

        // TODO display error / products not found
        if (!products || products.length === 0) return null;

        return <ApolloConsumer>
            {client => (
                <Grid direction="column" container spacing={8}>
                    <Grid item>
                        <Grid container direction={"row"} spacing={8} alignItems={"center"}>
                            <ResultSelectionView client={client}/>
                            <Grid item style={{flexGrow: 1}}>
                                <Grid container direction={"row"} alignItems={"center"}>
                                    <Grid item style={{flexGrow: 1}}/>
                                    <ResultSizeSelectionView client={client} imageSize={this.props.data.imageSize}/>
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
