import * as React from 'react';
import {RefObject} from "react";
import {ApolloConsumer} from "react-apollo";
import { gql } from "apollo-boost";

const GET_PRODUCTS_QUERY = gql`
    query ProductList($product_id: [Int]!) {
    products(product_id: $product_id) {
        name, 
        id, 
        assets
    }
}`;

export class SearchBar extends React.Component {
    inputRef: RefObject<HTMLInputElement> = React.createRef();
    constructor(props) {
        super(props);
    }
    render() {
        return <ApolloConsumer>
            {client => (
                <div className="flex horizontal">
                    <input type="text" ref={this.inputRef}/>
                    <button onClick={() => this.startSearch(client)}>Go</button>
                </div>
            )}
        </ApolloConsumer>
    }

    startSearch = async (client) => {
        let str = this.inputRef.current.value.replace(/\s+/g, ' ');
        const values = str.replace(/\s/g, ',').replace(/[,]+/g, ',').split(/,/);
        const result = await client.query({query: GET_PRODUCTS_QUERY, variables: {product_id: values}});
        client.cache.writeData({data: {products: result.data.products}});
    }
}