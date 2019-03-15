import * as React from "react";
import {graphql, ChildDataProps} from "react-apollo";
import gql from "graphql-tag";

type SearchProps = {
    data: {
        search: string[]
    }
} & ChildDataProps;

class SearchHistoryComponent extends React.Component<SearchProps> {
    render() {
        return <ul>
            {this.props.data.search.map(value => {
                return <li>{value}</li>
            })}
        </ul>;
    }
}

const GET_SEARCH_VALUES = gql`
    query GET_SEARCH_VALUES {
        search @client
    }
`;

export const SearchHistory = graphql<any, SearchProps>(GET_SEARCH_VALUES)(SearchHistoryComponent);