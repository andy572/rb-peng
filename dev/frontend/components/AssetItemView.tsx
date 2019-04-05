import * as React from 'react';
import {ApolloConsumer, graphql} from "react-apollo";
import gql from "graphql-tag";

// UI
import {AssetItemViewProps} from "./PropDefs";
import {FlexContainer} from "./core/FlexContainer";
import {Checkbox} from "./core/Checkbox";

class AssetItemViewComp extends React.Component<AssetItemViewProps> {
    render() {
        const style = {
            background:'url(https://picscdn.redblue.de/doi/'+this.props.asset.doi+'/fee_325_225_png) no-repeat center/contain',
            width:'105px',
            height:'105px'
        };

        const checked = this.props.asset.checked === true;

        return <ApolloConsumer>
            { client => (
                    <FlexContainer direction={"column"} className={"rb-card-item"}>
                        <div onClick={() => { return this.onItemClick(client)}} style={{cursor:'pointer',background:"url(/img/psbg.png) repeat"}}>
                            <div style={style}/>
                        </div>
                        <FlexContainer direction={"row"} className={"rb-margin-top-5"}>
                            <Checkbox
                                style={{flexDirection:'row-reverse',flexGrow:1}}
                                labelStyle={{'flex':1}}
                                labelColor={"textSecondary"}
                                label={this.props.asset.extension.toUpperCase()}
                                checked={checked}
                                onChange={(checked:boolean) => {return this.onCheckedChange(client, checked)}}
                            />
                        </FlexContainer>
                    </FlexContainer>
            )}
        </ApolloConsumer>
    }

    onCheckedChange = async (client, checked) => {
        const result = await client.query({query: GET_CACHED_PRODUCTS_QUERY});

        const updated_products = result.data.products.map((product => {
            if (product.articleNumber === this.props.articleNumber) {
                product.assets = product.assets.map(asset => {
                    if (asset.id === this.props.asset.id) {
                        asset.checked = checked;
                    }

                    return asset;
                });
            }

            return product;
        }));

        client.cache.writeData({data: {products: updated_products}});
        return true;
    };

    onItemClick = (client) => {
        const doi = this.props.asset.doi;

        if (this.props.asset.extension.toLowerCase() === "pdf") {
            window.open('https://picscdn.redblue.de/doi/'+this.props.asset.doi);
            return true;
        }

        client.writeData({data: {dialogImage: doi}});
        client.writeData({data: {isProductDialogOpen: true}});

        return true;
    };
}

const GET_CACHED_PRODUCTS_QUERY = gql`
query ProductList {
    products @client {
        articleNumber,
        displayName,
        assets {
            doi,
            id,
            mediaType,
            extension,
            checked
        }
    }
}
`;

export const AssetItemView = graphql<any, AssetItemViewProps>(GET_CACHED_PRODUCTS_QUERY)(AssetItemViewComp);