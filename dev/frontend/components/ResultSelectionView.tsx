import * as React from "react";
import {Checkbox} from "./core/Checkbox";
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import {ClientProp} from "./PropDefs";
import {RefObject} from "react";

class ResultSelectionViewComp extends React.Component<ClientProp> {
    selectionRef: RefObject<HTMLInputElement> = React.createRef();

    render() {
        return <Checkbox label={"Alles auswählen"} inputRef={this.selectionRef} onChange={() => {return this.onSelectionChange()}}/>
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