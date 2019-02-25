import * as React from 'react';
import {RefObject} from "react";
import {ApolloConsumer} from "react-apollo";
import { gql } from "apollo-boost";

const GET_ARTICLES_QUERY = gql`
    query ArticlesQuery($id: Int!) {
    articles(id: $id)
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
        const result = await client.query({query: GET_ARTICLES_QUERY, variables: {id: 5}});
        client.cache.writeData({data: {articles: result.data.articles}});
    }
}