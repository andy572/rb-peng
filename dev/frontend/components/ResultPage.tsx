import * as React from 'react';
import {gql} from "apollo-boost";
import {ApolloConsumer, ChildDataProps, graphql} from "react-apollo";

// UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import {ResultItem} from "./ResultItem";
import {DataProps} from "./PropDefs";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {RefObject} from "react";


type ResultProps = DataProps & ChildDataProps;

class ResultPageComp extends React.Component<ResultProps> {
    selectionRef: RefObject<HTMLInputElement> = React.createRef();

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
                            <Grid item>
                                <Checkbox color={"default"} inputRef={this.selectionRef} onChange={() => {return this.onSelectionChange(client)}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"caption"}>Alle auswählen</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {
                        products.map(item => {
                            return <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{item.displayName}</Typography>
                                        <Typography color={"textSecondary"} variant="subtitle2">Artikel-Nummer: {item.articleNumber}</Typography>
                                        <Grid container>
                                            {item.assets.map(asset => {
                                                return <ResultItem articleNumber={item.articleNumber} asset={asset}/>
                                            })}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        })
                    }
                </Grid>
            )}
        </ApolloConsumer>
    }

    async onSelectionChange(client) {
        const checked = this.selectionRef.current.checked;
        const result = await client.query({query: GET_PRODUCTS_QUERY});

        const updated_products = result.data.products.map((product => {
            product.assets = product.assets.map(asset => {
                asset.checked = checked;
                return asset;
            });

            return product;
        }));

        client.cache.writeData({data: {products: updated_products}});
        return true;
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
    error @client
}
`;

export const ResultPage = graphql<any, ResultProps>(GET_PRODUCTS_QUERY)(ResultPageComp);
