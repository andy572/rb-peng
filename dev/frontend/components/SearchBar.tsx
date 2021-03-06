import * as React from 'react';
import {RefObject} from "react";
import {ApolloConsumer} from "react-apollo";
import gql from "graphql-tag";
import "../helpers/StringArray";

// UI
import {FlexContainer} from "./core/FlexContainer";
import {Button} from "./core/Button";

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
                <FlexContainer direction="column">
                    <input type={"text"} className={"rb-flex rb-flex-grow rb-control-input"} placeholder="Artikelnummer eingeben" ref={this.inputRef}/>
                    <Button style={{marginTop: 8, width:'fit-content'}} outlined buttonType={"danger"} onClick={() => this.startSearch(client)}>
                        <span className={"fa fa-search"}/>
                        <span>Suchen</span>
                    </Button>
                </FlexContainer>
            )}
            </ApolloConsumer>
    }

    startSearch = (client) => {
        let str = this.inputRef.current.value.replace(/\s+/g, ' ');
        const splitted_values = str.replace(/\s+/g, ' ').replace(/\s/g, ',').replace(/[,]+/g, ',').split(/,/);

        const search_values = splitted_values.filter(value => {
            return value.length > 0;
        });

        if (search_values.length === 0)
            return;

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