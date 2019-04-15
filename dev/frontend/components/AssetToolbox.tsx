import * as React from "react";
import {ResultSelectionView} from "./ResultSelectionView";
import {FlexContainer} from "./core/FlexContainer";
import {Typography} from "./core/Typography";
import {ChildDataProps, Query} from "react-apollo";
import gql from "graphql-tag";

type AssetToolboxProps = {
    client: any,
    data?: any
}

const GET_CACHED_PRODUCTS_QUERY = gql`
query ProductList {
    products @client {
        articleNumber
    }
}
`;

export class AssetToolbox extends React.Component<AssetToolboxProps & ChildDataProps> {
    render() {
        return <Query query={GET_CACHED_PRODUCTS_QUERY}>
            {({ loading, error, data }) => {
                if (!data || data.products.length == 0) return null;
                return <FlexContainer direction={"column"} className={"rb-page-content rb-right-panel"}>
                    <Typography variant={"h2"}>Asset-Aktionen</Typography>
                    <ResultSelectionView client={this.props.client}/>
                </FlexContainer>
            }}
        </Query>
    }
}