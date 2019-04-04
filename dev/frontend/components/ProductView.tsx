import * as React from "react";
import {ApolloConsumer} from "react-apollo";
import {RefObject} from "react";

import {AssetItemView} from "./AssetItemView";
import {Product} from "./PropDefs";
import {Typography} from "./core/Typography";
import {FlexContainer} from "./core/FlexContainer";
import {Card} from "./core/Card";
import {Checkbox} from "./core/Checkbox";

export class ProductView extends React.Component<{product:Product, products:Product[]}> {
    private checkRef: RefObject<HTMLInputElement> = React.createRef();
    public state;
    constructor(props) {
        super(props);
        this.state = {checked: false};
    }

    render() {
        return <ApolloConsumer>
            {client => (
                <Card>
                <Typography variant="h3">{this.props.product.displayName}</Typography>
                <Typography color={"textSecondary"} variant="subtitle2">Artikel-Nummer: {this.props.product.articleNumber}</Typography>
                <FlexContainer direction={"row"} wrap>
                    {this.props.product.assets.map(asset => {
                        return <AssetItemView articleNumber={this.props.product.articleNumber} asset={asset}/>
                    })}
                </FlexContainer>
                <Checkbox style={{marginTop: 15}} label={"Alle mal auswählen"} checked={this.state.checked} inputRef={this.checkRef} onChange={() => {return this.onCheckedChange(client) }}/>
            </Card>
            )}
        </ApolloConsumer>
    }

    onCheckedChange = async (client) => {
        const checked = this.checkRef.current.checked;
        const updated_products = this.props.products.map((product => {
            if (product.articleNumber === this.props.product.articleNumber ) {
                product.assets = product.assets.map(asset => {
                    asset.checked = checked;
                    return asset;
                });
            }
            return product;
        }));

        await client.cache.writeData({data: {products: updated_products}});
        await this.setState({checked: checked});

        return true;
    }
}
