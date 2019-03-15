import * as React from 'react';
import {RefObject} from "react";
import {ApolloConsumer} from "react-apollo";
import { gql } from "apollo-boost";
import "../helpers/StringArray";

const GET_PRODUCTS_QUERY = gql`
    query ProductList($product_id: [Int]!) {
    products(product_id: $product_id) {
        displayName, 
        articleNumber,
        catalogEntryId,
        longDescription,
        shortDescription,
        onlineStatus,
        rating,
        salesPrice,
        shipping,
        featureGroups {
            name,
            value,
            features {
                name,
                value
            }
        },
        assets {
            doi,
            id
        }
    }
}`;

const GET_CACHED_SEARCH_VALUES = gql`
    query GET_SEARCH_VALUES {
        search @client
    }
`;

export class SearchBar extends React.Component {
    inputRef: RefObject<HTMLInputElement> = React.createRef();
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
        const search_values = str.replace(/\s/g, ',').replace(/[,]+/g, ',').split(/,/);

        let current_search_values = await client.query({query: GET_CACHED_SEARCH_VALUES});
        if (!current_search_values)
            current_search_values = [];
        else {
            current_search_values = current_search_values.data.search;
        }

        const updated_search_values = current_search_values.concat(search_values).unique();

        client.cache.writeData({data: {loading: true, products: []}});
        const result = await client.query({query: GET_PRODUCTS_QUERY, variables: {product_id: search_values}}).catch(()=>{
            client.cache.writeData({data: {products: [], search: updated_search_values, loading: false, error: true}});
        });
        client.cache.writeData({data: {products: result.data.products, search: updated_search_values, loading: false, error: false}});
    }
}