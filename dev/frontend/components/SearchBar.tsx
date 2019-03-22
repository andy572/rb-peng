import * as React from 'react';
import {RefObject} from "react";
import {ApolloConsumer} from "react-apollo";
import { gql } from "apollo-boost";
import "../helpers/StringArray";

// UI
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

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
    render() {
        return <ApolloConsumer>
            {client => (
                <Grid container direction="row" alignItems="center" alignContent={"stretch"} wrap={"nowrap"}>
                    <Grid item style={{flexGrow: 1}}>
                        <TextField fullWidth multiline inputProps={{variant:'outlined', style:{fontSize:14}}} placeholder="Artikelnummer eingeben" inputRef={this.inputRef}/>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="Search" onClick={() => this.startSearch(client)}>
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                </Grid>
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

        console.log( this.inputRef );

        const updated_search_values = current_search_values.concat(search_values).unique();
        this.inputRef.current.value = "";

        await client.cache.writeData({data: {loading: true, products: []}});
        const result = await client.query({query: GET_PRODUCTS_QUERY, variables: {product_id: search_values}}).catch(()=>{
            client.cache.writeData({data: {products: [], search: updated_search_values, loading: false, error: true}});
        });
        await client.cache.writeData({data: {products: result.data.products, search: updated_search_values, loading: false, error: false}});
    }
}