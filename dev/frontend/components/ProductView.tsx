import * as React from "react";

import {AssetItemView} from "./AssetItemView";
import {Product} from "./PropDefs";
import {Typography} from "./core/Typography";
import {FlexContainer} from "./core/FlexContainer";
import {Card} from "./core/Card";
import {ApolloConsumer} from "react-apollo";
import {RefObject} from "react";

export class ProductView extends React.Component<{product:Product, products:Product[]}> {
    private checkRef: RefObject<HTMLInputElement> = React.createRef();
    state = {checked:false};
    constructor(props) {
        super(props);
    }

    render() {
        return <ApolloConsumer>
            {client => (
                <Card>
                <Typography variant="h6">{this.props.product.displayName}</Typography>
                <Typography color={"textSecondary"} variant="subtitle2">Artikel-Nummer: {this.props.product.articleNumber}</Typography>
                <FlexContainer direction={"row"} wrap>
                    {this.props.product.assets.map(asset => {
                        return <AssetItemView articleNumber={this.props.product.articleNumber} asset={asset}/>
                    })}
                </FlexContainer>
                <FlexContainer direction={"row"} alignItems={"center"} style={{marginTop: 15}}>
                    <input type={"checkbox"} checked={this.state.checked} ref={this.checkRef} onChange={() => {return this.onCheckedChange(client) }}/><span>Alle auswählen</span>
                </FlexContainer>
            </Card>
            )}
        </ApolloConsumer>
    }

    onCheckedChange = async (client) => {
        const checked = this.checkRef.current.checked;
        this.setState({checked: checked});

        const updated_products = this.props.products.map((product => {
            if (product.articleNumber === this.props.product.articleNumber ) {
                product.assets = product.assets.map(asset => {
                    asset.checked = checked;
                    return asset;
                });
            }
            return product;
        }));

        client.cache.writeData({data: {products: updated_products}});
        return true;
    }
}
