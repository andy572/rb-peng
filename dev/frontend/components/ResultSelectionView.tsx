import * as React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import {RefObject} from "react";
import {gql} from "apollo-boost";
import {graphql} from "react-apollo";
import {ClientProp} from "./PropDefs";
import {FlexContainer} from "./core/FlexContainer";

class ResultSelectionViewComp extends React.Component<ClientProp> {
    private selectionRef: RefObject<HTMLInputElement> = React.createRef();

    render() {
        return <FlexContainer direction={"row"} grow alignItems={"center"}>
            <Checkbox color={"default"} inputRef={this.selectionRef} onChange={() => {return this.onSelectionChange()}}/>
            <Typography variant={"caption"}>Alle auswählen</Typography>
        </FlexContainer>
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