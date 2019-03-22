import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import {RefObject} from "react";
import {gql} from "apollo-boost";
import {graphql} from "react-apollo";
import {ClientProp} from "./PropDefs";

class ResultSelectionViewComp extends React.Component<ClientProp> {
    private selectionRef: RefObject<HTMLInputElement> = React.createRef();

    render() {
        return <React.Fragment>
            <Grid item>
                <Checkbox color={"default"} inputRef={this.selectionRef} onChange={() => {return this.onSelectionChange()}}/>
            </Grid>
            <Grid item>
                <Typography variant={"caption"}>Alle auswählen</Typography>
            </Grid>
        </React.Fragment>
    }

    async onSelectionChange() {
        const client = this.props.client;
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
    error @client,
    imageSize @client
}
`;

export const ResultSelectionView = graphql<any, ClientProp>(GET_PRODUCTS_QUERY)(ResultSelectionViewComp);