import * as React from "react";
import {Checkbox} from "./core/Checkbox";
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import {ClientProp} from "./PropDefs";

class ResultSelectionViewComp extends React.Component<ClientProp> {

    render() {
        return <Checkbox label={"Alles auswählen"} onChange={(checked:boolean) => {return this.onSelectionChange(checked)}}/>
    }

    onSelectionChange = async (checked) => {
        const client = this.props.client;
        const result = await client.query({query: GET_PRODUCTS_QUERY});

        const updated_products = result.data.products.map((product => {
            product.assets = product.assets.map(asset => {
                asset.checked = checked;
                return asset;
            });

            return product;
        }));

        await client.cache.writeData({data: {products: updated_products}});
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