import * as React from 'react';
import {RefObject} from "react";
import {ApolloConsumer} from "react-apollo";
import gql from "graphql-tag";
import "../helpers/StringArray";

// UI
import {FlexContainer} from "./core/FlexContainer";

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
            id,
            mediaType,
            extension,
            checked
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
    constructor(props) {
        super(props);
    }

    render() {
        return <ApolloConsumer>
            {client => (
                <FlexContainer direction="row" alignItems="center" alignContent={"stretch"}>
                    <input type={"text"} className={"rb-control-input"} style={{flexGrow:1}} placeholder="Artikelnummer eingeben" ref={this.inputRef}/>
                    <div onClick={() => this.startSearch(client)}><span className="rb-control-icon fa fa-search"/></div>
                </FlexContainer>
            )}
            </ApolloConsumer>
    }

    startSearch = (client) => {
        let str = this.inputRef.current.value.replace(/\s+/g, ' ');
        const search_values = str.replace(/\s/g, ',').replace(/[,]+/g, ',').split(/,/);

        if (search_values.length === 0 || (search_values.length == 1 && search_values[0].length == 0))
            return;
        else {
            console.log( search_values );
        }

        client.query({query: GET_CACHED_SEARCH_VALUES})
            .then(current_search_values => {
                if (!current_search_values)
                    current_search_values = [];
                else {
                    current_search_values = current_search_values.data.search;
                    this.inputRef.current.value = "";
                }

                const updated_search_values = current_search_values.concat(search_values).unique();

                client.cache.writeData({
                    data: {
                        loading: true,
                        products: []
                    }
                });

                client.query({query: GET_PRODUCTS_QUERY, variables: {product_id: search_values}})
                    .then(search_result => {
                        client.cache.writeData({
                            data: {
                                products: search_result.data.products,
                                search: updated_search_values,
                                loading: false,
                                error: false
                            }
                        });
                    })
                    .catch((e)=>{console.error( e );
                        client.cache.writeData({
                            data: {
                                products: [],
                                loading: false,
                                error: true
                            }
                        });
                    });
            })
            .catch((e) => {
                console.error( e );
                client.cache.writeData({
                    data: {
                        products: [],
                        loading: false,
                        error: true
                    }
                });
        });
    }
}