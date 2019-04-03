import * as React from 'react';

// UI
import {AssetItemViewProps} from "./PropDefs";
import {RefObject} from "react";
import {ApolloConsumer, graphql} from "react-apollo";
import {gql} from "apollo-boost";
import {FlexContainer} from "./core/FlexContainer";

class AssetItemViewComp extends React.Component<AssetItemViewProps> {
    inputRef: RefObject<HTMLInputElement> = React.createRef();
    render() {
        const style = {
            background:'url(https://picscdn.redblue.de/doi/'+this.props.asset.doi+'/fee_325_225_png) no-repeat center/contain',
            width:'105px',
            height:'105px'
        };

        return <ApolloConsumer>
            { client => (
                    <FlexContainer direction={"column"} className={"rb-card-item"}>
                        <div onClick={() => { return this.onItemClick(client)}} style={{cursor:'pointer',background:"url(/img/psbg.png) repeat"}}>
                            <div style={style}/>
                        </div>
                        <FlexContainer direction={"row"} className={"rb-margin-top-5"}>
                            <div className={"rb-flex rb-flex-grow"}>
                                <span className={"rb-small-text rb-text-light-gray"}>{this.formatFileSize()} | {this.props.asset.extension.toUpperCase()}</span>
                            </div>
                            <div>
                                <input className={"rb-no-margin rb-no-padding"} type={"checkbox"} checked={this.props.asset.checked} ref={this.inputRef} onChange={() => {return this.onCheckedChange(client)}}/>
                            </div>
                        </FlexContainer>
                    </FlexContainer>
            )}
        </ApolloConsumer>
    }

    onCheckedChange = async (client) => {
        const checked = this.inputRef.current.checked;
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

    private formatFileSize() {
        let size:number = this.props.asset.expectedSize;
        let sizeString = " B";
        if (size > 1024) {
            size = size / 1024;
            sizeString = " KB";
        }
        if (size > 1024) {
            size = size / 1024;
            sizeString = " MB";
        }

        return "" + size.toFixed(2) + sizeString;
    }
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
            expectedSize,
            extension,
            checked
        }
    }
}
`;

export const AssetItemView = graphql<any, AssetItemViewProps>(GET_CACHED_PRODUCTS_QUERY)(AssetItemViewComp);