import * as React from 'react';

// UI
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {AssetItemViewProps} from "./PropDefs";
import {RefObject} from "react";
import {ApolloConsumer, ChildDataProps, graphql} from "react-apollo";
import {gql} from "apollo-boost";

class AssetItemViewComp extends React.Component<AssetItemViewProps & ChildDataProps> {
    inputRef: RefObject<HTMLInputElement> = React.createRef();
    render() {
        const style = {
            background:'url(https://picscdn.redblue.de/doi/'+this.props.asset.doi+'/fee_325_225_png) no-repeat center/contain',
            width:'105px',
            height:'105px',
            margin: '2px',
            border: '5px solid transparent',
        };

        return <ApolloConsumer>
            { client => (
                <Grid item style={{margin: 3}}>
                    <Card>
                        <CardContent style={{padding: 5}}>
                            <Grid container direction={"column"} alignItems={"flex-start"}>
                                <input type={"checkbox"} checked={this.props.asset.checked} ref={this.inputRef} onChange={() => {return this.onChange(client)}}/>
                                <div onClick={() => { return this.onItemClick(client)}} style={{cursor:'pointer',background:"url(/img/psbg.png) repeat", border: "5px solid #fff"}}>
                                    <div style={style}/>
                                </div>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </ApolloConsumer>
    }

    onChange = async (client) => {
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
            checked
        }
    }
}
`;

export const AssetItemView = graphql<any, AssetItemViewProps & ChildDataProps>(GET_CACHED_PRODUCTS_QUERY)(AssetItemViewComp);