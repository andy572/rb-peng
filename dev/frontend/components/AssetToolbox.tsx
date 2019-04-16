import * as React from "react";
import {ResultSelectionView} from "./ResultSelectionView";
import {FlexContainer} from "./core/FlexContainer";
import {Typography} from "./core/Typography";
import {ChildDataProps, Query} from "react-apollo";
import gql from "graphql-tag";
import {Button} from "./core/Button";
import {Product} from "./PropDefs";

type AssetToolboxProps = {
    client: any,
    data?: any
}

const GET_CACHED_PRODUCTS_QUERY = gql`
query ProductList {
    products @client {
        articleNumber,
        assets {
            doi,
            id,
            checked
        }
    }
}
`;

export class AssetToolbox extends React.Component<AssetToolboxProps & ChildDataProps> {
    private products: Product[];
    render() {
        return <Query query={GET_CACHED_PRODUCTS_QUERY}>
            {({ loading, error, data }) => {
                if (!data || data.products.length == 0) {
                    this.products = [];
                    return null;
                }

                this.products = data.products;
                return <FlexContainer direction={"column"} className={"rb-page-content rb-right-panel"}>
                    <Typography variant={"h2"}>Asset-Aktionen</Typography>
                    <ResultSelectionView client={this.props.client}/>
                    { this.renderDownloadButton() }
                </FlexContainer>
            }}
        </Query>
    }

    renderDownloadButton = () => {
        if (!this.products.length) return null;

        let hasSelection = false;
        this.products.forEach((product) => {
            product.assets.forEach((asset) => {
                if (asset.checked)
                    hasSelection = true;
            });
        });

        return hasSelection ? <Button onClick={() => {return this.onDownloadClick()}} align={"center"} className={"rb-icon-link rb-textPrimary"}><span className={"fa fa-download"}/>Ausgewählte Assets herunterladen </Button> : null;
    }

    onDownloadClick = () => {
        this.props.client.writeData({data: {isDownloadDialogOpen: true}});
    }
}