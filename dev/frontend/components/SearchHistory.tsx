import * as React from "react";
import {graphql, ChildDataProps} from "react-apollo";
import gql from "graphql-tag";

// UI
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

type SearchProps = {
    data: {
        search: string[]
    }
} & ChildDataProps;

class SearchHistoryComponent extends React.Component<SearchProps> {
    render() {
        return <List>
            {this.props.data.search.map(value => {
                return <ListItem button>
                    <ListItemText primaryTypographyProps={{variant:'body2'}} primary={value}/>
                </ListItem>
            })}
        </List>;
    }
}

const GET_SEARCH_VALUES = gql`
    query GET_SEARCH_VALUES {
        search @client
    }
`;

export const SearchHistory = graphql<any, SearchProps>(GET_SEARCH_VALUES)(SearchHistoryComponent);